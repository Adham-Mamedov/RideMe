import { extendTheme } from '@chakra-ui/react';

export const customTheme = extendTheme({
  breakpoints: {
    sm: '400px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    '2xl': '1536px',
  },
  colors: {
    primary: '#007AFF',
    primaryBold: '#0059ff',
    critical: '#E53E3E',
    success: '#22c35e',
    textPrimary: '#222222',
    textSecondary: '#444444',
    textGray: '#808080',
    borderPrimary: '#E2E8F0',
    backgroundPrimary: '#FDFDFD',
  },
  styles: {
    global: {
      body: {
        color: 'textPrimary',
        bg: 'backgroundPrimary',
        minH: '100vh',
      },
    },
  },
  components: {
    Container: {
      baseStyle: {
        maxW: '1180px',
      },
    },
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
