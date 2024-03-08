import { atom } from 'jotai'
import { TextParseAtom } from './TextParseAtom'

/**
 * Default Value
 */
const DefaultUniqueKeys = (): string[] => {
  return []
}

/**
 * Main Atom
 */
const uniqueKeysAtom = atom<string[]>(DefaultUniqueKeys())

/**
 * Computed Atom
 * TextParse の新旧データで共通したKeyを取得する
 * @dependence TextParseAtom
 */
const commonKeysAtom = atom((get) => {
  const { oldData, newData } = get(TextParseAtom.record)
  const oldKeys = Array.from(new Set(oldData.list.flatMap((data) => Object.keys(data))))
  const newKeys = Array.from(new Set(newData.list.flatMap((data) => Object.keys(data))))
  const allKeys = Array.from(new Set([...oldKeys, ...newKeys]))
  const commonKeys = allKeys.reduce((array: string[], key) => {
    if (oldKeys.includes(key) && newKeys.includes(key)) array.push(key)
    return array
  }, [])

  return commonKeys
})

/**
 * Atom Interface
 */
export const RecordKeyAtom = {
  /**
   * UniqueKeysはCommonKeysの中からSelectする仕様
   * CommonKeysが変更された場合に対応するため、フィルタリング処理を挟む
   */
  uniqueKeys: atom((get) => {
    const uniqueKeys = get(uniqueKeysAtom)
    const commonKeys = get(commonKeysAtom)
    return uniqueKeys.filter((key) => commonKeys.includes(key))
  }),
  commonKeys: commonKeysAtom,
  update: atom(null, (_get, set, uniqueKeys: string[]) => {
    set(uniqueKeysAtom, uniqueKeys)
  }),
  reset: atom(null, (_get, set) => {
    set(uniqueKeysAtom, DefaultUniqueKeys())
  }),
} as const
