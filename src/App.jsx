import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import NavigationBar from "./Components/NavigationBar";
import Container from "react-bootstrap/Container";
import Home from "./Components/Home";
import ProductList from "./Components/ProductList";
import ProductDetails from "./Components/ProductDetails";
import AddProduct from "./Components/AddProduct";
import ProductUpdate from "./Components/ProductUpdate";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => {
        console.error("API call failed:", err);
      });
  }, []);

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  return (
    <>
      <NavigationBar />
      <Container className="pt-5 mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList products={products} />} />
          <Route
            path="/products/:id"
            element={<ProductDetails onDeleteProduct={handleDeleteProduct} />}
          />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/productupdate/:id" element={<ProductUpdate />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;