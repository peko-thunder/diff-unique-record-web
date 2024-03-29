import { RecordKeyAtom } from '@/atoms/RecordKeyAtom'
import { TextParseAtom } from '@/atoms/TextParseAtom'
import Button from '@mui/material/Button'
import { useSetAtom } from 'jotai'
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

const SampleButton = () => {
  const updateTextParse = useSetAtom(TextParseAtom.update)
  const updateUniqueKeys = useSetAtom(RecordKeyAtom.update)

  const inputSample = () => {
    const oldDataJson = JSON5.stringify(oldDataList, null, 2)
    const newDataJson = JSON5.stringify(newDataList, null, 2)
    updateTextParse('oldData', oldDataJson)
    updateTextParse('newData', newDataJson)
    updateUniqueKeys(['date', 'name'])
  }

  return (
    <Button onClick={inputSample} variant="contained" color="success" className="bg-[#2e7d32]">
      Sample
    </Button>
  )
}

export default SampleButton
