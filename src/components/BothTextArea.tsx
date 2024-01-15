import { useBothTextContext } from '@/context/BothTextContext'
import { useParseResultContext } from '@/context/ParseResultContext'
import { TextField } from '@mui/material'
import { ChangeEvent } from 'react'

const BothTextArea = () => {
  const [bothText, dispatchBothText] = useBothTextContext()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_parseResult, dispatchParseResult] = useParseResultContext()

  const handleInput = (event: ChangeEvent<HTMLInputElement>, key: keyof typeof bothText) => {
    const value = event.target.value
    dispatchBothText({ type: 'update', key, payload: value })
    dispatchParseResult({ key, payload: value })
  }

  return (
    <>
      <TextField
        label="OldData"
        required
        multiline
        rows={8}
        value={bothText.old}
        variant="outlined"
        className="w-1/2"
        onInput={(event: ChangeEvent<HTMLInputElement>) => handleInput(event, 'old')}
      />

      <TextField
        label="NewData"
        required
        multiline
        rows={8}
        value={bothText.new}
        variant="outlined"
        className="w-1/2"
        onInput={(event: ChangeEvent<HTMLInputElement>) => handleInput(event, 'new')}
      />
    </>
  )
}

export default BothTextArea
