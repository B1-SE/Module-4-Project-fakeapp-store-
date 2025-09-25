import { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from 'react-router-dom';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    {/* useEffect only runs once on the initial component render, at least if you have an empty dependency array.
        If we add other variables into the dependency array, then we list them as dependencies. And if the value of any dependency
        changes, then useEffect() runs again. */}
    useEffect(() => {
        axios
            .get("https://fakestoreapi.com/products")
            .then((response) => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("API call failed:", err);
                setError("Failed to fetch products. Please check your network connection.");
                setLoading(false);
            })
    }, []);

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <Container className="pt-4 mt-4">
                <Row className="g-4">
                    {products.map((product) => (
                        <Col key={product.id} md={4} className="mb-3 d-flex">
                            <Card className="product-card h-100 d-flex flex-column w-100">
                                <div className="card-img-container">
                                    <img className="product-image" src={product.image} alt={product.title} />
                                </div>
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className="product-title">{product.title}</Card.Title>
                                    <Card.Text className="price">${product.price}</Card.Text>
                                    <Button as={Link} to={`/products/${product.id}`} variant="primary" className="mt-auto w-100">View Details</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

        </>
    )
}

export default ProductList;