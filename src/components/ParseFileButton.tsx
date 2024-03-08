import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import CenterModal from './CenterModal'
import DragDropZone from './DragDropZone'

const ParseFileButton = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="contained"
        startIcon={<ContentCopyIcon />}
        className="bg-[#1976d2]"
      >
        Parse File
      </Button>

      <CenterModal open={open} handleClose={() => setOpen(false)}>
        <Typography id="transition-modal-title" variant="h6" component="h2">
          Parse File
        </Typography>
        <Typography id="transition-modal-description" sx={{ my: 2 }}>
          CSV File can be selected by drag & drop or in a selection dialog.
        </Typography>
        <div className="grid grid-cols-2 gap-2">
          <DragDropZone type="oldData" />
          <DragDropZone type="newData" />
        </div>
      </CenterModal>
    </>
  )
}

export default ParseFileButton
