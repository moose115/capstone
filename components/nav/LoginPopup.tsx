import {
  Box,
  Button,
  TextField,
  Typography,
  Grow,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Link from '../Link';
import { useForm, Controller } from 'react-hook-form';
import { SessionContext } from '@/context/SessionContext';
import { useContext } from 'react';
import { SessionWithUserSafe } from '@/types/session';
import { useRouter } from 'next/router';

type LoginPopupProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

type LoginCredentials = {
  email: string;
  password: string;
};

const LoginPopup = ({ isOpen, setIsOpen }: LoginPopupProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const ctx = useContext(SessionContext);
  const router = useRouter();

  const onSubmit = handleSubmit(async (credentials) => {
    const res = await fetch('/api/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    const session = (await res.json()) as SessionWithUserSafe;

    if (res.status === 200 && session) {
      console.log(session);
      ctx.setSession(session);
      setIsOpen(false);
      setTimeout(() => {
        router.reload();
      }, 1000);
    }
  });

  return (
    <Grow in={isOpen}>
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{
          width: 300,
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
          <IconButton aria-label="close" onClick={() => setIsOpen(false)}>
            <CloseIcon titleAccess="Close" sx={{ cursor: 'pointer' }} />
          </IconButton>
        </Box>
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField label="Email" sx={{ my: 1, width: '100%' }} {...field} />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              label="Password"
              sx={{ my: 1, width: '100%' }}
              type="password"
              {...field}
            />
          )}
        />
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
              <Link href="/signup">Sign up here</Link>
            </Typography>
          </Box>
          <Button variant="text" type="submit">
            Log in
          </Button>
        </Box>
      </Box>
    </Grow>
  );
};

export default LoginPopup;
