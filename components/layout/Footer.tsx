import { footerRoutes } from '@/lib/routing/routes';
import { Box, Container, Grid, styled } from '@mui/material';
import Link from '../Link';

const LinkList = styled('ul')(({ theme }) => ({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  '& li': {
    marginBottom: 5,
    '& a': {
      color: theme.palette.primary.contrastText,
      textDecoration: 'none',
    },
  },
}));

const Footer = () => {
  return (
    <Box>
      <Container>
        <Grid container spacing={2} sx={{ py: 2 }}>
          {footerRoutes.map((col, i) => (
            <Grid item xs={12} md={4} key={i}>
              <LinkList>
                {col.map((route) => (
                  <li key={route.path}>
                    <Link href={route.path}>{route.displayName}</Link>
                  </li>
                ))}
              </LinkList>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
