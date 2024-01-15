'use client'
import { Dispatch, ReactNode, createContext, useContext, useReducer } from 'react'

interface BothText {
  old: string
  new: string
}

type BothTextReducerAction =
  | {
      type: 'update'
      key: keyof BothText
      payload: string
    }
  | {
      type: 'reset'
    }

const reducer = (state: BothText, action: BothTextReducerAction) => {
  const { type } = action
  if (type === 'update') {
    return { ...state, [action.key]: action.payload }
  }
  if (type === 'reset') {
    return initialState
  }

  throw new Error('Reduce Error: BothText Action is invalid.')
}

const getDefaultValue = (): string => {
  // 半角スペースまでを含めているため消さないこと
  return `[
  {
    
  }
]`
}

const initialState: BothText = {
  old: getDefaultValue(),
  new: getDefaultValue(),
}

const BothTextContext = createContext<[BothText, Dispatch<BothTextReducerAction>] | undefined>(
  undefined
)

export const useBothTextContext = () => {
  const context = useContext(BothTextContext)
  if (context === undefined) throw new Error()

  return context
}

export const BothTextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return <BothTextContext.Provider value={[state, dispatch]}>{children}</BothTextContext.Provider>
}
