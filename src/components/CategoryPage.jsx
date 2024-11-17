import React, { useState, useEffect } from 'react';
import CategoryCard from './Card/CategoryCard';
import '../assets/css/CategoryPage.css';

const CategoryPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [categories, setCategories] = useState([]);
    const categoriesPerPage = 7;

    // Fetch categories when component mounts
    useEffect(() => {
        fetchCategories();
    }, []);

    // Function to fetch all categories from backend
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

    // Function to handle adding new category
    const handleAddCategory = async (categoryData) => {
        try {
            const response = await fetch('YOUR_API_ENDPOINT/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(categoryData)
            });

            if (response.ok) {
                const newCategory = await response.json();
                // Update categories list with new data
                setCategories(prevCategories => [...prevCategories, newCategory]);
            } else {
                console.error('Failed to add category');
            }
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    const indexOfLastCategory = currentPage * categoriesPerPage;
    const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
    const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);
    const totalPages = Math.ceil(categories.length / categoriesPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="categories-page">
            <div className="header">
                <h1>Danh mục</h1>
                <button 
                    className="add-category-btn"
                    onClick={() => {
                        // Example category data - replace with actual form data
                        const newCategory = {
                            name: 'New Category',
                            description: 'Description'
                        };
                        handleAddCategory(newCategory);
                    }}
                >
                    + Thêm danh mục mới
                </button>
            </div>
            <div className="category-grid">
                {currentCategories.map(category => (
                    <CategoryCard key={category.id} category={category} />
                ))}
            </div>
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
        </div>
    );
};

const Pagination = ({ totalPages, currentPage, onPageChange }) => (
    <div className="pagination">
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>Trước</button>
        {Array.from({ length: totalPages }, (_, index) => (
            <button key={index + 1} className={`page-button ${currentPage === index + 1 ? 'active' : ''}`} onClick={() => onPageChange(index + 1)}>
                {index + 1}
            </button>
        ))}
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>Sau</button>
    </div>
);

export default CategoryPage;
