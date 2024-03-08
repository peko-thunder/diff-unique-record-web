import { DiffTypeSelectAtom } from '@/atoms/DiffTypeSelectAtom'
import { RecordKeyAtom } from '@/atoms/RecordKeyAtom'
import { DiffRecord, TextParseAtom } from '@/atoms/TextParseAtom'
import { DiffType, diff, generateDiffText } from 'diff-unique-record'
import { useAtomValue } from 'jotai'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import styled from 'styled-components'

/**
 * 空オプション
 */
const EMPTY_OPTION = { rowText: '', lineProps: () => ({}) }

/**
 * DiffResult 生成パラメーター
 */
type ResultParam = {
  diffRecord: DiffRecord
  uniqueKeys: string[]
  diffTypes: DiffType[]
}

/**
 * 差分結果を生成する
 * @param param
 * @returns
 */
export const generateDiffResult = (param: ResultParam) => {
  if (param.uniqueKeys.length === 0) return EMPTY_OPTION
  const diffResults = diffDataList(param)
  const diffText = generateDiffText(diffResults)
  const parsedDiffInfo = parseDiffText(diffText)
  const lineProps = generateLineProps(parsedDiffInfo)

  return { rowText: parsedDiffInfo.rowText, lineProps }
}

/**
 * 新旧のデータをSelectデータで比較/フィルタする
 * @param param
 * @returns
 */
const diffDataList = ({ diffRecord, uniqueKeys, diffTypes }: ResultParam) => {
  const diffResults = diff({
    old: diffRecord.oldData.list,
    new: diffRecord.newData.list,
    keys: uniqueKeys as never[],
  }).filter((result) => diffTypes.includes(result.type))

  return diffResults
}

/**
 * 差分テキストを解析した結果
 */
type ParsedDiffInfo = { rowText: string } & DiffRowNums

/**
 * 差分テキストを解析する。
 * + or -のプレフィックスを持つ行番号を配列化する。
 * 元テキストからはプレフィックスを空白文字に置換する。
 * @param diffText
 * @returns
 */
const parseDiffText = (diffText: string): ParsedDiffInfo => {
  const addedRowNums: number[] = []
  const removedRowNums: number[] = []
  const rows = diffText.split(/\n/)
  const excludedPrefixRows = rows.map((row, i) => {
    const rowNumer = i + 1
    if (/^\+.*$/.test(row)) addedRowNums.push(rowNumer)
    if (/^-.*$/.test(row)) removedRowNums.push(rowNumer)

    return row.replace(/^\+/, ' ').replace(/^\-/, ' ')
  })

  return {
    addedRowNums,
    removedRowNums,
    rowText: excludedPrefixRows.join('\n'),
  }
}

/**
 * Diff 結果(+, -)の行ナンバーをまとめたデータ構造
 */
type DiffRowNums = Record<'addedRowNums' | 'removedRowNums', number[]>

/**
 * SyntaxHighlighter で使用するオプションを作成する
 * LineごとにCSSのStyleを当てる処理を作成
 * @param diffRowNums
 * @returns
 */
const generateLineProps = ({ addedRowNums, removedRowNums }: DiffRowNums) => {
  const lineProps = (lineNumber: number) => {
    // なぜかclassNameを設定しても反映されないため、data属性を付与してスタイル反映
    // classNameなどの正規のプロパティをreturnに含む必要があるためundefinedで設定
    let lineType = 'unchanged'
    if (addedRowNums.includes(lineNumber)) lineType = 'added'
    if (removedRowNums.includes(lineNumber)) lineType = 'removed'

    return { className: undefined, 'data-line-type': lineType }
  }

  return lineProps
}

const DiffResult = () => {
  const diffRecord = useAtomValue(TextParseAtom.record)
  const uniqueKeys = useAtomValue(RecordKeyAtom.uniqueKeys)
  const diffTypes = useAtomValue(DiffTypeSelectAtom.select)

  const { rowText, lineProps } = generateDiffResult({ diffRecord, uniqueKeys, diffTypes })

  return (
    <StyleWrapper>
      <SyntaxHighlighter
        language="typescript"
        style={docco}
        wrapLines
        showLineNumbers
        lineNumberStyle={{ display: 'none' }}
        lineProps={lineProps}
        customStyle={{
          height: '100%',
          minHeight: '300px',
          maxHeight: '60lvh',
          border: '1px solid rgba(0, 0, 0, 0.23)',
          borderRadius: '4px',
        }}
      >
        {rowText}
      </SyntaxHighlighter>
    </StyleWrapper>
  )
}

/**
 * SyntaxHighlighter の特定行に対してスタイルを適応するにあたって、個別のスタイルを属性で設定
 */
const StyleWrapper = styled.div`
  height: 100%;
  [data-line-type='added'] {
    position: relative;
    display: block;
    background-color: rgba(64, 174, 207, 0.3);
  }
  [data-line-type='added']::before {
    content: '+';
    position: absolute;
    top: 0;
    left: 0;
  }
  [data-line-type='removed'] {
    position: relative;
    display: block;
    background-color: rgba(211, 94, 94, 0.3);
  }
  [data-line-type='removed']::before {
    content: '-';
    position: absolute;
    top: 0;
    left: 0;
  }
`

export default DiffResult
