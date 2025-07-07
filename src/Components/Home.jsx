function Home() {
    return (
        <div>
            <h1 className="mt-4 mb-5 pb-5">Welcome to Online Fashion</h1>
            <p className="mt- 5 pb-5 mb-5">Discover amazing products at unbeatable prices. Browse, shop, and even update our collection!</p>
            <div className="d-flex justify-content-center mt-5 mb-5 gap-3">
                <a href="/products" className="btn btn-primary">View Products</a>
                <a href="/ProductUpdate" className="btn btn-success">Update Products</a>
                <a href="/DeleteProduct" className="btn btn-danger">Delete Product</a>
            </div>
        </div>
    )
}

export default Home;