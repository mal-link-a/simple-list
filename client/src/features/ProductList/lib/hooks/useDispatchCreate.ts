import { useDispatch } from "react-redux";
import { api } from "../api";
import { ApiProduct } from "../types";
import {
  createProduct,
  createTemporary,
  deleteTemporary,
} from "../productSlice";

//Не тестировалось
export const useDispatchCreate = () => {
  const dispatch = useDispatch();
  return async function (product: ApiProduct) {
    dispatch(createTemporary(product));
    return await api
      .createProduct(product)
      .then((response) => {
        dispatch(deleteTemporary());
        if (response.ok) {
          return response.json();
        } else {
          throw Error();
        }
      })
      .then((response) => {
        dispatch(createProduct(response));
        return true;
      })
      .catch(() => false);
  };
};
