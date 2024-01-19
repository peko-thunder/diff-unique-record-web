'use client'
import { DiffType } from 'diff-unique-record'
import { Dispatch, ReactNode, createContext, useContext, useReducer } from 'react'

export type MultiSelect = {
  unique: string[]
  diff: DiffType[]
}

interface UniqueMutate {
  select: 'unique'
  payload: string[]
}

interface DiffMutate {
  select: 'diff'
  payload: DiffType[]
}

type MultiSelectReducerAction =
  | ({ type: 'update' } & (UniqueMutate | DiffMutate))
  | { type: 'reset' }

const reducer = (state: MultiSelect, action: MultiSelectReducerAction) => {
  if (action.type === 'reset') return getInitialState()
  const { select, payload } = action

  return { ...state, [select]: payload }
}

const getInitialState = (): MultiSelect => {
  return {
    unique: [],
    diff: ['added', 'removed', 'updated', 'unchanged'],
  }
}

const MultiSelectContext = createContext<
  [MultiSelect, Dispatch<MultiSelectReducerAction>] | undefined
>(undefined)

export const useMultiSelectContext = () => {
  const context = useContext(MultiSelectContext)
  if (context === undefined) throw new Error()

  return context
}

export const MultiSelectProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, getInitialState())

  return (
    <MultiSelectContext.Provider value={[state, dispatch]}>{children}</MultiSelectContext.Provider>
  )
}
