type Route = {
  path: string;
  displayName: string;
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
  { path: '/profile', displayName: 'My profile' },
  { path: '/profile/settings', displayName: 'Settings' },
];

const adminRoutes: Route[] = [
  { path: '/admin', displayName: 'Dashboard' },
  { path: '/admin/users', displayName: 'Users' },
  { path: '/admin/classes', displayName: 'Classes' },
  { path: '/admin/registratoins', displayName: 'Registrations' },
];

export { navRoutes, profileRoutes, adminRoutes };
