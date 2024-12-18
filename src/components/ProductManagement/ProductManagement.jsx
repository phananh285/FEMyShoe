import React, { useState, useEffect } from 'react';
import { Button, Modal,Table} from 'react-bootstrap';
import { Form, Input} from 'antd';
import MainCard from '../Card/MainCard';
import './ProductManagement.css';
import ProductForm from './ProductForm.jsx';
import ProductEdit from './ProductEdit.jsx';
import server from 'constant/linkapi';
const ProductManagement = () => {
  const [form] = Form.useForm();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [show, setShow] = useState(false);
  const [showSua, setShowSua] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState({ show: false, productId: null });
  const [isLoad,setIsLoad]=useState(false)
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);  // Current page number
  const [totalPages, setTotalPages] = useState(0); 
  const [findID, setfindID] = useState('');
  const [findName,setfindName]=useState('');
  useEffect(() => {
    const fetchPro = async () => {
   
      const apiUrl =server+`/product?page=0&size=10&sortBy=id_desc`;
      try {
        const res = await fetch(apiUrl, {
          headers: {
            'Content-Type': 'application/json',
            'Ngrok-Skip-Browser-Warning': 1
          },
        });
        const data = await res.json();
        setProducts(data.data.data);
        setTotalPages(data.data.totalPage);
      } catch (error) {
        console.log('Error fetching data', error);
      }
    };

    fetchPro();
  }, [isLoad,currentPage]);
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
  // Pagination controls
  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  const deletePro = async (id) => {
    const res = await fetch(server+`/product/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setIsLoad(!isLoad)
    setConfirmDelete({ show: false, productId: null });
    return;
  };
const funcfindName = async () =>{
  const apiUrl = server+`/product/search?page=0&size=100&sortBy=rating_desc&name=${findName}`; // URL tìm kiếm
  try {
    const res = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Ngrok-Skip-Browser-Warning': 1,
      },
    });
    const data = await res.json();
    if (data) {
      setProducts(data.data.data); // Đặt kết quả vào danh sách đơn hàng
    } else {
      console.error("Không tìm thấy đơn hàng!");
      setOrders([]);
    }
  } catch (error) {
    console.error("Lỗi khi tìm kiếm đơn hàng:", error);
    setOrders([]);
  }
}
  const updatePro = async (id,product) => {
    await fetch(server+`/product/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Ngrok-Skip-Browser-Warning': 1
      },
      body: JSON.stringify(product),
    });
    setIsLoad(!isLoad)
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
    console.log('Importing file:', file);
  };

  const handleConfirmDelete = (id) => {
    setConfirmDelete({ show: true, productId: id });
  };
//Reset kết quả tìm kiếm
const resetSearch = async () => {
  setfindID(''); // Xóa mã tìm kiếm
  try {
    const apiUrl = server+`/product?page=14&size=10`; // API danh sách gốc
    const res = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Ngrok-Skip-Browser-Warning': 1,
      },
    });
    const data = await res.json();
    setProducts(data.data.data); // Khôi phục danh sách ban đầu
  } catch (error) {
    console.error("Lỗi khi reset tìm kiếm:", error);
  }
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
            <Input 
    value={findName}
    onChange={(e) => setfindName(e.target.value)} 
    placeholder="Nhập tên sản phẩm" 
    style={{ width: '250px' }} /* Đặt chiều rộng cho Input */
  />
  <Button 
    className="action-button add-button"
    type="primary"
    onClick={funcfindName} /* Gọi hàm tìm kiếm theo mã */
  >
    Tìm theo tên
  </Button>
  

  <Button 
    className="action-button reset-button"
    type="default"
    onClick={resetSearch} /* Gọi hàm reset */
  >
    Reset
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
        <div className="pagination-controls">
             <Button variant="secondary" disabled={currentPage === 0} onClick={handlePrevPage}>
            Previous
            </Button>
            <span>Page {currentPage + 1} of {totalPages}</span>
            <Button variant="primary" disabled={currentPage === totalPages - 1} onClick={handleNextPage}>
            Next
            </Button>
        </div>
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
