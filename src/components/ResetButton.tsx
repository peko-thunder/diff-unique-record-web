import { RecordKeyAtom } from '@/atoms/RecordKeyAtom'
import { TextParseAtom } from '@/atoms/TextParseAtom'
import Button from '@mui/material/Button'
import { useSetAtom } from 'jotai'

const ResetButton = () => {
  const resetTextParse = useSetAtom(TextParseAtom.reset)
  const resetUniqueKeys = useSetAtom(RecordKeyAtom.reset)

  const resetAll = () => {
    resetTextParse()
    resetUniqueKeys()
  }

  return (
    <Button onClick={resetAll} variant="outlined" color="error" className="bg-white">
      Reset
    </Button>
  )
}

export default ResetButton
