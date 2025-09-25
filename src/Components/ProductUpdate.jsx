import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import Alert from "react-bootstrap/Alert";

function ProductUpdate() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        price: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleProductUpdate = async (event) => {
        event.preventDefault();

        try {
            const { title, description, category, price } = formData;
            const response = await axios.put(
                `https://fakestoreapi.com/products/${id}`,
                {
                    title,
                    description,
                    category,
                    price: parseFloat(price),
                },
                {
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                }
            );
            setSuccess('Product updated successfully!');
            setError('');
            setTimeout(() => {
                navigate(`/products/${id}`);
            }, 1500);
            console.log('Update response:', response.data);
        } catch (error) {
            setError('Failed to update product.');
            setSuccess('');
            console.error(error.message);
        }
    };

    // Fetch product data when component mounts or ID changes and pre-fill the form
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
                const { title, description, category, price } = response.data;
                setFormData({
                    title: title || '',
                    description: description || '',
                    category: category || '',
                    price: price !== undefined ? String(price) : '',
                });
                setError('');
            } catch (err) {
                setError('Product not found.');
                setSuccess('');
                console.error("Failed to fetch product:", err);
            }
        };
        fetchProduct();
    }, [id]);

    return (
        <Container className="mt-5">
            <h2 className="mb-5">Update Fashion Product</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleProductUpdate}>
                <Form.Group className="mb-3">
                    <Form.Label>Product Title:</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Product title"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Product description"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Category:</Form.Label>
                    <Form.Control
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="Product category"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Price:</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Product price"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Update</Button>
            </Form>
        </Container>
    );
}
export default ProductUpdate;