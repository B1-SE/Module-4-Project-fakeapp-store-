import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";

function ProductDetails({ onDeleteProduct }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then((response) => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to load product details");
                setLoading(false);
            });
    }, [id]);

    const handleDelete = useCallback(async () => {
        try {
            const res = await axios.delete(`https://fakestoreapi.com/products/${id}`);
            console.log("Deleted product:", res.data);
            onDeleteProduct(product.id);
            navigate("/products");
        } catch (err) {
            console.log("Delete failed:", err);
            alert("Failed to delete product.");
        } finally {
            setShowModal(false);
        }
    }, [id, navigate, onDeleteProduct, product]);

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Container className="d-flex justify-content-center align-items-center py-4" style={{ minHeight: "80vh" }}>
            <Card className="product-card w-100" style={{ maxWidth: 500 }}>
                <Card.Img
                    className="product-image"
                    variant="top"
                    src={product.image}
                    alt={product.title}
                    style={{ objectFit: "contain", width: "100%", height: "300px" }}
                />
                <Card.Body>
                    <Card.Title className="fs-5">{product.title}</Card.Title>
                    <Card.Text className="text-muted" style={{ fontSize: "0.95rem" }}>{product.description}</Card.Text>
                    <Card.Text className="fw-bold mb-1">${product.price}</Card.Text>
                    <Card.Text className="text-secondary mb-3">{product.category}</Card.Text>
                    <Button variant="secondary" className="w-100 mb-2">Add to Cart</Button>
                    <Button as={Link} to={`/productupdate/${id}`} variant="success" className="w-100 mb-2">
                        Edit
                    </Button>
                    <Button variant="danger" className="w-100" onClick={() => setShowModal(true)}>
                        Delete
                    </Button>
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this product?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default ProductDetails;