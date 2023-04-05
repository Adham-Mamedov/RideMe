import { FC, memo, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import {
  Box,
  Card,
  CardProps,
  Container,
  ContainerProps,
  Heading,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';

import { useGlobalStore } from '@client/stores/GlobalStore';
import { useAuthStore } from '@client/stores/AuthStore';

import RideTimer from './RideTimer';
import PostRideModal from '@client/components/shared/Navbar/PostRideModal';

import useLogout from '@client/hooks/requests/useLogout';

import {
  adminLinks,
  authenticatedLinks,
  ownerLinks,
  unauthenticatedLinks,
} from '@client/utils/defaults';
import { INavLink } from '@shared/types/client.types';
import { Role } from '@shared/enums';

interface IProps {}

const NavBar: FC<IProps> = ({}) => {
  const navbarRef = useRef<HTMLDivElement>(null);

  const user = useAuthStore((state) => state.user);
  const activeRide = useGlobalStore((state) => state.activeRide);
  const setNavBarHeight = useGlobalStore((state) => state.setNavBarHeight);

  const { refetch: logout } = useLogout();

  const navLinks = useMemo<INavLink[]>(() => {
    let links: INavLink[];
    if (!user) {
      links = unauthenticatedLinks;
    } else {
      const authLinks =
        user.role === Role.Owner
          ? ownerLinks
          : user.role === Role.Admin
          ? adminLinks
          : authenticatedLinks;
      links = authLinks.map((link) => {
        if (link.label === 'Log out') link.onClick = logout;
        return link;
      });
    }
    return links;
  }, [logout, user]);

  useEffect(() => {
    navbarRef.current && setNavBarHeight(navbarRef.current?.offsetHeight);
  }, [navbarRef.current, setNavBarHeight]);

  return (
    <Card {...wrapperCardStyles} ref={navbarRef}>
      <Container {...containerStyles}>
        <Link href="/">
          <Heading
            as={'h1'}
            fontSize={['1.25rem', null, '1.5rem']}
            fontWeight="900"
          >
            RideME
          </Heading>
        </Link>
        <Box as="nav" w={['100%', 'auto']}>
          <Wrap
            spacing={['0.5rem', '1rem', '30px']}
            justify={['space-around', 'auto']}
          >
            {activeRide && !activeRide.timeEnd && (
              <WrapItem>
                <RideTimer />
              </WrapItem>
            )}
            {navLinks.map(({ label, href, type, onClick }) => (
              <WrapItem
                key={href}
                color={type === 'link' ? 'primary' : 'textGray'}
                fontSize={['1rem', null, '1.25rem']}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Link href={href} onClick={onClick} title={label}>
                  {label}
                </Link>
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      </Container>
      <PostRideModal />
    </Card>
  );
};

// styles
const wrapperCardStyles: CardProps = {
  w: '100%',
  minH: ['50px', '100px'],
  borderRadius: '0',
  bg: '#fff',
  justify: 'center',
  align: 'center',
  position: 'sticky',
  top: 0,
  zIndex: 401,
};
const containerStyles: ContainerProps = {
  h: '100%',
  p: '8px 8px',
  display: 'flex',
  flexDir: ['column', 'row'],
  gap: ['0.5rem', '1rem'],
  justifyContent: 'space-between',
  alignItems: 'center',
};

export default memo(NavBar);
