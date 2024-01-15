import { useParseResultContext } from '@/context/ParseResultContext'
import { useUniqueKeyContext } from '@/context/UniqueKeyContext'
import { diff, generateDiffText } from 'diff-unique-record'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import styled from 'styled-components'

const diffParsedData = (oldData: object[], newData: object[], keys: string[]) => {
  const results = diff({
    // TODO: keyof に調整できるか検証
    // npm の方でkeysのlength0の場合のエスケープ処理を入れる？
    // keysを選択してなければresultを表示したくない
    old: oldData,
    new: newData,
    keys: keys as never[],
  })
  const diffText = generateDiffText(results)
  const { addedRowNums, removedRowNums, rowText } = parseDiffText(diffText)
  const lineProps = (lineNumber: number) => {
    // なぜかclassNameを設定しても反映されないため、data属性を付与してスタイル反映
    // classNameなどの正規のプロパティをreturnに含む必要があるためundefinedで設定
    let lineType = 'unchanged'
    if (addedRowNums.includes(lineNumber)) lineType = 'added'
    if (removedRowNums.includes(lineNumber)) lineType = 'removed'

    return { className: undefined, 'data-line-type': lineType }
  }

  return { rowText, lineProps }
}

/**
 * 差分テキストを解析する。
 * + or -のプレフィックスを持つ行番号を配列化する。
 * 元テキストからはプレフィックスを空白文字に置換する。
 * @param diffText
 * @returns
 */
export const parseDiffText = (diffText: string) => {
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

const DiffResult = () => {
  const [parseResult] = useParseResultContext()
  const [uniqueKey] = useUniqueKeyContext()
  const { rowText, lineProps } = diffParsedData(
    parseResult.old.dataList,
    parseResult.new.dataList,
    uniqueKey
  )

  return (
    <LineStyleWrapper>
      <SyntaxHighlighter
        language="typescript"
        style={docco}
        wrapLines
        showLineNumbers
        lineNumberStyle={{ display: 'none' }}
        lineProps={lineProps}
      >
        {rowText}
      </SyntaxHighlighter>
    </LineStyleWrapper>
  )
}

/**
 * SyntaxHighlighter の特定行に対してスタイルを適応するにあたって、個別のスタイルを属性で設定
 */
const LineStyleWrapper = styled.div`
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
