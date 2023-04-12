import { useContext } from 'react';
import { SessionContext } from '@/context/SessionContext';
import {
  alpha,
  Box,
  Container,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import Link from '../Link';
import { navRoutes } from '@/lib/routing/routes';
import { Roles } from '@prisma/client';

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

const Header = () => {
  const { session } = useContext(SessionContext);
  const links = [
    ...navRoutes.common,
    ...(session?.user?.role.name === Roles.ADMIN ? navRoutes.admin : []),
    ...(session?.user?.role.name === Roles.USER ? navRoutes.user : []),
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
      </Container>
    </HeaderContainer>
  );
};

export default Header;
