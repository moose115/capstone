import { adminRoutes } from '@/lib/routing/routes';
import DashboardNav from '../layout/DashboardNav';

const AdminNav = () => {
  return <DashboardNav routes={adminRoutes} />;
};

export default AdminNav;
