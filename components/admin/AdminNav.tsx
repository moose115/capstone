import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { adminRoutes } from '@/lib/routing/routes';

const AdminNav = () => {
  return (
    <nav>
      <List>
        {adminRoutes.map((route) => (
          <ListItem disablePadding key={route.path}>
            <ListItemButton>
              <ListItemIcon>
                <route.Icon />
              </ListItemIcon>
              <ListItemText primary={route.displayName} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </nav>
  );
};

export default AdminNav;
