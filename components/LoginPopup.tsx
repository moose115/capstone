import { Box, Button, TextField, Typography, Grow } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Link from './Link';

type LoginPopupProps = {
  isOpen: boolean;
};

const LoginPopup = ({ isOpen }: LoginPopupProps) => {
  return (
    <Grow in={isOpen}>
      <Box
        sx={{
          minWidth: 300,
          px: 2,
          py: 1,
          backgroundColor: 'white',
          position: 'absolute',
          top: 'calc(100% + 1rem)',
          right: 5,
          color: 'black',
          borderRadius: 2,
          boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" sx={{ my: 1 }}>
            Log in
          </Typography>
          <CloseIcon titleAccess="Close" sx={{ cursor: 'pointer' }} />
        </Box>
        <TextField label="Email" sx={{ my: 1, width: '100%' }} />
        <TextField label="Password" sx={{ my: 1, width: '100%' }} />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography variant="body2" sx={{ my: 1 }}>
              <Link href="/forgot-password">Forgot password?</Link>
            </Typography>
            <Typography variant="body2" sx={{ my: 1 }}>
              <Link href="/register">Register here</Link>
            </Typography>
          </Box>
          <Button variant="text">Log in</Button>
        </Box>
      </Box>
    </Grow>
  );
};

export default LoginPopup;
