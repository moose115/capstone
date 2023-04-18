import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ClassIcon from '@mui/icons-material/Class';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

export type Route = {
  path: string;
  displayName: string;
  Icon?: any; // React MUI Icon component
};

type RouteCategories = {
  [key: string]: Route[];
};

const navRoutes: RouteCategories = {
  common: [
    { path: '/', displayName: 'Home' },
    { path: '/about', displayName: 'About' },
    { path: '/classes', displayName: 'Classes' },
  ],
  admin: [{ path: '/admin', displayName: 'Admin' }],
  user: [{ path: '/profile', displayName: 'My profile' }],
};

const profileRoutes: Route[] = [
  { path: '/profile', displayName: 'My profile', Icon: AccountCircleIcon },
  { path: '/profile/settings', displayName: 'Settings', Icon: SettingsIcon },
];

const adminRoutes: Route[] = [
  { path: '/admin', displayName: 'Dashboard', Icon: DashboardIcon },
  { path: '/admin/users', displayName: 'Users', Icon: AccountCircleIcon },
  { path: '/admin/classes', displayName: 'Classes', Icon: ClassIcon },
  {
    path: '/admin/registratoins',
    displayName: 'Registrations',
    Icon: AssignmentTurnedInIcon,
  },
];

export { navRoutes, profileRoutes, adminRoutes };
