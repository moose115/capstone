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
