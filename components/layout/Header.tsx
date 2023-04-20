import { useState } from 'react';
import {
  alpha,
  Box,
  Button,
  Container,
  styled,
  Typography,
  IconButton,
} from '@mui/material';
import Link from '../Link';
import { navRoutes } from '@/lib/routing/routes';
import { Roles } from '@prisma/client';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginPopup from '../nav/LoginPopup';
import ProfilePopup from '../nav/ProfilePopup';
import useUser from '@/lib/hooks/useUser';

const HeaderContainer = styled('header')(({ theme }) => [
  {
    position: 'sticky',
    top: 0,
    transition: theme.transitions.create('top'),
    zIndex: theme.zIndex.appBar,
    backdropFilter: 'blur(8px)',
    boxShadow: `inset 0px -1px 1px ${theme.palette.primary[700]}`,
    backgroundColor: alpha(theme.palette.primary[900], 0.7),
    color: theme.palette.primary.contrastText,
  },
]);

const Navigation = styled('nav')(({ theme }) => [
  {
    '& ul': {
      padding: [theme.spacing(1, 2)],
      margin: 0,
      listStyle: 'none',
      display: 'flex',
    },
    '& li': {
      ...theme.typography.body2,
      fontWeight: theme.typography.fontWeightBold,
      '& a': {
        display: 'inline-block',
        color: 'inherit',
        textDecoration: 'none',
        padding: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
        transition: theme.transitions.create('background-color'),
        '&:hover': {
          backgroundColor: theme.palette.primary.main,
        },
      },
    },
  },
]);

const LinkUnstyled = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
});

const PlaceholderRect = styled('div')(({ theme }) => [
  {
    width: 100,
    height: 20,
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
  },
]);

const Header = () => {
  const [loginPopupOpen, setLoginPopupOpen] = useState(false);
  const [profilePopupOpen, setProfilePopupOpen] = useState(false);
  // useUser() swr, no context
  const { user, isLoading, isError } = useUser();
  const links = [
    ...navRoutes.common,
    ...(user?.role.name === Roles.ADMIN ? navRoutes.admin : []),
    ...(user?.role.name === Roles.USER ? navRoutes.user : []),
  ];

  return (
    <HeaderContainer>
      <Container
        maxWidth="lg"
        sx={{ display: 'flex', alignItems: 'center', minHeight: 40 }}
      >
        <Box>
          <Typography component="h1" variant="h5">
            MHS Prenatal classes
          </Typography>
        </Box>
        <Navigation>
          <ul>
            {links.map((route) => (
              <li key={route.path}>
                <Link
                  href={route.path}
                  color="inherit"
                  fontWeight="bold"
                  underline="none"
                >
                  {route.displayName}
                </Link>
              </li>
            ))}
          </ul>
        </Navigation>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            flexGrow: 1,
            position: { md: 'relative' },
          }}
        >
          {isLoading && <PlaceholderRect />}
          {!user && !isLoading && (
            <>
              <Button
                color="inherit"
                LinkComponent={LinkUnstyled}
                href="/signup"
              >
                Sign up
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => setLoginPopupOpen(!loginPopupOpen)}
              >
                Login
              </Button>
              <LoginPopup
                isOpen={loginPopupOpen}
                setIsOpen={setLoginPopupOpen}
              />
            </>
          )}
          {user && !isLoading && (
            <>
              <IconButton
                aria-label="profile"
                color="inherit"
                onClick={() => setProfilePopupOpen(!profilePopupOpen)}
              >
                <AccountCircleIcon fontSize="large" />
              </IconButton>
              <ProfilePopup
                isOpen={profilePopupOpen}
                setIsOpen={setProfilePopupOpen}
              />
            </>
          )}
        </Box>
      </Container>
    </HeaderContainer>
  );
};

export default Header;
