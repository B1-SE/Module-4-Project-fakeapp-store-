import axios from "axios";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

function DeleteProduct() {
    const [product, setProduct] = useState();
    const [deleted, setDeleted] = useState(false);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        price: '',
        image: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Show confirmation modal
    const handleShowModal = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    // Handle actual deletion after confirmation
    const handleDelete = async () => {
        setShowModal(false);
        try {
            const response = await axios.post("https://fakestoreapi.com/products", formData);
            console.log(response.data);
            setProduct(response.data);
            setDeleted(true);
            setError(null);
            setTimeout(() => {
                navigate('/products');
            }, 1500);
        } catch (error) {
            setError(`Error deleting product. Please try again: ${error.message}`);
            setDeleted(false);
        }
    };

    return (
        <Container className="mt-5">
            <h2 className="mt-5 mb-5">Delete Fashion Product</h2>

            {deleted && <Alert variant="danger" dismissible>Product deleted successfully! Redirecting...</Alert>}
            {error && <Alert variant="danger" dismissible>{error}</Alert>}

            <Form onSubmit={handleShowModal}>
                {/* Title */}
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter a title" name="title" value={formData.title} onChange={handleChange} required />
                </Form.Group>

                {/* Description */}
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Enter a description" name="description" value={formData.description} onChange={handleChange} required />
                </Form.Group>

                {/* Category */}
                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Control type="text" placeholder="Enter a category" name="category" value={formData.category} onChange={handleChange} required />
                </Form.Group>

                {/* Price */}
                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="text" placeholder="Enter a price" name="price" value={formData.price} onChange={handleChange} required />
                </Form.Group>

                <Button variant="danger" type="submit">
                    Delete
                </Button>
            </Form>

            {/* Confirmation Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
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
    );
}

export default DeleteProduct;
