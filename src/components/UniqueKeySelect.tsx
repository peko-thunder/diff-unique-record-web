import { RecordKeyAtom } from '@/atoms/RecordKeyAtom'
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import { useAtomValue, useSetAtom } from 'jotai'

const UniqueKeySelect = () => {
  const commonKeys = useAtomValue(RecordKeyAtom.commonKeys)
  const uniqueKeys = useAtomValue(RecordKeyAtom.uniqueKeys)
  const updateUniqueKeys = useSetAtom(RecordKeyAtom.update)

  return (
    <FormControl className="mt-2">
      <InputLabel id="demo-multiple-checkbox-label">Select Unique Key</InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={uniqueKeys}
        input={<OutlinedInput label="Select Unique Key" />}
        renderValue={(selected) => selected.join(', ')}
        disabled={commonKeys.length === 0}
        error={uniqueKeys.length === 0}
        onChange={(event: SelectChangeEvent<string[]>) => {
          const value = event.target.value
          // On autofill we get a stringified value.
          const payload = typeof value === 'string' ? value.split(',') : value
          updateUniqueKeys(payload)
        }}
      >
        {commonKeys.map((key) => (
          <MenuItem key={key} value={key}>
            <Checkbox checked={uniqueKeys.includes(key)} />
            <ListItemText primary={key} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default UniqueKeySelect
