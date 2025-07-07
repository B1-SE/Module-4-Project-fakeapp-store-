import axios from "axios";
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

function ProductUpdate() {
    const [formData, setFormData] = useState({
        id: '',
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

    const validateForm = () => {
        const { id, title, description, category, price } = formData;
        if (
            id.trim() === '' ||
            title.trim() === '' ||
            description.trim() === '' ||
            category.trim() === '' ||
            price.trim() === ''
        ) {
            setSuccess('');
            setError('ID, Title, Description, Category, and Price are required.');
            return false;
        }
        setError('');
        return true;
    };

    const handleProductUpdate = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const { id, title, description, category, price } = formData;
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
            if (!formData.id) {
                // Set a default ID if none is present
                setFormData((prev) => ({ ...prev, id: '1' }));
                return;
            }
            try {
                const response = await axios.get(`https://fakestoreapi.com/products/${formData.id}`);
                const { title, description, category, price } = response.data;
                setFormData((prev) => ({
                    ...prev,
                    title: title || '',
                    description: description || '',
                    category: category || '',
                    price: price !== undefined ? String(price) : '',
                }));
                setError('');
            } catch (err) {
                setError('Product not found.');
                setSuccess('');
                setFormData((prev) => ({
                    ...prev,
                    title: '',
                    description: '',
                    category: '',
                    price: '',
                }));
            }
        };
        fetchProduct();
        // Only fetch when id changes and is not empty
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData.id]);

    return (
        <div>
            <h2 className="mb-5">Update Fashion Product</h2>
            <form onSubmit={handleProductUpdate}>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                {success && <div style={{ color: 'green' }}>{success}</div>}
                <div>
                    <label htmlFor="id">Product ID:</label><br/>
                    <input
                        type="number"
                        id="id"
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="title">Product Title:</label><br/>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Product title"
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label><br/>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Product description"
                    />
                </div>
                <div>
                    <label htmlFor="category">Category:</label><br/>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="Product category"
                    />
                </div>
                <div>
                    <label htmlFor="price">Price:</label><br/>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Product price"
                    />
                </div><br/>
                <button  type="submit">Update</button>
            </form>
            
        </div>
    );
}
export default ProductUpdate;