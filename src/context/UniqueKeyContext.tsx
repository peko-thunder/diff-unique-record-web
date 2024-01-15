'use client'
import { Dispatch, ReactNode, createContext, useContext, useReducer } from 'react'

type UniqueKey = string[]

type UniqueKeyReducerAction = {
  payload: string
}

const reducer = (state: UniqueKey, action: UniqueKeyReducerAction) => {
  const { payload } = action

  if (state.includes(payload)) {
    return [...state.filter((key) => key !== payload)]
  } else {
    return [...state, payload]
  }
}

const initialState: UniqueKey = []

const UniqueKeyContext = createContext<[UniqueKey, Dispatch<UniqueKeyReducerAction>] | undefined>(
  undefined
)

export const useUniqueKeyContext = () => {
  const context = useContext(UniqueKeyContext)
  if (context === undefined) throw new Error()

  return context
}

export const UniqueKeyProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return <UniqueKeyContext.Provider value={[state, dispatch]}>{children}</UniqueKeyContext.Provider>
}
