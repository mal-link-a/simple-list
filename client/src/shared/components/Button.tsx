"use client";
import type { ButtonProps, RecipeVariantProps } from "@chakra-ui/react";
import { buttonRecipe } from "@/styles/chakra/buttonRecipe";
import { chakra, useRecipe } from "@chakra-ui/react";

type ButtonVariantProps = RecipeVariantProps<typeof buttonRecipe>;
export type CustomProps = React.PropsWithChildren<ButtonVariantProps> &
  ButtonProps;

export const Button = (props: CustomProps) => {
  const recipe = useRecipe({ recipe: buttonRecipe });
  const [recipeProps, restProps] = recipe.splitVariantProps(props);
  const styles = recipe(recipeProps);

  return <chakra.button css={styles} {...restProps} />;
};
