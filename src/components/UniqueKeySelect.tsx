import { useTextParseContext } from '@/context/TextParseContext'
import { useUniqueKeyContext } from '@/context/UniqueKeyContext'
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
import { useEffect, useState } from 'react'

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

const generateCommonKeys = (oldData: object[], newData: object[]) => {
  const oldKeys = Array.from(new Set(oldData.flatMap((data) => Object.keys(data))))
  const newKeys = Array.from(new Set(newData.flatMap((data) => Object.keys(data))))
  const allKeys = Array.from(new Set([...oldKeys, ...newKeys]))
  const commonKeys = allKeys.reduce((array: string[], key) => {
    if (oldKeys.includes(key) && newKeys.includes(key)) array.push(key)
    return array
  }, [])

  return commonKeys
}

const UniqueKeySelect = () => {
  const [textParse] = useTextParseContext()
  const [uniqueKey, dispatchUniqueKey] = useUniqueKeyContext()
  const [commonKeys, setCommonKeys] = useState<string[]>([])

  useEffect(() => {
    const commonKeys = generateCommonKeys(textParse.old.dataList, textParse.new.dataList)
    setCommonKeys(commonKeys)
  }, [textParse])

  useEffect(() => {
    const payload = uniqueKey.filter((key) => commonKeys.includes(key))
    dispatchUniqueKey({ type: 'update', payload })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commonKeys])

  return (
    <FormControl sx={{ width: 250 }} className="mt-2">
      <InputLabel id="demo-multiple-checkbox-label">Select Unique Key</InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={uniqueKey}
        input={<OutlinedInput label="Select Unique Key" />}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={getMenuProps()}
        disabled={commonKeys.length === 0}
        error={uniqueKey.length === 0}
        onChange={(event: SelectChangeEvent<string[]>) => {
          const value = event.target.value
          // On autofill we get a stringified value.
          const payload = typeof value === 'string' ? value.split(',') : value
          dispatchUniqueKey({ type: 'update', payload })
        }}
      >
        {commonKeys.map((key) => (
          <MenuItem key={key} value={key}>
            <Checkbox checked={uniqueKey.includes(key)} />
            <ListItemText primary={key} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default UniqueKeySelect
