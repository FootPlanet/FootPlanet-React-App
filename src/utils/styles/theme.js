import { extendTheme } from '@chakra-ui/react';
import HeadingTheme from './HeadingTheme';


const theme = extendTheme({
  components: { Heading: HeadingTheme },
  styles: {
    global: () => ({
      body: {
        bg: "#080808",
      },
    }),
  },
});

export default theme;
