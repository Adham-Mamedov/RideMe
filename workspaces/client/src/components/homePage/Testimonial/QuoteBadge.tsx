import { FC, memo } from 'react';
import { Badge, Icon } from '@chakra-ui/react';
import { FaQuoteLeft } from 'react-icons/fa';

interface IProps {}

const QuoteBadge: FC<IProps> = ({}) => {
  return (
    <Badge
      width="2rem"
      height="2rem"
      variant="primary"
      borderRadius="50%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="absolute"
      top="-1rem"
      right="2rem"
    >
      <Icon width="1rem" height="1rem" as={FaQuoteLeft} />
    </Badge>
  );
};

export default memo(QuoteBadge);
