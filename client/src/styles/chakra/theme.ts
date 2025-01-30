import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { buttonRecipe } from "./buttonRecipe";

const customConfig = defineConfig({
  globalCss: {
    "html, body": {
      backgroundColor: "#F5F5F5 !important",
    },
    th: {
      color: "#777777 !important",
    },
    tr: {
      color: "#333333 !important",
    },
  },
  theme: {
    recipes: {
      button: buttonRecipe,
    },
  },
});

const theme = createSystem(defaultConfig, customConfig);
export default theme;
//Необходим export default для совместимости с typescript
//npx @chakra-ui/cli typegen ./theme.ts
