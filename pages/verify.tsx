import Layout from '@/components/layout/Layout';
import Section from '@/components/layout/Section';
import { Button, Container, Typography } from '@mui/material';
import Image from 'next/image';
import checkmarkPic from '../public/images/checkmark.png';

const Verify = () => {
  return (
    <Layout>
      <Section>
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            minHeight: '75vh',
            justifyContent: 'center',
          }}
        >
          <Image src={checkmarkPic} alt={'checkmark'} width={200} />
          <Typography
            variant="h2"
            sx={{ mb: 2, color: 'primary.700', fontWeight: '500', mt: 3 }}
          >
            You Are Verified Now!
          </Typography>

          <Typography sx={{ mb: 5 }}>Your message has been sent!</Typography>
          <Button variant="contained">Go Home</Button>
        </Container>
      </Section>
    </Layout>
  );
};

export default Verify;
