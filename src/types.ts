/**
 * オブジェクト型配列の型ガード
 * @param array
 * @returns
 */
export const isObjectArray = (array: unknown[]): array is object[] => {
  return array.every((data) => isObjectData(data))
}

/**
 * オブジェクト型の型ガード
 * @param array
 * @returns
 */
export const isObjectData = (data: unknown): data is object => {
  return typeof data === 'object' && data !== null
}
