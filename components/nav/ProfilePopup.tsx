import {
  Box,
  Button,
  TextField,
  Typography,
  Grow,
  IconButton,
  ListItemButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  Divider,
  styled,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import _Link from '../Link';
import useUser from '@/lib/hooks/useUser';
import { profileRoutes } from '@/lib/routing/routes';
import { useRouter } from 'next/router';

const Link = styled(_Link)({
  textDecoration: 'none',
  color: 'inherit',
});

type ProfilePopupProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const ProfilePopup = ({ isOpen, setIsOpen }: ProfilePopupProps) => {
  const { user, mutate } = useUser();
  const router = useRouter();

  return (
    <Grow in={isOpen}>
      <Box
        sx={{
          minWidth: 300,
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
        <Box sx={{ px: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ my: 1 }}>
            Hello, {user?.firstName}
          </Typography>
          <IconButton aria-label="close" onClick={() => setIsOpen(false)}>
            <CloseIcon titleAccess="Close" sx={{ cursor: 'pointer' }} />
          </IconButton>
        </Box>
        <List>
          {profileRoutes.map((route) => (
            <ListItem disablePadding key={route.path}>
              <ListItemButton LinkComponent={Link} href={route.path}>
                <ListItemIcon>
                  <route.Icon />
                </ListItemIcon>
                <ListItemText>{route.displayName}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
          <Divider sx={{ my: 1 }} />
          <ListItem disablePadding>
            <ListItemButton
              onClick={async () => {
                await fetch('/api/session', { method: 'DELETE' });
                setIsOpen(false);
                mutate();
                router.reload();
              }}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText>Log out</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Grow>
  );
};

export default ProfilePopup;
