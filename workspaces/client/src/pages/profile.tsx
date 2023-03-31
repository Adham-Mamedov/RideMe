import { NextPage } from 'next';

import ClientPrimary from '@client/components/shared/layouts/ClientPrimary';
import UserProfile from '@client/components/profilePage/UserProfile';
import RidesList from '@client/components/profilePage/RidesList';

const BikesPage: NextPage = () => {
  return (
    <ClientPrimary
      props={{
        gap: ['1rem', null, '3rem'],
      }}
    >
      <UserProfile />
      <RidesList />
    </ClientPrimary>
  );
};

export { getAuthServerSideProps as getServerSideProps } from '@client/utils/getAuthServerSideProps';

export default BikesPage;
