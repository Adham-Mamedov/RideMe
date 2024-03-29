import { NextPage } from 'next';

import AdminPrimary from '@client/components/shared/layouts/AdminPrimary';
import StationsList from '@client/components/admin/stationsPage/StationsList';

const StationsPage: NextPage = () => {
  return (
    <AdminPrimary>
      <StationsList />
    </AdminPrimary>
  );
};

export { getAuthServerSideProps as getServerSideProps } from '@client/utils/getAuthServerSideProps';

export default StationsPage;
