import { DiffType } from 'diff-unique-record'
import { atom } from 'jotai'

/**
 * Default Value
 * use select component
 */
export const DefaultDiffTypes = (): DiffType[] => {
  return ['added', 'removed', 'updated', 'unchanged']
}

/**
 * Main Atom
 */
const diffTypesAtom = atom<DiffType[]>(DefaultDiffTypes())

/**
 * Atom Interface
 */
export const DiffTypeSelectAtom = {
  select: atom((get) => get(diffTypesAtom)),
  update: atom(null, (_get, set, diffTypes: DiffType[]) => {
    // デフォルト配列の並びに対応したデータをセットする
    // UI上で選択している配列の中身を表示しているので、データの並びを統一する
    const select = DefaultDiffTypes().filter((diffType) => diffTypes.includes(diffType))
    set(diffTypesAtom, select)
  }),
  reset: atom(null, (_get, set) => {
    set(diffTypesAtom, DefaultDiffTypes())
  }),
} as const
