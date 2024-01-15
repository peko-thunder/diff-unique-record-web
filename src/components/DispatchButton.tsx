import { useBothTextContext } from '@/context/BothTextContext'
import { useParseResultContext } from '@/context/ParseResultContext'
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
  const [_bothText, dispatchBothText] = useBothTextContext()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_parseResult, dispatchParseResult] = useParseResultContext()

  const inputDefault = () => {
    const oldDataJson = JSON5.stringify(oldDataList, null, 2)
    const newDataJson = JSON5.stringify(newDataList, null, 2)
    dispatchBothText({ type: 'update', key: 'old', payload: oldDataJson })
    dispatchBothText({ type: 'update', key: 'new', payload: newDataJson })
    dispatchParseResult({ key: 'old', payload: oldDataJson })
    dispatchParseResult({ key: 'new', payload: newDataJson })
  }

  const resetAll = () => {
    dispatchBothText({ type: 'reset' })
    dispatchParseResult({ key: 'old', payload: '' })
    dispatchParseResult({ key: 'new', payload: '' })
  }

  return (
    <Stack spacing={2} direction="row">
      <Button onClick={inputDefault} variant="contained">
        Default
      </Button>
      <Button onClick={resetAll} variant="contained">
        Reset
      </Button>
    </Stack>
  )
}

export default DispatchButton
