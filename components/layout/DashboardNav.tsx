import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Route } from '@/lib/routing/routes';

type DashboardNavProps = {
  routes: Route[];
};

const DashboardNav = ({ routes }: DashboardNavProps) => {
  return (
    <nav>
      <List>
        {routes.map((route) => (
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

export default DashboardNav;
