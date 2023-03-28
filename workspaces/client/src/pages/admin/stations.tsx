import { NextPage } from 'next';

import { useAuthStore } from '@client/stores/AuthStore';
import AdminPrimary from '@client/components/shared/layouts/AdminPrimary';
import PageLoader from '@client/components/shared/PageLoader';
import StationsList from '@client/components/admin/stationsPage/StationsList';

const StationsPage: NextPage = () => {
  const user = useAuthStore((state) => state.user);
  const setIsUnauthorized = useAuthStore((state) => state.setIsUnauthorized);

  if (!user) {
    return <PageLoader />;
  }
  if (user.role === 'User') {
    setIsUnauthorized(true);
  }

  return (
    <AdminPrimary>
      <StationsList />
    </AdminPrimary>
  );
};

export { getAuthServerSideProps as getServerSideProps } from '@client/utils/getAuthServerSideProps';

export default StationsPage;
