import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="text-center">
            <h1 className="mt-4 mb-5 pb-5">Welcome to Online Fashion</h1>
            <p className="mt- 5 pb-5 mb-5">Discover amazing products at unbeatable prices. Browse, shop, and even update our collection!</p>
            <div className="d-flex justify-content-center mt-5 mb-5 gap-3">
                <Link to="/products" className="btn btn-primary">View Products</Link>
                <Link to="/addproduct" className="btn btn-info">Add a Product</Link>
            </div>
        </div>
    )
}

export default Home;