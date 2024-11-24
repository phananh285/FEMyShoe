import React, { useState } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import MainCard from '../Card/MainCard';
import './ProductManagement.css';
import ProductForm from './ProductForm.jsx';
import ProductEdit from './ProductEdit.jsx';
const ProductManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [show, setShow] = useState(false)
  const [showModalSua, setShowModalSua] = useState(false);
  const [showSua, setShowSua] = useState(false)
  // Sample data - replace with your actual data source
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', category: 'Category A', price: 100,  phongban: "mua ban",loaisp:"abc" },
    { id: 2, name: 'Product 2', category: 'Category B', price: 200,  phongban: "mua ban",loaisp:"abcd" },
  ]);

  const handleShowModal = (product) => {
    setShow(true);
    setShowModal(true)
    setShowSua(true);
    setShowModalSua(true);
    setSelectedProduct(product)
  };
  const handleCloseModal = () => {
    setShow(false);
    setShowModal(false)
  };
  const handleShowModalSua = (product = null) => {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Kiểm tra nếu có sản phẩm được chọn để sửa
    if (selectedProduct) {
        try {
            // Tạo đối tượng sản phẩm cập nhật từ dữ liệu trong form
            const updatedProduct = {
                name: selectedProduct.name, // Lấy tên sản phẩm từ form
                price: selectedProduct.price, // Lấy giá sản phẩm từ form
                category: selectedProduct.category, // Lấy danh mục sản phẩm từ form
                // Thêm các trường khác nếu cần
            };

            // Gọi API cập nhật sản phẩm
            const response = await axios.put(`/api/products/${selectedProduct.id}`, updatedProduct);

            // Kiểm tra phản hồi từ server
            if (response.status === 200) {
                // Cập nhật danh sách sản phẩm trong state
                setProducts((prevProducts) => 
                    prevProducts.map(product => 
                        product.id === selectedProduct.id ? { ...product, ...updatedProduct } : product
                    )
                );

                // Đóng modal sau khi sửa thành công
                handleCloseModal();
                alert('Sửa sản phẩm thành công!'); // Thông báo thành công
            }
        } catch (error) {
            console.error('Có lỗi xảy ra khi sửa sản phẩm:', error);
            alert('Có lỗi xảy ra, vui lòng thử lại!'); // Thông báo lỗi
        }
    } else {
        // Nếu không có sản phẩm nào được chọn, có thể thêm logic để thêm sản phẩm mới
        // Ví dụ: await productService.createProduct(newProduct);
    }
};

  const handleDelete = (productId) => {
    // Implement delete logic here
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
  };

  return (
    
    <MainCard title="Quản lý sản phẩm">
      <div className="product-management">
        <div className="management-header">
          <div className="management-actions">
            <Button 
              className="action-button add-button"
              onClick={() => handleShowModal()}>
              <i className="feather icon-plus"  />
              Thêm sản phẩm
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
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product.phongban}</td>
                <td>{product.loaisp}</td>
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
