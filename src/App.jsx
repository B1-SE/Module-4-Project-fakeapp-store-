import { Routes, Route } from "react-router-dom";
import NavigationBar from "./Components/NavigationBar";
import Home from "./Components/Home";
import ProductList from "./Components/ProductList";
import ProductDetails from "./Components/ProductDetails";
import AddProduct from "./Components/AddProduct";
import DeleteProduct from "./Components/DeleteProduct"
import ProductUpdate from "./Components/ProductUpdate";

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/deleteproduct" element={<DeleteProduct />} />
        <Route path="/productupdate" element={<ProductUpdate />} />
      </Routes>
    </>
  );
}

export default App;