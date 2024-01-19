import { useMultiSelectContext } from '@/context/MultiSelectContext'
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
// import { useState } from 'react'

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

const getDiffTypes = (): DiffType[] => {
  return ['added', 'removed', 'updated', 'unchanged']
}

const DiffTypeSelect = () => {
  const [multiSelect, dispatchMultiSelect] = useMultiSelectContext()

  return (
    <FormControl sx={{ width: 250 }} className="mt-2">
      <InputLabel id="demo-multiple-checkbox-label">Select Diff Type</InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={multiSelect.diff}
        input={<OutlinedInput label="Select Diff Type" />}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={getMenuProps()}
        onChange={(event: SelectChangeEvent<DiffType[]>) => {
          const value = event.target.value
          // On autofill we get a stringified value.
          const selects = typeof value === 'string' ? (value.split(',') as DiffType[]) : value
          // selectedValues は選択した順番のデータであるため、デフォルトのdiffTypesと並びが異なる場合がある
          // filter, includesで明示的にデフォルトの並びに変更している
          const payload = getDiffTypes().filter((diffType) => selects.includes(diffType))
          dispatchMultiSelect({ type: 'update', select: 'diff', payload })
        }}
      >
        {getDiffTypes().map((diffType) => (
          <MenuItem key={diffType} value={diffType}>
            <Checkbox checked={multiSelect.diff.includes(diffType)} />
            <ListItemText primary={diffType} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default DiffTypeSelect
