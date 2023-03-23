import { Button, styled, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import Image from 'next/image';
import pregnantWomanPic from '../../public/images/pregnant_woman.png';
import Link from '../Link';

const ColoredText = styled('span')(({ theme }) => ({
  color: theme.palette.primary.light,
}));

const Hero = () => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Container
        sx={{ display: 'flex', minHeight: 600, alignContent: 'center' }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flexGrow: 1,
          }}
        >
          <Typography
            component="h2"
            variant="h2"
            sx={{ paddingBottom: 2, fontWeight: 800 }}
            color="primary.contrastText"
          >
            <ColoredText>Prepare</ColoredText> for your baby&apos;s arrival
          </Typography>
          <Typography
            color="primary.contrastText"
            sx={{ mb: 3, maxWidth: 500 }}
          >
            Maskwacis Health Services is offering prenatal classes for expecting
            parents in the Maskwacis community. Our classes cover important
            topics such as pregnancy health, childbirth, breastfeeding, and
            newborn care. Join us to learn from our experienced healthcare
            professionals and prepare for the arrival of your little one.
          </Typography>
          <Box>
            <Link href="/classes">
              <Button variant="contained" color="primary">
                View classes
              </Button>
            </Link>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            flexGrow: 1,
          }}
        >
          <Image src={pregnantWomanPic} alt="Pregnant woman" width={600} />
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
