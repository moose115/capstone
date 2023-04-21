import AdminLayout from '@/components/layout/AdminLayout';
import Layout from '@/components/layout/Layout';
import { Box, Grid, Typography } from '@mui/material';

const Admin = () => {
  return (
    <AdminLayout>
      <Typography variant="h3" sx={{ mb: 3 }}>
        Admin Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              height: '300px',
              p: 2,
              bgcolor: '#f2f2f2',
              color: '#222',
              borderRadius: 3,
            }}
          >
            <Typography variant="h6">New users</Typography>
            <Typography variant="body1">You will see new users here</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              height: '300px',
              p: 2,
              bgcolor: '#f2f2f2',
              color: '#222',
              borderRadius: 3,
            }}
          >
            <Typography variant="h6">New registrations</Typography>
            <Typography variant="body1">
              You will see new registrations for classes
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              height: '300px',
              p: 2,
              bgcolor: '#f2f2f2',
              color: '#222',
              borderRadius: 3,
            }}
          >
            <Typography variant="h6">Quick links</Typography>
            <Typography variant="body1">
              Place for additional functions
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              height: '300px',
              p: 2,
              bgcolor: '#f2f2f2',
              color: '#222',
              borderRadius: 3,
            }}
          >
            <Typography variant="h6">Analytics</Typography>
            <Typography variant="body1">
              Place for analytics and statistics, graphs etc.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default Admin;
