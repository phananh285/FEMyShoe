import React, { useState,useEffect } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import MainCard from '../Card/MainCard';
import './ProductManagement.css';
import CategoryForm from './CategoryForm.jsx';
import CategoryEdit from './CategoryEdit.jsx';
import server from 'constant/linkapi';
const ProductManagement = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [show, setShow] = useState(false)
  const [showSua, setShowSua] = useState(false)
  // Sample data - replace with your actual data source
  const [category, setCategory] = useState([

  ]);
  const [isload,setIsload]=useState(false)
  useEffect(() => {
    const fetchCategory = async () => {
      const apiUrl = server+"/category";
      try {
        const res = await fetch(apiUrl, {
          headers: {
            'Content-Type': 'application/json',
            'Ngrok-Skip-Browser-Warning' : 1
          },
        });
        const data = await res.json();

        setCategory(data.data);
      } catch (error) {
        console.log('Error fetching data', error);
      } 
    };

    fetchCategory();
  }, [isload]);

  //them danh muc
  const addCategory= async (newName) => {
    const res = await fetch(REACT_APP_API+'/category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newName),
    });
    setIsload(!isload)
    return;
  };

  // Delete 

  const deleteCategory = async (id) => {
    const res = await fetch(REACT_APP_API+`/category/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setIsload(!isload)
    return;
  };

  // Update 
  const updateCategory = async (id,newName) => {
    console.log(id)
    const res = await fetch(server+`/category/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newName),
    });
    setIsload(!isload)
    return;
  };
  const handleShowModal = () => {
    setShow(true);
  };

  const handleShowModalSua = () => {
    setShowSua(true);
  };


  return (
    <MainCard title="Quản lý danh mục">
      <div className="product-management">
        <div className="management-header">
          <div className="management-actions">
            <Button 
              className="action-button add-button"
              onClick={() => handleShowModal()}>
              <i className="feather icon-plus"  />
              Thêm danh mục
            </Button>
           
          </div>
        </div>
        {show && (
          <CategoryForm
            show={show}
            setShow={setShow}
            addCategory={addCategory}
          />
        )}
        <Table responsive className="product-table">
          <thead>
            <tr>
              <th className='text'>Mã danh mục</th>
              <th>Tên danh mục</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {category.map((Category) => (
              <tr key={Category.id}>
                <td>{Category.id}</td>
                <td>{Category.name}</td>
                <td className="action-cell">
                  <button
                    className="edit-btn"
                    onClick={() => handleShowModalSua()} >
                    <i className="feather icon-edit-2" />
                    Sửa
                  </button>      
            {showSua && (<CategoryEdit showSua={showSua} setShowSua={setShowSua} selectedCategory={Category.id} updateCategory={updateCategory}/>)}
                    <button
                    className="delete-btn"
                    onClick={() => deleteCategory(Category.id)}
                  >
                    <i className="feather icon-trash-2" />
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </MainCard>
  );
};

export default ProductManagement;
