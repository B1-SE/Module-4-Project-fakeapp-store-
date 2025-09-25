import { Routes, Route } from "react-router-dom";
import NavigationBar from "./Components/NavigationBar";
import Container from "react-bootstrap/Container";
import Home from "./Components/Home";
import ProductList from "./Components/ProductList";
import ProductDetails from "./Components/ProductDetails";
import AddProduct from "./Components/AddProduct";
import ProductUpdate from "./Components/ProductUpdate";

function App() {
  return (
    <>
      <NavigationBar />
      <Container className="pt-5 mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/productupdate/:id" element={<ProductUpdate />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;