import { useMultiSelectContext } from '@/context/MultiSelectContext'
import { useTextParseContext } from '@/context/TextParseContext'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import JSON5 from 'json5'

const oldDataList = [
  // object/key unchanged
  {
    date: '2023-12-01',
    name: 'sales',
    value: 100,
  },
  // object/key updated
  {
    date: '2023-12-01',
    name: 'rate',
    value: 20,
  },
  // object removed
  {
    date: '2023-12-02',
    name: 'sales',
    value: 80,
  },
  // key removed/added
  {
    date: '2023-12-04',
    name: 'sales',
    value: 90,
    oldtmp: 'test',
  },
]

const newDataList = [
  // object/key unchanged
  {
    date: '2023-12-01',
    name: 'sales',
    value: 100,
  },
  // object/key updated
  {
    date: '2023-12-01',
    name: 'rate',
    value: 30,
  },
  // object added
  {
    date: '2023-12-03',
    name: 'sales',
    value: 90,
  },
  // key removed/added
  {
    date: '2023-12-04',
    name: 'sales',
    value: 70,
    newtmp: 'test',
  },
]

const DispatchButton = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_multiSelect, dispatchMultiSelect] = useMultiSelectContext()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_textParse, dispatchTextParse] = useTextParseContext()

  const inputDefault = () => {
    const oldDataJson = JSON5.stringify(oldDataList, null, 2)
    const newDataJson = JSON5.stringify(newDataList, null, 2)
    dispatchTextParse({ type: 'update', key: 'old', payload: oldDataJson })
    dispatchTextParse({ type: 'update', key: 'new', payload: newDataJson })
  }

  const resetAll = () => {
    dispatchTextParse({ type: 'reset' })
    dispatchMultiSelect({ type: 'reset' })
  }

  return (
    <Stack spacing={2} direction="row" alignItems="center">
      <Button onClick={inputDefault} variant="contained" color="success" className="bg-[#2e7d32]">
        Default
      </Button>
      <Button onClick={resetAll} variant="outlined" color="error" className="bg-white">
        Reset
      </Button>
    </Stack>
  )
}

export default DispatchButton
