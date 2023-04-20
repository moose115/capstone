import Layout from '@/components/layout/Layout';
import Section from '@/components/layout/Section';
import { Box, Button, Container, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';

const Register = () => {
  return (
    <Layout>
      <Section>
        <Container maxWidth="lg">
          <Box
            sx={{
              minHeight: '70vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h3" sx={{ mb: 2 }}>
              Register for classes
            </Typography>
            <Typography sx={{ mb: 4 }}>Choose delivery type</Typography>
            <Box sx={{ dipslay: 'flex', gap: 2 }}>
              <Button variant="contained" sx={{ mr: 5 }}>
                Online
              </Button>
              <Button variant="contained">In Person</Button>
            </Box>
          </Box>
        </Container>
      </Section>
    </Layout>
  );
};

// if no sid cookie, redirect to '/signup'
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req } = ctx;
  const { sid } = req.cookies;

  if (!sid) {
    return {
      redirect: {
        destination: '/signup',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Register;
