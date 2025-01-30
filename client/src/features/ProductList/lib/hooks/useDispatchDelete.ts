import { useDispatch } from "react-redux";
import { api } from "../api";
import { deleteProduct } from "../productSlice";

//Не тестировалось
export const useDispatchDelete = () => {
  const dispatch = useDispatch();
  return async function (id: string, index: number) {
    return await api
      .deleteProduct(id)
      .then(() => {
        dispatch(deleteProduct(index));
        return true;
      })
      .catch(() => false);
  };
};
