// src/components/Card/ProductCard.jsx
import React from 'react';
import '../../assets/css/ProductCard.css';

const UserCard = ({ user }) => {
    const { id, username, password, email, full_name, address, created_at,updated_at } = user;

    return (
        <div className="product-card">
            <p> id: {id}</p>
            <p>username: {username}</p>
            <p>Password: {password}</p>
            <p>full-name: {full_name}</p>
            <p>address: {address}</p>
            <p>created_at: {created_at}</p>
            <p>updated_at: {updated_at}</p>
            <p>email: {email}</p>
        </div>
    );
};

export default UserCard ;