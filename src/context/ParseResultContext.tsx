'use client'
import JSON5 from 'json5'
import { Dispatch, ReactNode, createContext, useContext, useReducer } from 'react'

type ParseResult = Record<
  'old' | 'new',
  {
    dataList: object[]
    message?: string
  }
>

type ParseResultReducerAction = {
  key: 'old' | 'new'
  payload: string
}

const reducer = (state: ParseResult, action: ParseResultReducerAction) => {
  const { key, payload } = action
  const result = parseText(payload)

  return { ...state, [key]: result }
}

const parseText = (text: string) => {
  try {
    const parsedData = JSON5.parse(text)
    if (!Array.isArray(parsedData)) throw new Error('InputValue must be array.')
    if (parsedData.length === 0) throw new Error('InputValue must include data.')
    if (!isObjectArray(parsedData)) throw new Error('InputValue must include only objects.')
    return {
      dataList: parsedData,
      message: undefined,
    }
  } catch (e: unknown) {
    const noData: object[] = []
    let message: string | undefined
    if (e instanceof Error) message = e.message
    return {
      dataList: noData,
      message,
    }
  }
}

const isObjectArray = (array: unknown[]): array is object[] => {
  return array.every((data) => isObjectData(data))
}

const isObjectData = (data: unknown): data is object => {
  return typeof data === 'object' && data !== null
}

const initialState: ParseResult = {
  old: {
    dataList: [],
    message: undefined,
  },
  new: {
    dataList: [],
    message: undefined,
  },
}

const ParseResultContext = createContext<
  [ParseResult, Dispatch<ParseResultReducerAction>] | undefined
>(undefined)

export const useParseResultContext = () => {
  const context = useContext(ParseResultContext)
  if (context === undefined) throw new Error()

  return context
}

export const ParseResultProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <ParseResultContext.Provider value={[state, dispatch]}>{children}</ParseResultContext.Provider>
  )
}
