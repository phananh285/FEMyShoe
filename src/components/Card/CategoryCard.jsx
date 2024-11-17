import React from 'react';
import '../../assets/css/CategoryCard.css';

const CategoryCard = ({ category, isSelected }) => {
    const { id, name, description, created_at, updated_at } = category;

    return (
        <div className={`category-card ${isSelected ? 'selected' : ''}`}>
            <h3 className="category-name">Tên: {name}</h3>       
            <p className="category-description">ID: {id}</p>
            <p className="category-description">Mô tả: {description}</p>
            <div className="category-stats">
                <p>Ngày tạo: {created_at}</p>
                <p>Ngày cập nhật: {updated_at}</p>
            </div>
        </div>
    );
};

export default CategoryCard;
