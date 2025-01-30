import { Box, Button, Heading, HStack } from "@chakra-ui/react";
import { Table } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { setAll } from "../../lib/productSlice";
import { useNavigate } from "react-router";
import { api } from "../../lib/api";

import { ProductRow } from "../ProductRow/ProductRow";

export const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.product.productsArr);

  const handleCreate = () => {
    navigate("/create");
  };

  useEffect(() => {
    async function fetchData() {
      const products = await api.getProducts();
      await dispatch(setAll(products));
    }
    fetchData();
  }, []);

  return (
    <Box w="1090px" ml="auto" mr="auto">
      <HStack mb="30px" h="48px" justifyContent="space-between">
        <Heading
          fontFamily="Montserrat"
          h="48px"
          textAlign="left"
          fontWeight={600}
          fontSize={"24px"}
        >
          Список выпускаемой продукции
        </Heading>
        <Button yellow onClick={handleCreate}>
          Создать тип продукции
        </Button>
      </HStack>
      <Table.Root
        fontFamily="Montserrat"
        variant="outline"
        showColumnBorder
        interactive
        fontSize="16px"
        backgroundColor="white"
      >
        <Table.Header backgroundColor="white">
          <Table.Row>
            <Table.ColumnHeader w="80px">№</Table.ColumnHeader>
            <Table.ColumnHeader w="140px">Кол-во пачек</Table.ColumnHeader>
            <Table.ColumnHeader w="200px">Тип упаковки</Table.ColumnHeader>
            <Table.ColumnHeader w="160px">Дата создания</Table.ColumnHeader>
            <Table.ColumnHeader>Статус</Table.ColumnHeader>
            <Table.ColumnHeader w="50px"></Table.ColumnHeader>
            <Table.ColumnHeader w="100px"></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {products?.map((item, index) => (
            <ProductRow
              key={"productMain" + index}
              packsNumber={item.packsNumber}
              packageType={item.packageType}
              isArchived={item.isArchived}
              description={item.description}
              createdAt={item.createdAt}
              id={index}
            />
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};
