'use client'
import { TextField } from '@mui/material'
import JSON5 from 'json5'
import * as React from 'react'

export type ParseTextResult =
  | {
      isSuccess: true
      parsedData: object[]
    }
  | {
      isSuccess: false
      message: string | undefined
    }

export const parseText = (inputText: string, label: string): ParseTextResult => {
  try {
    const parsedData = JSON5.parse(inputText)
    if (!Array.isArray(parsedData)) throw new Error('InputValue must be array.')
    if (parsedData.length === 0) throw new Error('InputValue must include data.')
    if (!isObjectArray(parsedData)) throw new Error('InputValue must include only objects.')
    return {
      isSuccess: true,
      parsedData,
    }
  } catch (e: unknown) {
    let message: string | undefined
    if (e instanceof Error) {
      message = `[${label}] ${e.message}`
    }
    return {
      isSuccess: false,
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

const getDefaultValue = (): string => {
  // 半角スペースまでを含めているため消さないこと
  return `[
  {
    
  }
]`
}

interface TextParserProps {
  label: string
  setParsedData: React.Dispatch<React.SetStateAction<object[]>>
  setErrorMessage: React.Dispatch<React.SetStateAction<string | undefined>>
  className?: string
}

const TextParser = ({ label, setParsedData, setErrorMessage, className }: TextParserProps) => {
  const [text, setText] = React.useState(getDefaultValue())

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value
    setText(text)
    const result = parseText(text, label)
    if (result.isSuccess === true) {
      setParsedData(result.parsedData)
      setErrorMessage(undefined)
    }
    if (result.isSuccess === false) {
      setErrorMessage(result.message)
    }
  }

  return (
    <TextField
      label={label}
      required
      multiline
      rows={8}
      value={text}
      variant="outlined"
      onInput={handleInput}
      className={className}
    />
  )
}

export default TextParser
