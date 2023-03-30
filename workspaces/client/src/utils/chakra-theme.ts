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
    Drawer: {
      baseStyle: {
        dialog: {
          left: [null, null, null, null, '400px!important'],
          width: [
            '100%!important',
            null,
            null,
            null,
            'calc(100vw - 400px)!important',
          ],
          minH: '500px!important',
        },
      },
    },
    Tabs: {
      baseStyle: {
        root: {
          display: [null, null, 'flex'],
        },
        tab: {
          minW: ['50%', null, null, '300px'],
          maxW: ['50%', null, '300px'],
          maxH: '80px',
          display: 'block',
          justifyContent: 'start',
          textAlign: 'start',
          borderBottom: '2px solid',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          borderColor: ['borderPrimary', null, 'transparent'],
          _selected: {
            borderColor: 'blue.600',
            color: 'primary',
          },
        },
        tablist: {
          flexDir: [null, null, 'column'],
          flexWrap: 'wrap',
          padding: ['1rem 0', null, '0 1rem 0 0'],
          borderRight: [null, null, '2px solid #E2E8F0'],
        },
      },
    },
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
