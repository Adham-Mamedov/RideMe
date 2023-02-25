import { extendTheme } from '@chakra-ui/react';

export const customTheme = extendTheme({
  colors: {
    primary: '#007AFF',
    primaryBold: '#0059ff',
    critical: '#E53E3E',
    success: '#22c35e',
    textPrimary: '#222222',
    textSecondary: '#444444',
    textGray: '#808080',
    borderPrimary: '#E2E8F0',
  },
  styles: {
    global: {
      body: {
        color: 'textPrimary',
      },
    },
  },
  components: {
    Button: {
      variants: {
        primary: {
          bg: 'primary',
          color: 'white',
          fontSize: 'md',
          _hover: {
            opacity: 0.9,
          },
          _active: {
            bg: 'primaryBold',
            opacity: 1,
          },
        },
      },
    },
    Badge: {
      variants: {
        primary: {
          bg: 'primary',
          color: 'white',
        },
      },
    },
  },
});
