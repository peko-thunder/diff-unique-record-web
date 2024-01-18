'use client'
import { Dispatch, ReactNode, createContext, useContext, useReducer } from 'react'

type UniqueKey = string[]

type UniqueKeyReducerAction =
  | {
      type: 'update'
      payload: string[]
    }
  | {
      type: 'reset'
    }

const reducer = (state: UniqueKey, action: UniqueKeyReducerAction) => {
  if (action.type === 'reset') return []

  return action.payload
  // const { commonKeys, payload } = action
  // const checkedKeys = state.filter((stateKey) => commonKeys.includes(stateKey))

  // if (checkedKeys.includes(payload)) {
  //   return [...checkedKeys.filter((key) => key !== payload)]
  // } else {
  //   return [...checkedKeys, payload]
  // }
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
