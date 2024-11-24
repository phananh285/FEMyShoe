import React, { useState } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import MainCard from '../Card/MainCard';
import './ProductManagement.css';
import ProductForm from './ProductForm.jsx';
import ProductEdit from './ProductEdit.jsx';
const ProductManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [show, setShow] = useState(false)
  const [showModalSua, setShowModalSua] = useState(false);
  const [showSua, setShowSua] = useState(false)
  // Sample data - replace with your actual data source
  const [Users, setUser] = useState([
    { STT: 1, name: 'user 1', hoten: 'B', email: "email",phongbanchinh:"abcd" },
    { STT: 2, name: 'user 2', hoten: 'BA', email: "email",phongbanchinh:"abcd2" },
  ]);

  const handleShowModal = (User) => {
    setShow(true);
    setShowModal(true)
    setShowSua(true);
    setShowModalSua(true);
    setSelectedUser(User)
  };
  const handleCloseModal = () => {
    setShow(false);
    setShowModal(false)
  };
  const handleShowModalSua = (User = null) => {
    setShowSua(true);
    setShowModalSua(true);
    setSelectedProduct(product)
  };
  const handleCloseModalSua = () => {
    setShowSua(false);
    setShowModalSua(false);
    setSelectedProduct(null)
  };

  const handleFileImport = (event) => {
    const file = event.target.files[0];
    // Implement Excel file import logic here
    console.log('Importing file:', file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement add/edit logic here
    handleCloseModal();
  };

  const handleDelete = (productId) => {
    // Implement delete logic here
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
  };

  return (
    
    <MainCard title="Quản lý Người dùng">
      <div className="product-management">
        <div className="management-header">
          <div className="management-actions">
            <Button 
              className="action-button add-button"
              onClick={() => handleShowModal()}>
              <i className="feather icon-plus"  />
              Thêm người dùng
            </Button>
          <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton> 
        </Modal.Header>
        <Modal.Body>
         <ProductForm show={show} setShow = {setShow}/>
        </Modal.Body>
      </Modal>
           
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
              <th className='text'>STT</th>
              <th>Tên đăng nhập </th>
              <th>Họ và tên</th>
              <th>email</th>
              <th>Phòng ban chính</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {Users.map((User) => (
              <tr key={User.STT}>
                <td>{User.STT}</td>
                <td>{User.name}</td>
                <td>{User.hoten}</td>
                <td>{User.email}</td>
                <td>{User.phongbanchinh}</td>
                <td className="action-cell">
                  <button
                    className="edit-btn"
                    onClick={(product) => handleShowModal(product)} >
                    <i className="feather icon-edit-2" />
                    Sửa
                  </button>
                  <Modal showSua={showModalSua} onHide={handleCloseModalSua} centered>
        <Modal.Header closeButton> 
        </Modal.Header>
        <Modal.Body>
         <ProductEdit showSua={showSua} setShowSua = {setShowSua}/>
        </Modal.Body>
      </Modal>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(product.id)}
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
