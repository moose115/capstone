import { profileRoutes } from '@/lib/routing/routes';
import DashboardNav from '../layout/DashboardNav';

const Profilenav = () => {
  return <DashboardNav routes={profileRoutes} />;
};

export default Profilenav;
