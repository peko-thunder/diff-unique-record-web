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
