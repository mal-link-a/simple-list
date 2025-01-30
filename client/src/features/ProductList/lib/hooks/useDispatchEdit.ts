import { useDispatch, useSelector } from "react-redux";
import { api } from "../api";
import { updateProduct } from "../productSlice";
import { Product } from "@/entities/Product/Product";
import { RootState } from "@/app/store/store";
import { ApiProduct } from "../types";

//Не тестировалось
export const useDispatchEdit = () => {
  const dispatch = useDispatch();
  const oldData = useSelector(
    (state: RootState) => state.product.productsArr[state.product.index]
  );
  return async function (product: Product, id: string, index: number) {
    const apiProduct: ApiProduct = {
      packsNumber: product.packsNumber,
      packageType: product.packageType,
      isArchived: product.isArchived,
      description: product.description,
    };
    dispatch(updateProduct([product, index]));

    return await api
      .patchProduct(id, apiProduct)
      .then((res) => {
        if (!res.ok) {
          dispatch(updateProduct([oldData, index]));
        }
        return res.ok;
      })
      .catch(() => false);
  };
};
