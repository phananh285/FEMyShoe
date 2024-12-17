import React, { useState,useEffect } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import MainCard from '../Card/MainCard';
import { Form, Input} from 'antd';
import './ProductManagement.css';
import UserForm from './UserForm.jsx';
import UserEdit from './UserEdit.jsx';
const ProductManagement = () => {
  const [form] = Form.useForm();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [show, setShow] = useState(false)
  const [showSua, setShowSua] = useState(false)
  const [findID, setfindID] = useState('');
  // Sample data - replace with your actual data source
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', category: 'Category A', price: 100,  phongban: "mua ban",loaisp:"abc" },
    { id: 2, name: 'Product 2', category: 'Category B', price: 200,  phongban: "mua ban",loaisp:"abcd" },
  ]);
  useEffect(() => {
    const fetchPro = async () => {
      const apiUrl = '/api/jobs?_limit=3';
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setPro(data);
      } catch (error) {
        console.log('Error fetching data', error);
      } 
    };

    fetchPro();
  }, []);
  const addUser= async (newPro) => {
    const res = await fetch('/api/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPro),
    });
    return;
  };

  // Delete 
  const deleteUser = async (id) => {
    const res = await fetch(`/api//${id}`, {
      method: 'DELETE',
    });
    return;
  };

  // Update 
  const updateUser = async (product) => {
    const res = await fetch(`/api/${product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product.id),
    });
    return;
  };
  const handleShowModal = () => {
    setShow(true);
  };

  const handleShowModalSua = () => {
    setShowSua(true);
  };

  const handleFileImport = (event) => {
    const file = event.target.files[0];
    // Implement Excel file import logic here
    console.log('Importing file:', file);
  };
  const find = (value) =>{
    console.log(findID)
  }
  return (
    <MainCard title="Quản lý người dùng">
      <div className="product-management">
        <div className="management-header">
          <div className="management-actions">
               <Form form={form} onFinish={find} layout="horizontal">
          <div >
          <Button 
              className="action-button add-button"
              type="primary" htmlType="submit"
              >
              <i className="feather icon-plus" />
              Tìm kiếm người dùng : 
            </Button>
            <Input value={findID} onChange={(e) => setfindID(e.target.value)} />
          </div>
          
            </Form>
            <label className="action-button import-button" style={{ margin: 0 }}>
              <i className="feather icon-upload" />
              Import Excel
              <input
                type="file"
                accept=".xlsx,.xls"
                style={{ display: 'none' }}
                onChange={handleFileImport}
              />
            </label>
          </div>
        </div>
        <Table responsive className="product-table">
          <thead>
            <tr>
              <th className='text'>Mã sản phẩm</th>
              <th>Tên sản phẩm</th>
              <th>Danh mục</th>
              <th>Giá</th>
              <th>Phòng ban</th>
              <th>Loại sản phẩm</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.category_id}</td>
                <td>{product.create_at}</td>
                <td>{product.updated_at}</td>
                <td className="action-cell">
                  <button
                    className="edit-btn"
                    onClick={() => handleShowModalSua()} >
                    <i className="feather icon-edit-2" />
                    Sửa
                  </button>      
         {showSua && (<UserEdit showSua={showSua} setShowSua={setShowSua} selectedUser={product.id} UpdateUser={updateUser}/>)}
   
                    <button
                    className="delete-btn"
                    onClick={() => deleteUser(product.id)}
                  >
                    <i className="feather icon-trash-2" />
                    Khóa
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
