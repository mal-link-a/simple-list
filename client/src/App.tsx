import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { ProductList } from "./features/ProductList/ui/ProductList/ProductList";
import { EditProduct } from "./features/ProductList/ui/EditProduct/EditProduct";
import { CreateProduct } from "./features/ProductList/ui/CreateProduct/CreateProduct";
import { Toaster } from "@/components/ui/toaster";

export const App = () => (
  <BrowserRouter>
    <Toaster />
    <Routes>
      <Route index path="*" element={<ProductList />} />
      <Route path="edit" element={<EditProduct />} />
      <Route path="create" element={<CreateProduct />} />
    </Routes>
  </BrowserRouter>
);

export default App;
