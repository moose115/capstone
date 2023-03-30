import { styled } from '@mui/system';

const Section = styled('section')(({ theme }) => ({
  backgroundColor: theme.palette.primary.contrastText,
  padding: theme.spacing(4, 0),
}));

export default Section;
