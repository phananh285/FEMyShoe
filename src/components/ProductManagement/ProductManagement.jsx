import React, { useState, useEffect } from 'react';
import {  Modal, Table } from 'react-bootstrap';
import { Form, Input, Collapse, Pagination ,Button} from 'antd';
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
  const [isLoad, setIsLoad] = useState(false)
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);  // Current page number
  const [totalPages, setTotalPages] = useState(0);
  const [findID, setfindID] = useState('');
  const [findName, setfindName] = useState('');
  const [pageSize, setPageSize] = useState(10); // Kích thước mặc định

  // //Fake data
  // const mockProducts = [
  //   {
  //     id: 1,
  //     name: 'Sản phẩm A',
  //     description: "<section class=\"size-guide\"><div class=\"size-guide-container\"><h2 class=\"size-guide-title\">Hướng dẫn chọn size giày phù hợp</h2><p class=\"size-guide-description\">Việc chọn size giày phù hợp là rất quan trọng để đảm bảo sự thoải mái khi sử dụng. Dưới đây là hướng dẫn giúp bạn chọn đúng size giày:</p><div class=\"size-guide-image\"><img src=\"https://templates.mediamodifier.com/63ff3c773e8bc57b10ca810b/size-table-chart-template-for-shoes.jpg\" alt=\"Hướng dẫn đo size giày chính xác\" style=\"max-width: 100%; height: auto;\" /></div><div class=\"size-table\"><h3>Bảng size giày</h3><table border=\"1\" cellpadding=\"10\" cellspacing=\"0\"><thead><tr><th>Chiều dài chân (cm)</th><th>Size EU</th><th>Size US</th><th>Size UK</th></tr></thead><tbody><tr><td>22.0 - 22.5</td><td>35</td><td>5</td><td>4</td></tr><tr><td>22.6 - 23.0</td><td>36</td><td>6</td><td>5</td></tr><tr><td>23.1 - 23.5</td><td>37</td><td>6.5</td><td>5.5</td></tr><tr><td>23.6 - 24.0</td><td>38</td><td>7</td><td>6</td></tr><tr><td>24.1 - 24.5</td><td>39</td><td>8</td><td>7</td></tr><tr><td>24.6 - 25.0</td><td>40</td><td>8.5</td><td>7.5</td></tr></tbody></table></div><div class=\"size-guide-steps\"><h3>Cách đo chân để chọn size:</h3><ol><li>Đặt một tờ giấy lớn trên mặt phẳng.</li><li>Đặt chân lên tờ giấy và dùng bút đánh dấu đầu ngón chân dài nhất và gót chân.</li><li>Đo khoảng cách giữa hai điểm được đánh dấu.</li><li>Sử dụng bảng size để chọn kích thước phù hợp nhất.</li></ol></div>\r\n",
  //     categoryId: 101,
  //     createdAt: '2024-12-01',
  //     updatedAt: '2024-12-10',
  //     price: 100000,
  //     images: [
  //       { url: 'src\\components\\ProductManagement\\2204-wallpaper-1600x900.jpg', isPrimary: true },
  //       { url: 'src\\components\\ProductManagement\\2204-wallpaper-1600x900.jpg' },
  //       { url: 'src\\components\\ProductManagement\\2204-wallpaper-1600x900.jpg' }
  //     ],
  //     variants: [
  //       {
  //         id: 'VAR1',
  //         price: 120000,
  //         stock: 10,
  //         attributes: { 'kích cỡ': 'L' },
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: 'Sản phẩm B',
  //     description: 'Mô tả sản phẩm B',
  //     categoryId: 102,
  //     createdAt: '2024-11-15',
  //     updatedAt: '2024-12-05',
  //     price: 200000,
  //     images: [
  //       { url: 'https://via.placeholder.com/50', isPrimary: true },
  //     ],
  //     variants: [
  //       {
  //         id: 'VAR2',
  //         price: 220000,
  //         stock: 5,
  //         attributes: { 'kích cỡ': 'M' },
  //       },
  //     ],
  //   },
  // ];

  // useEffect(() => {
  //   setProducts(mockProducts); // Gán dữ liệu mock vào state
  //   setTotalPages(1); // Số trang giả lập
  // }, []);

  useEffect(() => {
    const fetchPro = async () => {

      const apiUrl = server + `/product/admin?size=10&sortBy=id_desc&page=0`;
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
    await fetch(server + '/product', {
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
    const res = await fetch(server + `/product/${id}`, {
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
  const funcfindName = async () => {
    const apiUrl = server + `/product/search?page=0&size=100&sortBy=rating_desc&name=${findName}`; // URL tìm kiếm
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
  const updatePro = async (id, updatedProduct) => {
    await fetch(server + `/product/${id}`, {
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
  // function stripHtml(html) {
  //   return html
  //     .replace(/<\/?[^>]+(>|$)/g, "..") // Thay thế toàn bộ thẻ HTML bằng ".."
  //     .replace(/\s+/g, " ") // Loại bỏ khoảng trắng thừa
  //     .trim(); // Loại bỏ khoảng trắng đầu và cuối
  // }
  const parseHtmlToText = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    return doc.body.textContent || "";
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
      const apiUrl = server + `/product?page=14&size=10`; // API danh sách gốc
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
        <div class="product-info">
          <p class="product-id-name">
            <strong><b>Mã sản phẩm:</b></strong> {Order.id} <span>|</span> <strong><b>Tên sản phẩm:</b></strong> {Order.name}
          </p>
          <p class="product-description"><strong><b>Mô tả:</b></strong> {parseHtmlToText(Order.description)}</p>
          <p class="product-category"><strong><b>Mã thể loại:</b></strong> {Order.categoryId}</p>
          <p class="product-dates">
            <strong><b>Ngày tạo: </b></strong> 
       {new Date(Order.createdAt).toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })}, {new Date(Order.createdAt).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })}  <span>|</span> <strong><b>Ngày cập nhật: </b></strong> 
    
    {new Date(Order.createdAt).toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })}, {new Date(Order.createdAt).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })} 
          </p>
          <p class="product-price"><strong><b>Giá:</b></strong> {Order.price.toLocaleString()} VND</p>
        </div>
        {Order.images?.filter((img) => !img.isPrimary).map((image, index) => (
          <img
            key={index}
            src={image.url} // Đường dẫn URL của ảnh
            alt={`Image ${index}`}
            style={{ width: '50px', height: '50px', objectFit: 'cover', margin: '5px' }}
          />
        ))}
        <div className='action-group'>
        <button
          className="edit-btn"
          onClick={() => handleShowModalSua(Order)} >
          <i className="feather icon-edit-2" />
          Sửa
        </button>

        {showSua && (
          <ProductEdit showSua={showSua} setShowSua={setShowSua} selectedProduct={selectedProduct} UpdateProduct={updatePro} />
        )}

        <button
          className="delete-btn"
          onClick={() => handleConfirmDelete(Order.id)}
        >
          <i className="feather icon-trash-2" />
          Xóa
        </button>
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
                  <td>{item.price.toLocaleString() + " đ"}</td>
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
              Đặt lại
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
          showTotal={(total) => `Tổng cộng ${total} sản phẩm`}
          locale={{
            items_per_page: "sản phẩm / trang",
            jump_to: "Đi tới",
            jump_to_confirm: "Xác nhận",
            page: "trang",
            prev_page: "Trang trước",
            next_page: "Trang tiếp",
            prev_5: "Quay lại 5 trang",
            next_5: "Tiến tới 5 trang",
            prev_3: "Quay lại 3 trang",
            next_3: "Tiến tới 3 trang",
          }}
        />

      </div>


      <div className="product-management collapse-container" style={{ marginLeft: '0' }}>
        <Collapse items={items} />
      </div>
    </MainCard>

  );
};

export default ProductManagement;
