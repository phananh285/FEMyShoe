import React, { useState, useEffect } from 'react';
import { Button, Modal,Table} from 'react-bootstrap';
import { Form, Input,Collapse,Pagination} from 'antd';
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
  const [pageSize, setPageSize] = useState(10); // Kích thước mặc định

  useEffect(() => {
    const fetchPro = async () => {
   
      const apiUrl =server+`/product/admin?size=10&sortBy=id_desc&page=0`;
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
  }, [isLoad]);
  const ChangePage = async (page, size) => {
    const apiUrl = server + `/product/admin?size=${size}&sortBy=id_desc&page=${page - 1}`;
    try {
      const res = await fetch(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
          'Ngrok-Skip-Browser-Warning': 1,
        },
      });
      const data = await res.json();
      setProducts(data.data.data);
      setTotalPages(data.data.totalPage);
    } catch (error) {
      console.log('Error fetching data', error);
    }
  };
  

  const addPro = async (newPro) => {
    await fetch(server+'/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Ngrok-Skip-Browser-Warning': 1
      },
      body: JSON.stringify(newPro),
    });
    // setProducts((prevProducts) =>
    //   prevProducts.map((product) =>
    //     product.id === id ? { ...product, ...updatedProduct } : product
    //   )
    // );
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
    // setProducts((prevProducts) =>
    //   prevProducts.map((product) =>
    //     product.id === id ? { ...product, ...updatedProduct } : product
    //   )
    // );
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
  const updatePro = async (id,updatedProduct) => {
    await fetch(server+`/product/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Ngrok-Skip-Browser-Warning': 1
      },
      body: JSON.stringify(updatedProduct),
    });
    setIsLoad(!isLoad)
        // Cập nhật danh sách sản phẩm trong trạng thái
    // setProducts((prevProducts) =>
    //   prevProducts.map((product) =>
    //     product.id === id ? { ...product, ...updatedProduct } : product
    //   )
    // );
   return;
  };

  const handleShowModal = () => {
    setShow(true);
  };

  const handleShowModalSua = (item) => {
    setShowSua(true);
    setSelectedProduct(item)
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
//Item tra ve
const items = products.map((Order) => ({
  key: Order.id,
  label: (
    <div>
 Mã sản phẩm : {Order.id} || Tên sản phẩm:  {Order.name} || Mô tả:  {Order.description} || Mã thể loại : {Order.categoryId} || Ngày tạo :       
  {Order.createdAt} || Ngày cập nhất : {Order.updatedAt} || Giá :  {Order.price}
<br/>
{Order.images?.filter((img) => !img.isPrimary).map((image, index) => (
      <img
        key={index}
        src={image.url} // Đường dẫn URL của ảnh
        alt={`Image ${index}`}
        style={{ width: '50px', height: '50px', objectFit: 'cover', margin: '5px' }}
      />
    ))}
          <button
          className="edit-btn"
          onClick={() => handleShowModalSua(Order)} >
          <i className="feather icon-edit-2" />
          Sửa
        </button>
    
        {showSua && (
  <ProductEdit showSua={showSua} setShowSua={setShowSua} selectedProduct={selectedProduct} UpdateProduct={updatePro}/>
)} 

        <button
          className="delete-btn"
          onClick={() => handleConfirmDelete(Order.id)}
        >
          <i className="feather icon-trash-2" />
          Xóa
        </button>
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
    </div>
  ),
  children: (
    <div>
      <Table>
        <thead>
          <tr>
            <th className='text'>Mã sản phẩm loại</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Ảnh minh họa</th>
            <th>Kích cỡ</th>
          </tr>
        </thead>
        <tbody>
 
  {Order.variants?.map((item) => {
    // Tìm ảnh có isPrimary=true
    const primaryImage = Order.images?.find((img) => img.isPrimary);

    return (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.price}</td>
        <td>{item.stock}</td>
        <td>
          {primaryImage ? (
            <img
              src={primaryImage.url} // Đường dẫn URL của ảnh
              alt="Primary Image"
              style={{ width: '50px', height: '50px', objectFit: 'cover' }}
            />
          ) : (
            "Không có ảnh chính"
          )}
        </td>
        <td>{item.attributes["kích cỡ"]}</td>
      </tr>
    );
  })}
</tbody>

      </Table>
    </div>
  ),
}));

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
        
          </div>
        </div>
        {show && (
          <ProductForm
            show={show}
            setShow={setShow}
            addProduct={addPro}
          />
        )}
        {/* <div className="pagination-controls">
             <Button variant="secondary" disabled={currentPage === 0} onClick={handlePrevPage}>
            Previous
            </Button>
            <span>Page {currentPage + 1} of {totalPages}</span>
            <Button variant="primary" disabled={currentPage === totalPages - 1} onClick={handleNextPage}>
            Next
            </Button>
        </div> */}
 
<Pagination
  current={currentPage + 1} // Chuyển từ 0-based sang 1-based
  total={totalPages * pageSize} // Tổng số sản phẩm
  pageSize={pageSize}
  showSizeChanger
  showQuickJumper
  onChange={(page, size) => {
    setCurrentPage(page - 1); // Chuyển từ 1-based sang 0-based
    setPageSize(size);
    ChangePage(page, size);
  }}
  showTotal={(total) => `Total ${total} items`}
/>

      </div>

 
           <div className="product-management collapse-container" style={{ marginLeft: '0' }}>
         <Collapse items={items} /> 
          </div>
    </MainCard>

  );
};

export default ProductManagement;
