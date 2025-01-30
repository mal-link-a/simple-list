import { defineRecipe } from "@chakra-ui/react";

export const buttonRecipe = defineRecipe({
  variants: {
    yellow: {
      true: {
        border: "1px solid black",
        borderRadius: "10px",
        fontSize: "18px",
        height: "48px",
        fontWeight: 600,
        color: "black",
        backgroundColor: "#F7EE55",
        _hover: {
          backgroundColor: "#FFE4B5",
        },
      },
    },
    red: {
      true: {
        border: "1px solid black",
        borderRadius: "10px",
        fontSize: "18px",
        height: "48px",
        fontWeight: 600,
        color: "white",
        backgroundColor: "#DA1515",
        _hover: {
          backgroundColor: "#DC143C",
        },
      },
    },
    black: {
      true: {
        border: "1px solid black",
        borderRadius: "10px",
        fontSize: "18px",
        height: "48px",
        fontWeight: 600,
        color: "white",
        backgroundColor: "black",
        _hover: {
          backgroundColor: "#191970",
        },
      },
    },
  },
});
