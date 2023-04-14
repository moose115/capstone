import Layout from '@/components/layout/Layout';
import Section from '@/components/layout/Section';
import Link from '@/components/Link';
import { Box, Container, Grid, styled, Typography } from '@mui/material';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

const ColoredText = styled('span')(({ theme }) => ({
  color: theme.palette.primary.light,
}));

const Classes = () => {
  return (
    <Layout>
      <Section
        sx={{
          backgroundColor: 'initial',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Container
          sx={{ display: 'flex', minHeight: 500, alignContent: 'center' }}
        >
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography
                component="h2"
                variant="h2"
                sx={{ paddingBottom: 2, fontWeight: 800 }}
                color="primary.contrastText"
              >
                <ColoredText>Learn</ColoredText> about classes
              </Typography>
              <Typography color={'primary.200'} sx={{ mb: 3, maxWidth: 500 }}>
                Maskwacis Health Services is offering prenatal classes for
                expecting parents in the Maskwacis community. Our classes cover
                important topics such as pregnancy health, childbirth,
                breastfeeding, and newborn care. Join us to learn from our
                experienced healthcare professionals and prepare for the arrival
                of your little one.
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}
            >
              {/* <Image src={pregnantWomanPic} alt="Pregnant woman" width={600} /> */}
            </Grid>
          </Grid>
        </Container>
      </Section>
      <Section>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box>
                <HealthAndSafetyIcon fontSize="large" />
              </Box>
              <Typography variant="h5" align="center">
                Health
              </Typography>
              <Typography align="center">
                Learn how to maintain a healthy pregnancy with expert guidance.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography align="center">Benefit 2</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography align="center">Benefit 3</Typography>
            </Grid>
          </Grid>
        </Container>
      </Section>
      <Section>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ display: { xs: 'none', md: 'initial' } }}
            >
              graphic here
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
                obcaecati officiis aperiam sed qui accusamus, similique sunt
                doloribus? Nostrum quas accusantium, fugit reiciendis ad
                molestias. Nemo eaque iusto veritatis aut.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Section>
    </Layout>
  );
};

export default Classes;
