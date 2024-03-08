import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import Modal from '@mui/material/Modal'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '1px solid rgba(0, 0, 0, 0.23)',
  borderRadius: '4px',
  boxShadow: 24,
  p: 4,
}

type Props = {
  children: React.ReactNode
  open: boolean
  handleClose: () => void
}

const CenterModal = ({ children, open, handleClose }: Props) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>{children}</Box>
      </Fade>
    </Modal>
  )
}

export default CenterModal
