import { DiffTypeSelectAtom } from '@/atoms/DiffTypeSelectAtom'
import { RecordKeyAtom } from '@/atoms/RecordKeyAtom'
import { TextParseAtom } from '@/atoms/TextParseAtom'
import { ParseResult } from '@/workers/parse.worker'
import { useAtomValue } from 'jotai'
import { useEffect, useState } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import styled from 'styled-components'

/**
 * SyntaxHighlighter で表示する行のスタイリングクラス
 */
type LineType = 'added' | 'removed' | 'unchanged'

const DiffResult = () => {
  const diffRecord = useAtomValue(TextParseAtom.record)
  const uniqueKeys = useAtomValue(RecordKeyAtom.uniqueKeys)
  const diffTypes = useAtomValue(DiffTypeSelectAtom.select)

  // 文字列解析処理はマルチスレッドで実行して結果をstateに格納する
  const [rowText, dispatchRowText] = useState('')
  const [addedRowNums, dispatchAddedRowNums] = useState<number[]>([])
  const [removedRowNums, dispatchRemovedRowNums] = useState<number[]>([])
  useEffect(() => {
    const worker = new Worker(new URL('../workers/parse.worker', import.meta.url))
    worker.addEventListener('message', (e: { data: ParseResult }) => {
      const parseResult = e.data
      dispatchRowText(parseResult.diffText)
      dispatchAddedRowNums(parseResult.addedRowNums)
      dispatchRemovedRowNums(parseResult.removedRowNums)
    })

    worker.postMessage({ diffRecord, uniqueKeys, diffTypes })
  }, [diffRecord, uniqueKeys, diffTypes])

  const lineProps = (lineNumber: number) => {
    // なぜかclassNameを設定しても反映されないため、data属性を付与してスタイル反映
    // classNameなどの正規のプロパティをreturnに含む必要があるためundefinedで設定
    let lineType: LineType = 'unchanged'
    if (addedRowNums.includes(lineNumber)) lineType = 'added'
    if (removedRowNums.includes(lineNumber)) lineType = 'removed'

    return { className: undefined, 'data-line-type': lineType }
  }

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
