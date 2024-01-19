'use client'
import JSON5 from 'json5'
import { Dispatch, ReactNode, createContext, useContext, useReducer } from 'react'

type Key = 'old' | 'new'

export type TextParse = Record<
  Key,
  {
    originText: string
    dataList: object[]
    message?: string
  }
>

type TextParseAction =
  | {
      type: 'update'
      key: Key
      payload: string
    }
  | {
      type: 'reset'
    }

/**
 * Reducer
 * @param state
 * @param action
 * @returns
 */
const reducer = (state: TextParse, action: TextParseAction) => {
  if (action.type === 'reset') return getInitialState()
  const { key, payload } = action
  const result = parseText(payload)

  return { ...state, [key]: result }
}

/**
 * State 初期値を取得する
 * @returns
 */
const getInitialState = (): TextParse => ({
  old: {
    originText: getDefaultText(),
    dataList: [],
    message: undefined,
  },
  new: {
    originText: getDefaultText(),
    dataList: [],
    message: undefined,
  },
})

/**
 * テキストの初期値を取得する
 * 半角スペースまでを含めているため消したりスペースを変更しないこと
 * @returns
 */
const getDefaultText = (): string => {
  return `[
  {
    
  }
]`
}

/**
 * テキストを解析した結果を返す
 * @param originText
 * @returns
 */
const parseText = (originText: string) => {
  try {
    const parsedData = JSON5.parse(originText)
    if (!Array.isArray(parsedData)) throw new Error('InputValue must be array.')
    if (parsedData.length === 0) throw new Error('InputValue must include data.')
    if (!isObjectArray(parsedData)) throw new Error('InputValue must include only objects.')
    return {
      originText,
      dataList: parsedData,
      message: undefined,
    }
  } catch (e: unknown) {
    const noData: object[] = []
    let message: string | undefined
    if (e instanceof Error) message = e.message
    return {
      originText,
      dataList: noData,
      message,
    }
  }
}

/**
 * オブジェクト型配列の型ガード
 * @param array
 * @returns
 */
const isObjectArray = (array: unknown[]): array is object[] => {
  return array.every((data) => isObjectData(data))
}

/**
 * オブジェクト型の型ガード
 * @param array
 * @returns
 */
const isObjectData = (data: unknown): data is object => {
  return typeof data === 'object' && data !== null
}

const TextParseContext = createContext<[TextParse, Dispatch<TextParseAction>] | undefined>(
  undefined
)

/**
 * Context
 * @returns
 */
export const useTextParseContext = () => {
  const context = useContext(TextParseContext)
  if (context === undefined) throw new Error()

  return context
}

/**
 * Provider
 * @param children
 * @returns
 */
export const TextParseProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, getInitialState())

  return <TextParseContext.Provider value={[state, dispatch]}>{children}</TextParseContext.Provider>
}
