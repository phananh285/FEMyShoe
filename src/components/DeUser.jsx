// src/components/ProductsPage.jsx
import React, { useState } from 'react';
import ProductCard from './Card/UserCard';
import '../assets/css/ProductsPage.css';

const user = [
    { id: 1, username: "a", password:"asd", email:"123@a", full_name:"dpa", address:"123", created_at:"123",updated_at:"123"},
    { id: 2, username: "a", password:"asd", email:"123@a", full_name:"dpa", address:"123", created_at:"123",updated_at:"123"},
    // Add more product objects as needed
];

const ProductsPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = user.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(user.length / productsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="products-page">
            <div className="header">
                <h1>USERS</h1>
                <button className="add-product-btn">- Delete User</button>
            </div>
            <div className="product-grid">
                {currentProducts.map(user=> (
                    <ProductCard key={user.id} user={user} />
                ))}
            </div>
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
        </div>
    );
};

const Pagination = ({ totalPages, currentPage, onPageChange }) => (
    <div className="pagination">
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        {Array.from({ length: totalPages }, (_, index) => (
            <button key={index + 1} className={`page-button ${currentPage === index + 1 ? 'active' : ''}`} onClick={() => onPageChange(index + 1)}>
                {index + 1}
            </button>
        ))}
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
    </div>
);

export default ProductsPage;