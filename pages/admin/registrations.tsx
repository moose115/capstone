import AdminLayout from '@/components/layout/AdminLayout';
import Layout from '@/components/layout/Layout';
import { Box, Button, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { UserCourse } from '@prisma/client';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'courseName', headerName: 'Name', width: 130 },
  { field: 'email', headerName: 'Email', width: 130 },
];

const AdminRegistrations = () => {
  const { data, isLoading } = useSWR<{ classes: UserCourse[] }>(
    '/api/classes',
    fetcher
  );

  return (
    <AdminLayout>
      <Typography variant="h3" sx={{ mb: 3 }}>
        Classes
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button variant="contained" color="primary">
          Create
        </Button>
        <Button variant="contained" color="primary" sx={{ ml: 2 }}>
          Delete
        </Button>
      </Box>

      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <DataGrid
          rows={data?.classes.map((classItem) => ({
            id: classItem.courseId,
            ...classItem,
          }))}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          sx={{ height: '400px' }}
        />
      )}
    </AdminLayout>
  );
};

export default AdminRegistrations;
