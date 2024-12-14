import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import MainCard from '../Card/MainCard';
import './ProductManagement.css';
import ProductForm from './ProductForm.jsx';
import ProductEdit from './ProductEdit.jsx';
const ProductManagement = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [show, setShow] = useState(false);
  const [showSua, setShowSua] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState({ show: false, productId: null });
  const [isLoad,setIsLoad]=useState(false)
  const [products, setProducts] = useState([]);
const server='https://5e81-116-96-44-182.ngrok-free.app'
  useEffect(() => {
    const fetchPro = async () => {
      const apiUrl = server + '/product?page=0&size=35';
      try {
        const res = await fetch(apiUrl, {
          headers: {
            'Content-Type': 'application/json',
            'Ngrok-Skip-Browser-Warning': 1
          },
        });
        const data = await res.json();
        setProducts(data.data.data);
      } catch (error) {
        console.log('Error fetching data', error);
      }
    };

    fetchPro();
  }, [isLoad]);
  const addPro = async (newPro) => {
    await fetch(server+'/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Ngrok-Skip-Browser-Warning': 1
      },
      body: JSON.stringify(newPro),
    });
    setIsLoad(!isLoad)
    return;
  };

  const deletePro = async (id) => {
    await fetch(`/api//${id}`, {
      method: 'DELETE',
    });
    setProducts(products.filter(product => product.id !== id));
    setConfirmDelete({ show: false, productId: null });
  };

  const updatePro = async (product) => {
    await fetch(`/api/${product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
  };

  const handleShowModal = () => {
    setShow(true);
  };

  const handleShowModalSua = () => {
    setShowSua(true);
  };

  const handleFileImport = (event) => {
    const file = event.target.files[0];
    console.log('Importing file:', file);
  };

  const handleConfirmDelete = (id) => {
    setConfirmDelete({ show: true, productId: id });
  };

  return (
    <MainCard title="Quản lý sản phẩm">
      <div className="product-management">
        <div className="management-header">
          <div className="management-actions">
            <Button 
              className="action-button add-button"
              onClick={() => handleShowModal()}>
              <i className="feather icon-plus" />
              Thêm sản phẩm
            </Button>
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
        {show && (
          <ProductForm
            show={show}
            setShow={setShow}
            addProduct={addPro}
          />
        )}

        <Table responsive className="product-table">
          <thead>
            <tr>
              <th className='text'>Mã sản phẩm</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Số lượng bán ra</th>
              <th>Đánh giá</th>
              <th>Ảnh minh họa</th>
              <th>Danh mục</th>
              <th>Ngày tạo</th>
              <th>Ngày cập nhật</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.sold}</td>
                <td>{product.rating}</td>
                <td><img src={product.imageUrl} alt="product" /></td>
                <td>{product.categoryId}</td>
                <td>{product.createdAt}</td>
                <td>{product.updatedAt}</td>
                <td className="action-cell">
                  <button
                    className="edit-btn"
                    onClick={() => handleShowModalSua()} >
                    <i className="feather icon-edit-2" />
                    Sửa
                  </button>
                  {showSua && (
                    <ProductEdit showSua={showSua} setShowSua={setShowSua} selectedProduct={product.id} UpdateProduct={updatePro}/>
                  )}

                  <button
                    className="delete-btn"
                    onClick={() => handleConfirmDelete(product.id)}
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

      <Modal show={confirmDelete.show} onHide={() => setConfirmDelete({ show: false, productId: null })}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn xóa sản phẩm này không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setConfirmDelete({ show: false, productId: null })}>
            Hủy
          </Button>
          <Button variant="danger" onClick={() => deletePro(confirmDelete.productId)}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </MainCard>
  );
};

export default ProductManagement;
