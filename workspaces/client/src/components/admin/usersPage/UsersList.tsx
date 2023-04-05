import { FC, memo, useMemo, useState } from 'react';
import {
  Button,
  Container,
  Heading,
  Text,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Flex,
} from '@chakra-ui/react';
import { MdDelete, MdModeEdit } from 'react-icons/md';

import Pagination from '@client/components/shared/Pagination';
import UserFormModal from '@client/components/admin/usersPage/UserFormModal';
import Loader from '@client/components/shared/Loader';

import { useUpdateUser, useDeleteUser } from '@client/hooks/requests/users';
import { useAdminStore } from '@client/stores/AdminStore';

import { IUser } from '@shared/types/auth.types';
import { Role } from '@shared/enums';
import { useAuthStore } from '@client/stores/AuthStore';

const PAGE_SIZE = 10;

interface IProps {}

const UsersList: FC<IProps> = ({}) => {
  const [page, setPage] = useState(0);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<IUser | undefined>();

  const loading = useAdminStore((state) => state.loading);
  const users = useAdminStore((state) => state.users);
  const currentUser = useAuthStore((state) => state.user);

  const currentUsers = useMemo(
    () => users.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE),
    [page, users]
  );

  const { mutate: updateUser } = useUpdateUser();
  const { mutate: deleteUser } = useDeleteUser();

  if (loading) return <Loader size="100px" />;

  if (!users) return <Heading>There are no users</Heading>;

  return (
    <Container>
      <Heading fontWeight="600" as="h2" fontSize="1.25rem" mb="1rem">
        Users
      </Heading>
      <Flex flexDir="column" gap="1rem">
        <TableContainer border="1px solid #E2E8F0" borderRadius="lg">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentUsers.map((user) => {
                const color =
                  user.role === Role.Admin
                    ? 'green'
                    : user.role === Role.Owner
                    ? 'primary'
                    : '';
                return (
                  <Tr key={user.id}>
                    <Td textOverflow="ellipsis" overflow="hidden" maxW="350px">
                      {user.name}
                    </Td>
                    <Td>{user.email}</Td>
                    <Td color={color}>{user.role}</Td>
                    {currentUser?.role === Role.Owner ? (
                      <Td display="flex" gap="0.5rem">
                        <Button
                          size="sm"
                          variant="outline"
                          colorScheme="messenger"
                          gap="0.4rem"
                          p="0.5rem"
                          onClick={() => {
                            setIsEditUserModalOpen(true);
                            setUserToEdit(user);
                          }}
                        >
                          <MdModeEdit size="1.75rem" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          colorScheme="red"
                          gap="0.4rem"
                          p="0.5rem"
                          onClick={() => {
                            deleteUser(user.id);
                          }}
                        >
                          <MdDelete size="1.75rem" />
                          Remove
                        </Button>
                      </Td>
                    ) : null}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
          <Heading fontWeight="600" as="h3" fontSize="1rem" p="1rem">
            Total number of users:
            <Text ml="1rem" color="primary" as="span">
              {users.length}
            </Text>
          </Heading>
        </TableContainer>
        <Flex justifyContent="space-between">
          {users.length > PAGE_SIZE ? (
            <Pagination
              list={users}
              setPage={setPage}
              page={page}
              pageSize={PAGE_SIZE}
            />
          ) : null}
        </Flex>
      </Flex>

      <UserFormModal
        title="Edit User"
        ctaText="Edit"
        isOpen={isEditUserModalOpen}
        onClose={(user?: IUser) => {
          setIsEditUserModalOpen(false);
          setUserToEdit(undefined);
          user && updateUser(user);
        }}
        user={userToEdit}
      />
    </Container>
  );
};

export default memo(UsersList);
