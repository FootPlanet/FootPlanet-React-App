import { extendTheme } from "@chakra-ui/react";
import HeadingTheme from "./HeadingTheme";

const theme = extendTheme({
  components: { Heading: HeadingTheme },
});

export default theme;
