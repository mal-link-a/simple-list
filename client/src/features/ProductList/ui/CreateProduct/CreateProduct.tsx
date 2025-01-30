import {
  Heading,
  HStack,
  Text,
  Box,
  Textarea,
  createListCollection,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import {
  NumberInputField,
  NumberInputLabel,
  NumberInputRoot,
} from "@/components/ui/number-input";
import { useNavigate } from "react-router";
import { RequiredMark } from "@/shared/components/RequiredMark";
import { useState } from "react";
import { useDispatchCreate } from "../../lib/hooks/useDispatchCreate";
import { toaster } from "@/components/ui/toaster";
import { Button as CustomButton } from "../../../../shared/components/Button";

export const CreateProduct = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState<string>("0");
  const [isArchived, setArchived] = useState<boolean>(false);
  const [packageType, setPackageType] = useState<string[]>(["некомпрессия"]);
  const [description, setDescription] = useState<string>("");

  const appDispatchCreate = useDispatchCreate();

  const handleCreate = async () => {
    const ourObj = {
      packsNumber: Number(count),
      packageType: packageType[0],
      isArchived: isArchived,
      description: description,
    };
    if ((await appDispatchCreate(ourObj)) === false) {
      toaster.create({
        title: `Не удалилось создать.`,
        type: "error",
      });
    } else {
      toaster.create({
        title: `Создано.`,
        type: "success",
      });
      navigate("/");
    }
  };

  const handleQuit = () => {
    navigate("/");
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
        Создание типа продукции
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
            backgroundColor="white"
            min={0}
            w="500px"
            value={count.toString()}
            onValueChange={(e) => setCount(e.value)}
          >
            <NumberInputLabel />
            <NumberInputField />
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
            colorPalette="blue"
            size="lg"
            ml="15px"
            checked={isArchived}
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

      <HStack justifyContent="center">
        <CustomButton black onClick={handleQuit}>
          Закрыть
        </CustomButton>
        <CustomButton yellow onClick={handleCreate}>
          Создать
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
