import { AllDiffTypes, DiffTypeSelectAtom } from '@/atoms/DiffTypeSelectAtom'
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
import { DiffType } from 'diff-unique-record'
import { useAtomValue, useSetAtom } from 'jotai'

const DiffTypeSelect = () => {
  const diffTypes = useAtomValue(DiffTypeSelectAtom.select)
  const updateDiffTypes = useSetAtom(DiffTypeSelectAtom.update)

  return (
    <FormControl className="mt-2">
      <InputLabel id="demo-multiple-checkbox-label">Select Diff Type</InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={diffTypes}
        input={<OutlinedInput label="Select Diff Type" />}
        renderValue={(selected) => selected.join(', ')}
        onChange={(event: SelectChangeEvent<DiffType[]>) => {
          const value = event.target.value
          // On autofill we get a stringified value.
          const diffTYpes = typeof value === 'string' ? (value.split(',') as DiffType[]) : value
          updateDiffTypes(diffTYpes)
        }}
      >
        {AllDiffTypes().map((diffType) => (
          <MenuItem key={diffType} value={diffType}>
            <Checkbox checked={diffTypes.includes(diffType)} />
            <ListItemText primary={diffType} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default DiffTypeSelect
