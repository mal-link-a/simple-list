import { chakra } from "@chakra-ui/react";
const Span = chakra.span;

export const RequiredMark = () => {
  return (
    <Span as="sup" color="red">
      *
    </Span>
  );
};
