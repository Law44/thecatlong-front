import './App.css';
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/home";
import SearchProductPage from "./pages/Product/searchProduct";


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<SearchProductPage />} />
    </Routes>
  );
}

export default App;
