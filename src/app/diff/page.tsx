'use client'
import TextParser from '@/components/TextParser'
import { diff, generateDiffText } from 'diff-unique-record'
import * as React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { parseDiffText } from './parse'
import './style.css'

const getCommonKeys = (oldData: object[], newData: object[]) => {
  const oldKeys = Array.from(new Set(oldData.flatMap((data) => Object.keys(data))))
  const newKeys = Array.from(new Set(newData.flatMap((data) => Object.keys(data))))
  const allKeys = Array.from(new Set([...oldKeys, ...newKeys]))
  const commonKeys = allKeys.reduce((array: string[], key) => {
    if (oldKeys.includes(key) && newKeys.includes(key)) array.push(key)
    return array
  }, [])

  return commonKeys
}

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

    return { className: undefined, 'data-highlighter-line-type': lineType }
  }

  // keysに関しては最悪これでもいいが、他にも検討したい
  // return { rowText: keys.length ? rowText : '', lineProps }
  return { rowText, lineProps }
}

const Diff = () => {
  const [parsedOldData, setParsedDataOld] = React.useState<object[]>([])
  const [errorMessageOld, setErrorMessageOld] = React.useState<string | undefined>(undefined)
  const [parsedNewData, setParsedDataNew] = React.useState<object[]>([])
  const [errorMessageNew, setErrorMessageNew] = React.useState<string | undefined>(undefined)
  const errorMessages = [errorMessageOld, errorMessageNew].filter(
    (message): message is string => message !== undefined
  )
  const [checkedKeys, setCheckedKeys] = React.useState<string[]>([])

  const commonKeys = getCommonKeys(parsedOldData, parsedNewData)
  const { rowText, lineProps } = diffParsedData(parsedOldData, parsedNewData, checkedKeys)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full font-mono text-sm">
        <div className="mt-10 mb-10">
          <p className="mb-0">Common Keys</p>
          <p className="mb-2 text-orange-500">Please check multi unique keys.</p>
          <div className="flex">
            {/* material-ui でできないか確認する */}
            {commonKeys.map((key, i) => (
              <label key={i} className="flex mr-4 cursor-pointer">
                <input
                  className="mr-1"
                  type="checkbox"
                  value={key}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const value = event.target.value
                    if (checkedKeys.includes(value)) {
                      setCheckedKeys([...checkedKeys.filter((key) => key !== value)])
                    } else {
                      setCheckedKeys([...checkedKeys, value])
                    }
                  }}
                />
                {key}
              </label>
            ))}
          </div>
        </div>

        <TextParser
          label="OldData"
          setParsedData={setParsedDataOld}
          setErrorMessage={setErrorMessageOld}
          // サンプルデータを渡して表示する機能を作りたい
          // リセットボタンも追加する
          // inputValue={JSON5.stringify(oldDataList)}
          className="w-1/2"
        />

        <TextParser
          label="NewData"
          setParsedData={setParsedDataNew}
          setErrorMessage={setErrorMessageNew}
          className="w-1/2"
        />

        {errorMessages.length ? (
          <ul className="mt-10 mb-10 text-red-500">
            {errorMessages.map((message, i) => (
              <li key={i}>{message}</li>
            ))}
          </ul>
        ) : undefined}

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
      </div>
    </main>
  )
}

export default Diff
