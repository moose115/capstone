import AdminLayout from '@/components/layout/AdminLayout';
import { UserWithRole } from '@/types/user';
import { Box, Button, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { User } from '@prisma/client';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'email', headerName: 'Email', width: 200 },
];

const AdminUsers = () => {
  const { data, isLoading } = useSWR<{ users: User[] }>('/api/users', fetcher);

  return (
    <AdminLayout>
      <Typography variant="h3" sx={{ mb: 3 }}>
        Users
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
          rows={data?.users.map((user) => ({
            id: user.userId,
            ...user,
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

export default AdminUsers;
