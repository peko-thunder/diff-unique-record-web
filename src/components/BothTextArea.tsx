import { useTextParseContext } from '@/context/TextParseContext'
import { TextField } from '@mui/material'
import { ChangeEvent } from 'react'

const BothTextArea = () => {
  const [textParse, dispatchTextParse] = useTextParseContext()

  const handleInput = (event: ChangeEvent<HTMLInputElement>, key: keyof typeof textParse) => {
    const payload = event.target.value
    dispatchTextParse({ type: 'update', key, payload })
  }

  return (
    <div className="flex gap-2">
      <TextField
        label="OldData"
        required
        multiline
        rows={8}
        value={textParse.old.originText}
        error={Boolean(textParse.old.message)}
        helperText={textParse.old.message}
        variant="outlined"
        className="w-1/2 mt-2"
        onInput={(event: ChangeEvent<HTMLInputElement>) => handleInput(event, 'old')}
      />

      <TextField
        label="NewData"
        required
        multiline
        rows={8}
        value={textParse.new.originText}
        error={Boolean(textParse.new.message)}
        helperText={textParse.new.message}
        variant="outlined"
        className="w-1/2 mt-2"
        onInput={(event: ChangeEvent<HTMLInputElement>) => handleInput(event, 'new')}
      />
    </div>
  )
}

export default BothTextArea
