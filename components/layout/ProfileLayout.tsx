import Grid from '@mui/material/Grid';
import { Box, Container } from '@mui/system';
import ProfileNav from '../profile/ProfileNav';
import Layout from './Layout';
import Section from './Section';

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout>
      <Section>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Box>
                <ProfileNav />
              </Box>
            </Grid>
            <Grid item xs={12} md={9}>
              {children}
            </Grid>
          </Grid>
        </Container>
      </Section>
    </Layout>
  );
};

export default ProfileLayout;
