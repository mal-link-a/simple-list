import { ApiProduct } from "./types";

export const api = {
  getProducts: async () => {
    return await fetch("http://localhost:8081/productTypes").then((response) =>
      response.json()
    );
  },
  patchProduct: async (id: string, product: ApiProduct) => {
    return await fetch("http://localhost:8081/productTypes/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(product),
    });
  },
  deleteProduct: async (id: string) => {
    return await fetch("http://localhost:8081/productTypes/" + id, {
      method: "DELETE",
    }).then((response) => response.json());
  },
  createProduct: async (product: ApiProduct) => {
    return await fetch("http://localhost:8081/productTypes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(product),
    });
  },
};
