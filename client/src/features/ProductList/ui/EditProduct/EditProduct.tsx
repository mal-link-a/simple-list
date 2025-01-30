import {
  Heading,
  HStack,
  Text,
  Box,
  Textarea,
  createListCollection,
  Grid,
  GridItem,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "@chakra-ui/react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { toaster } from "@/components/ui/toaster";
import {
  NumberInputField,
  NumberInputLabel,
  NumberInputRoot,
} from "@/components/ui/number-input";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { RequiredMark } from "@/shared/components/RequiredMark";
import { useEffect, useState } from "react";
import { useDispatchDelete } from "../../lib/hooks/useDispatchDelete";
import { useDispatchEdit } from "../../lib/hooks/useDispatchEdit";
import { Button as CustomButton } from "../../../../shared/components/Button";

export const EditProduct = () => {
  const navigate = useNavigate();
  const product = useSelector(
    (state: RootState) => state.product.productsArr[state.product.index]
  );
  const index = useSelector((state: RootState) => state.product.index);
  const [count, setCount] = useState<string>("0");
  const [isArchived, setArchived] = useState<boolean>(false);
  const [packageType, setPackageType] = useState<string[]>(["некомпрессия"]);
  const [description, setDescription] = useState<string>("");
  const [id, setId] = useState<string>("");

  const appDispatchDelete = useDispatchDelete();
  const appDispatchEdit = useDispatchEdit();

  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);

  useEffect(() => {
    if (product !== undefined) {
      sessionStorage.setItem("EditProductId", String(index));
      sessionStorage.setItem(
        "EditProductEditableItem",
        JSON.stringify(product)
      );
      setCount(product.packsNumber.toString());
      setArchived(product.isArchived);
      setPackageType([product.packageType]);
      setDescription(product.description);
      setId(product.id);
    } else {
      const sessionData = sessionStorage.getItem("EditProductEditableItem");
      if (sessionData !== null) {
        const data = JSON.parse(sessionData);
        setCount(data.packsNumber.toString());
        setArchived(data.isArchived);
        setPackageType(data.packageType);
        setDescription(data.description);
        setId(data.id);
      }
    }
  }, []);

  const handleDelete = async () => {
    setPopoverOpen(false);
    const itemId = Number(sessionStorage.getItem("EditProductId"));
    if ((await appDispatchDelete(id, itemId)) === false) {
      toaster.create({
        title: `Не удалось удалить.`,
        type: "error",
      });
    } else {
      toaster.create({
        title: `Удалено.`,
        type: "success",
      });
      navigate("/");
    }
  };

  const handleQuit = () => {
    navigate("/");
  };

  const handleSave = async () => {
    const itemId = sessionStorage.getItem("EditProductId");

    const savedProduct = {
      packsNumber: Number(count),
      packageType: packageType[0],
      isArchived: isArchived,
      description: description,
      createdAt: new Date(Date.now()).toLocaleString(),
      id: id,
    };
    if (itemId != null) {
      const test = await appDispatchEdit(savedProduct, id, Number(itemId));
      console.log(test);
      if ((await appDispatchEdit(savedProduct, id, Number(itemId))) === false) {
        toaster.create({
          title: `Не удалось сохранить.`,
          type: "error",
        });
      } else {
        toaster.create({
          title: `Сохранено.`,
          type: "success",
        });
        navigate("/");
      }
    }
  };

  return (
    <Box fontFamily="Montserrat" ml="auto" mr="auto" w="750px">
      <Heading
        fontFamily="Montserrat"
        mb="30px"
        textAlign="left"
        fontWeight={600}
        fontSize={"24px"}
      >
        Редактирование типа продукции
      </Heading>

      <Grid
        gap="10px"
        templateRows="36px 36px 36px 1fr"
        templateColumns="1fr 500px"
        alignItems="center"
        mb="54px"
      >
        <GridItem>
          <Text textAlign="left">
            Кол-во пачек <RequiredMark />
          </Text>
        </GridItem>
        <GridItem>
          <NumberInputRoot
            allowMouseWheel
            min={0}
            backgroundColor="white"
            w="500px"
            value={count.toString()}
            onValueChange={(e) => setCount(e.value)}
          >
            <NumberInputLabel backgroundColor="white" />
            <NumberInputField backgroundColor="white" />
          </NumberInputRoot>
        </GridItem>
        <GridItem>
          <Text textAlign="left">
            Тип упаковки <RequiredMark />
          </Text>
        </GridItem>
        <GridItem>
          <SelectRoot
            backgroundColor="white"
            w="500px"
            collection={selectorVariants}
            value={packageType}
            onValueChange={(e) => setPackageType(e.value)}
          >
            <SelectTrigger>
              <SelectValueText placeholder="Выберите..." />
            </SelectTrigger>
            <SelectContent>
              {selectorVariants.items.map((item) => (
                <SelectItem item={item} key={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </GridItem>
        <GridItem>
          <Text textAlign="left">Архивировано</Text>
        </GridItem>
        <GridItem justifySelf="start">
          <Checkbox
            backgroundColor="white"
            size="lg"
            ml="15px"
            checked={isArchived}
            colorPalette="blue"
            onCheckedChange={(e) => setArchived(!!e.checked)}
          />
        </GridItem>
        <GridItem alignSelf="flex-start">
          <Text textAlign="left">Описание</Text>
        </GridItem>
        <GridItem>
          <Textarea
            backgroundColor="white"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="..."
            w="500px"
          />
        </GridItem>
      </Grid>

      <HStack position="relative" justifyContent="center">
        <PopoverRoot
          open={popoverOpen}
          onOpenChange={(e) => setPopoverOpen(e.open)}
          key={"delete"}
        >
          <PopoverTrigger asChild>
            <CustomButton red>Удалить</CustomButton>
          </PopoverTrigger>
          <PopoverContent
            left="50%"
            top="-150px"
            transform="translate(-50%, -50%)"
            mr="-50%"
            position="absolute"
          >
            <PopoverArrow />
            <PopoverBody>
              {`Подтвердите удаление `}
              <CustomButton mt="10px" black w="200px" onClick={handleDelete}>
                Подтвердить
              </CustomButton>
            </PopoverBody>
          </PopoverContent>
        </PopoverRoot>

        <CustomButton black onClick={handleQuit}>
          Закрыть
        </CustomButton>
        <CustomButton yellow onClick={handleSave}>
          Сохранить
        </CustomButton>
      </HStack>
    </Box>
  );
};

const selectorVariants = createListCollection({
  items: [
    { label: "Компрессия", value: "компрессия" },
    { label: "Некомпрессия", value: "некомпрессия" },
  ],
});
