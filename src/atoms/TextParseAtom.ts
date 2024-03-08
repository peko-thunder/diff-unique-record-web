import { isObjectArray } from '@/types'
import { atom } from 'jotai'
import JSON5 from 'json5'

export type ParsedType = 'oldData' | 'newData'

export type ParsedResult = {
  origin: string
  list: object[]
  message?: string
}

export type DiffRecord = Record<ParsedType, ParsedResult>

const Initializer = {
  /**
   * テキストの初期値を取得する
   * 半角スペースまでを含めているため消したりスペースを変更しないこと
   * @returns
   */
  text(): string {
    return `[
  {
    
  }
]`
  },
  /**
   * 解析結果の初期データを取得する
   * @returns
   */
  result(): ParsedResult {
    return {
      origin: this.text(),
      list: [],
      message: undefined,
    }
  },
  /**
   * 解析結果の初期データを取得する
   * @returns
   */
  record(): DiffRecord {
    return {
      oldData: this.result(),
      newData: this.result(),
    }
  },
}

/**
 * Main Atom
 */
const diffRecordAtom = atom<DiffRecord>(Initializer.record())

/**
 * Atom Interface
 * - record: read value
 * - parse: set parsed text
 * - reset: set initial record
 */
export const TextParseAtom = {
  record: atom((get) => get(diffRecordAtom)),
  update: atom(null, (get, set, type: ParsedType, text: string) => {
    const state = get(diffRecordAtom)
    const result = parseText(text)
    set(diffRecordAtom, { ...state, [type]: result })
  }),
  reset: atom(null, (_get, set) => {
    set(diffRecordAtom, Initializer.record())
  }),
} as const

/**
 * テキストを解析した結果を返す
 * @param originText
 * @returns
 */
const parseText = (originText: string): ParsedResult => {
  try {
    const parsedData = JSON5.parse(originText)
    if (!Array.isArray(parsedData)) throw new Error('InputValue must be array.')
    if (parsedData.length === 0) throw new Error('InputValue must include data.')
    if (!isObjectArray(parsedData)) throw new Error('InputValue must include only objects.')
    return {
      origin: originText,
      list: parsedData,
      message: undefined,
    }
  } catch (e: unknown) {
    const noData: object[] = []
    let message: string | undefined
    if (e instanceof Error) message = e.message
    return {
      origin: originText,
      list: noData,
      message,
    }
  }
}
