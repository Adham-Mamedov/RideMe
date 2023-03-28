import { NextPage } from 'next';

import AdminPrimary from '@client/components/shared/layouts/AdminPrimary';
import BikesList from '@client/components/admin/bikesPage/BikesList';

const BikesPage: NextPage = () => {
  return (
    <AdminPrimary>
      <BikesList />
    </AdminPrimary>
  );
};

export { getAuthServerSideProps as getServerSideProps } from '@client/utils/getAuthServerSideProps';

export default BikesPage;
