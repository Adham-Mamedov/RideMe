import { NextPage } from 'next';

import AdminPrimary from '@client/components/shared/layouts/AdminPrimary';
import UsersList from '@client/components/admin/usersPage/UsersList';
import { useFetchUsers } from '../../hooks/requests/users';
import PageLoader from '@client/components/shared/PageLoader';

const UsersPage: NextPage = () => {
  const { isLoading } = useFetchUsers();

  if (isLoading) return <PageLoader />;

  return (
    <AdminPrimary>
      <UsersList />
    </AdminPrimary>
  );
};

export { getAuthServerSideProps as getServerSideProps } from '@client/utils/getAuthServerSideProps';

export default UsersPage;
