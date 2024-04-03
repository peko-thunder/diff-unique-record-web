import { DiffRecord } from '@/atoms/TextParseAtom'
import { DiffType, diff, generateDiffText } from 'diff-unique-record'

/**
 * Parse パラメーター
 */
export type ParseParam = {
  diffRecord: DiffRecord
  uniqueKeys: string[]
  diffTypes: DiffType[]
}

/**
 * Parse 結果
 */
export type ParseResult = {
  diffText: string
  addedRowNums: number[]
  removedRowNums: number[]
}

/**
 * 差分テキストを解析した結果
 */
type ParsedDiffInfo = Record<'addedRowNums' | 'removedRowNums', number[]>

/**
 * Web Worker Thread
 * 数千行の配列を扱う場合、動作に影響を与える可能性を考慮して作成
 *
 */
addEventListener('message', (e: { data: ParseParam }): void => {
  const parseResult = parseDiffRecord(e.data)

  postMessage(parseResult)
})

/**
 * 差分テキストを取得する
 * @param param
 * @returns
 */
export const parseDiffRecord = (param: ParseParam): ParseResult => {
  const EMPTY_DATA = { diffText: '', addedRowNums: [], removedRowNums: [] }
  if (param.uniqueKeys.length === 0) return EMPTY_DATA

  const diffResults = diffDataList(param)
  const diffText = generateDiffText(diffResults)
  const parsedDiffInfo = parseDiffText(diffText)

  return { diffText, ...parsedDiffInfo }
}

/**
 * 新旧のデータをSelectデータで比較/フィルタする
 * @param param
 * @returns
 */
const diffDataList = (param: ParseParam) => {
  const { diffRecord, uniqueKeys, diffTypes } = param
  const diffResults = diff({
    old: diffRecord.oldData.list,
    new: diffRecord.newData.list,
    keys: uniqueKeys as never[],
  }).filter((result) => diffTypes.includes(result.type))

  return diffResults
}

/**
 * 差分テキストを解析する。
 * + or -のプレフィックスを持つ行番号を配列化する。
 * @param diffText
 * @returns
 */
const parseDiffText = (diffText: string): ParsedDiffInfo => {
  const addedRowNums: number[] = []
  const removedRowNums: number[] = []
  diffText.split(/\n/).forEach((row, i) => {
    const rowNumer = i + 1
    if (/^\+.*$/.test(row)) addedRowNums.push(rowNumer)
    if (/^-.*$/.test(row)) removedRowNums.push(rowNumer)
  })

  return { addedRowNums, removedRowNums }
}
