import { useParseResultContext } from '@/context/ParseResultContext'
import { useUniqueKeyContext } from '@/context/UniqueKeyContext'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import { ChangeEvent } from 'react'

const getCommonKeys = (oldData: object[], newData: object[]) => {
  const oldKeys = Array.from(new Set(oldData.flatMap((data) => Object.keys(data))))
  const newKeys = Array.from(new Set(newData.flatMap((data) => Object.keys(data))))
  const allKeys = Array.from(new Set([...oldKeys, ...newKeys]))
  const commonKeys = allKeys.reduce((array: string[], key) => {
    if (oldKeys.includes(key) && newKeys.includes(key)) array.push(key)
    return array
  }, [])

  return commonKeys
}

const KeyCheckbox = () => {
  const [parseResult] = useParseResultContext()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_uniqueKey, dispatchUniqueKey] = useUniqueKeyContext()
  const commonKeys = getCommonKeys(parseResult.old.dataList, parseResult.new.dataList)

  return (
    <>
      <p className="text-base">Common Keys</p>
      <p className="text-base text-orange-500">Please check multi unique keys.</p>
      <FormGroup row={true}>
        {commonKeys.map((key, i) => (
          <FormControlLabel
            key={i}
            control={
              <Checkbox
                value={key}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  dispatchUniqueKey({ payload: event.target.value })
                }}
              />
            }
            label={key}
          />
        ))}
      </FormGroup>
    </>
  )
}

export default KeyCheckbox
