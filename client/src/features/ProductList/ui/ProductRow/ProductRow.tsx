import {
  Table,
  PopoverRoot,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setIndex, deleteProduct } from "../../lib/productSlice";
import { IconInfo } from "@/shared/components/IconInfo";
import { IconDelete } from "@/shared/components/IconDelete";
import { IconEdit } from "@/shared/components/IconEdit";
import { Button as CustomButton } from "../../../../shared/components/Button";

interface TableRowProps {
  packsNumber: number;
  packageType: string;
  isArchived: boolean;
  description: string;
  createdAt: string;
  id: number;
}
export const ProductRow = ({
  packsNumber,
  packageType,
  isArchived,
  description,
  createdAt,
  id,
}: TableRowProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);

  const handleEdit = () => {
    dispatch(setIndex(id));
    navigate("/edit");
  };

  const handleDelete = () => {
    setPopoverOpen(false);
    dispatch(deleteProduct(id));
  };

  return (
    <Table.Row>
      <Table.Cell>{id + 1}</Table.Cell>
      <Table.Cell>{packsNumber}</Table.Cell>
      <Table.Cell>{packageType}</Table.Cell>
      <Table.Cell>{(createdAt as unknown as string).slice(0, 10)}</Table.Cell>
      <Table.Cell>{isArchived ? "Архивировано" : "Активно"}</Table.Cell>
      <Table.Cell position="relative">
        <PopoverRoot key={"info"}>
          <PopoverTrigger asChild>
            <Button bg="transparent">
              <IconInfo />
            </Button>
          </PopoverTrigger>
          <PopoverContent right="60px" top="0px" position="absolute">
            <PopoverArrow />
            <PopoverBody>
              {description ? description : "Описания нет"}
            </PopoverBody>
          </PopoverContent>
        </PopoverRoot>
      </Table.Cell>
      <Table.Cell position="relative">
        <HStack gap="0px">
          <Button w="40px" bg="transparent" onClick={handleEdit}>
            <IconEdit />
          </Button>
          <PopoverRoot
            open={popoverOpen}
            onOpenChange={(e) => setPopoverOpen(e.open)}
            key={"delete"}
            positioning={{ placement: "left-end" }}
          >
            <PopoverTrigger asChild>
              <Button w="40px" bg="transparent">
                <IconDelete />
              </Button>
            </PopoverTrigger>
            <PopoverContent right="60px" top="0px" position="absolute">
              <PopoverArrow />
              <PopoverBody>
                {`Подтвердите удаление `}
                <CustomButton mt="10px" black w="200px" onClick={handleDelete}>
                  Подтвердить
                </CustomButton>
              </PopoverBody>
            </PopoverContent>
          </PopoverRoot>
        </HStack>
      </Table.Cell>
    </Table.Row>
  );
};
