import './App.css';
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/home";
import SearchProductPage from "./pages/Product/searchProduct";
import CreateProductPage from "./pages/Product/createProduct";
import ListProductPage from "./pages/Product/listProduct";
import UserPage from "./pages/User/user"
import CreateUserPage from "./pages/User/createUser"
import ListUserPage from "./pages/User/listUser"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<SearchProductPage />} />
      <Route path="/products/create" element={<CreateProductPage />} />
      <Route path="/products/create/:id" element={<CreateProductPage />} />
      <Route path="/products/list" element={<ListProductPage />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="/user/create" element={<CreateUserPage />} />
      <Route path="/user/create/:id" element={<CreateUserPage />} />
      <Route path="/user/list" element={<ListUserPage />} />
    </Routes>
  );
}

export default App;
