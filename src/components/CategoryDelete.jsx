import React, { useState, useEffect } from 'react';
import CategoryCard from './Card/CategoryCard';
import '../assets/css/ProductsPage.css';

const CategoryDelete = () => {
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const categoriesPerPage = 7;

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('YOUR_API_ENDPOINT/categories');
            if (response.ok) {
                const data = await response.json();
                setCategories(data);
            } else {
                console.error('Failed to fetch categories');
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleDelete = async () => {
        if (selectedCategory) {
            try {
                const response = await fetch(`YOUR_API_ENDPOINT/categories/${selectedCategory.id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    // Refresh danh sách sau khi xóa thành công
                    fetchCategories();
                    setSelectedCategory(null);
                    console.log('Category deleted successfully');
                } else {
                    console.error('Failed to delete category');
                }
            } catch (error) {
                console.error('Error deleting category:', error);
            }
        } else {
            alert('Vui lòng chọn danh mục cần xóa');
        }
    };

    const handleEdit = () => {
        if (selectedCategory) {
            // Thêm logic điều hướng đến trang edit hoặc mở modal edit
            console.log('Edit category:', selectedCategory);
        } else {
            alert('Vui lòng chọn danh mục cần sửa');
        }
    };

    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div className="products-page">
            <div className="header">
                <h1>Danh mục</h1>
                <button 
                    className={`add-product-btn ${!selectedCategory ? 'disabled' : ''}`} 
                    onClick={handleDelete}
                    disabled={!selectedCategory}
                >
                    - Xóa danh mục
                </button>
                <button 
                    className={`add-product-btn ${!selectedCategory ? 'disabled' : ''}`} 
                    onClick={handleEdit}
                    disabled={!selectedCategory}
                >
                    - Sửa danh mục
                </button>
            </div>
            <div className="product-grid">
                {categories.map(category => (
                    <CategoryCard 
                        key={category.id} 
                        category={category}
                        isSelected={selectedCategory?.id === category.id}
                        onSelect={() => handleSelectCategory(category)}
                    />
                ))}
            </div>
        </div>
    );
};

export default CategoryDelete;
