import { ParsedType, TextParseAtom } from '@/atoms/TextParseAtom'
import { TextField } from '@mui/material'
import { useAtomValue, useSetAtom } from 'jotai'
import { ChangeEvent } from 'react'

const BothTextArea = () => {
  const diffRecord = useAtomValue(TextParseAtom.record)
  const updateText = useSetAtom(TextParseAtom.update)

  const handleInput = (event: ChangeEvent<HTMLInputElement>, type: ParsedType) => {
    const payload = event.target.value
    updateText(type, payload)
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      <TextField
        label="OldData"
        required
        multiline
        rows={8}
        value={diffRecord.oldData.origin}
        error={Boolean(diffRecord.oldData.message)}
        helperText={diffRecord.oldData.message}
        variant="outlined"
        className="mt-2"
        onInput={(event: ChangeEvent<HTMLInputElement>) => handleInput(event, 'oldData')}
      />

      <TextField
        label="NewData"
        required
        multiline
        rows={8}
        value={diffRecord.newData.origin}
        error={Boolean(diffRecord.newData.message)}
        helperText={diffRecord.newData.message}
        variant="outlined"
        className="mt-2"
        onInput={(event: ChangeEvent<HTMLInputElement>) => handleInput(event, 'newData')}
      />
    </div>
  )
}

export default BothTextArea
