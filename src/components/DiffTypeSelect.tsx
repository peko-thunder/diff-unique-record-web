import { DefaultDiffTypes, DiffTypeSelectAtom } from '@/atoms/DiffTypeSelectAtom'
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

const getMenuProps = () => {
  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8
  return {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 5.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  }
}

const DiffTypeSelect = () => {
  const diffTypes = useAtomValue(DiffTypeSelectAtom.select)
  const updateDiffTypes = useSetAtom(DiffTypeSelectAtom.update)

  return (
    <FormControl sx={{ width: 250 }} className="mt-2">
      <InputLabel id="demo-multiple-checkbox-label">Select Diff Type</InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={diffTypes}
        input={<OutlinedInput label="Select Diff Type" />}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={getMenuProps()}
        onChange={(event: SelectChangeEvent<DiffType[]>) => {
          const value = event.target.value
          // On autofill we get a stringified value.
          const diffTYpes = typeof value === 'string' ? (value.split(',') as DiffType[]) : value
          updateDiffTypes(diffTYpes)
        }}
      >
        {DefaultDiffTypes().map((diffType) => (
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
