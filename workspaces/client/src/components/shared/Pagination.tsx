import { useRouter } from 'next/router';
import { Dispatch, FC, memo, SetStateAction, useEffect, useMemo } from 'react';
import { Button, List, ListItem } from '@chakra-ui/react';

interface IProps {
  list: any[];
  pageSize: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const Pagination: FC<IProps> = ({ list, pageSize, setPage, page }) => {
  const router = useRouter();

  useEffect(() => {
    const page = router.query.page;
    if (page) setPage(Number(page) - 1);
  }, []);

  const pagination = useMemo(() => {
    return Array.from(Array(Math.ceil(list.length / pageSize)).keys());
  }, [list.length, pageSize]);

  const handlePageChange = (page: number) => {
    setPage(page);
    router.replace(`?page=${page + 1}`, undefined, { shallow: true });
  };

  return (
    <List display="flex" gap="0.5rem">
      {pagination.map((p) => {
        return (
          <ListItem key={p}>
            <Button
              variant={p === page ? 'solid' : 'outline'}
              colorScheme="messenger"
              p="0 8px"
              h="1.5rem"
              minW="1.5rem"
              fontSize="0.8rem"
              onClick={() => handlePageChange(p)}
            >
              {p + 1}
            </Button>
          </ListItem>
        );
      })}
    </List>
  );
};

export default memo(Pagination);
