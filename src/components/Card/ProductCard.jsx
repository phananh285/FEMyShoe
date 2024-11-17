// src/components/Card/ProductCard.jsx
import React from 'react';
import '../../assets/css/ProductCard.css';

const ProductCard = ({ product }) => {
    const { id, image, name, description, price, sales, remaining } = product;

    return (
        <div className="product-card">
            <h3 className="product-name">Tên: {name}</h3>       
            <p className="product-description">id: {id}</p>
            <p className="product-description">Mô tả: {description}</p>
            <p className="price">giá: {price}</p>
            <div className="product-stats">
                <p>Sales: {sales}</p>
                <p>Remaining: {remaining}</p>
            </div>
        </div>
    );
};

export default ProductCard;