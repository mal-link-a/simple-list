import { Product } from "@/entities/Product/Product";

export type ApiProduct = Omit<Product, "id" | "createdAt">;
