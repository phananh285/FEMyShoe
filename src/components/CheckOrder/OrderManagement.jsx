import React, { useState, useEffect } from 'react';
import {Modal, Table } from 'react-bootstrap';
import {Collapse, Form, Input,Button,Select,Pagination} from 'antd';
import MainCard from '../Card/MainCard';
import './ProductManagement.css';
import ProductForm from './ProductForm.jsx';
import ProductEdit from './ProductEdit.jsx';
import server from 'constant/linkapi';
const ProductManagement = () => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const [pending,setPending]=useState(true);
  const [isLoad,setIsLoad]=useState(false);
  const [findID, setfindID] = useState('');
  const [findStatus,setfindStatus]=useState('');
  const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);  // Current page number
    const [totalPages, setTotalPages] = useState(0); 
  const selectedStatus=[
    {id:1,name:'PENDING'},
    {id:2,name:'SUCCESS'},
    {id:3,name:'PAYMENT_CONFIRMED'}
  ]
  const [Orders, setOrders] = useState([]);
   useEffect(() => {
     const fetchPro = async () => {
       const apiUrl =server+`/order/admin?page=0&size=12`;
       try {
         const res = await fetch(apiUrl, {
           headers: {
             'Content-Type': 'application/json',
             'Ngrok-Skip-Browser-Warning': 1
           },
         });
         const data = await res.json();
         console.log(data)
         setOrders(data.data.data);
         setTotalPages(data.data.totalPage);
        // setTotalPages(data.data.totalPage);
       } catch (error) {
         console.log('Error fetching data', error);
       }
     };
 
     fetchPro();
   }, [isLoad]);
const Accept = async (id) => {
  const bodyid={
    "orderId": id,
    "status": "SUCCESS"
}
  const res = await fetch(server+`/order/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Ngrok-Skip-Browser-Warning': 1
    },
    
    body: JSON.stringify(bodyid),
  });
  setIsLoad(!isLoad)
  return;
}
//Tìm kiếm theo id
const funcfindID= async () => {
  const apiUrl = `${server}/order/admin/${findID}`; // URL tìm kiếm
  try {
    const res = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Ngrok-Skip-Browser-Warning': 1,
      },
    });
    const data = await res.json();
    if (data) {
      setOrders([data.data]); // Đặt kết quả vào danh sách đơn hàng
    } else {
      console.error("Không tìm thấy đơn hàng!");
      setOrders([]);
    }
  } catch (error) {
    console.error("Lỗi khi tìm kiếm đơn hàng:", error);
    setOrders([]);
  }
};
// Tim kiem theo ma
const funcfindStatus = async () => {
  const apiUrl = server+`/order/admin?page=0&size=10&status=${findStatus}`; // URL tìm kiếm
  try {
    const res = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Ngrok-Skip-Browser-Warning': 1,
      },
    });
    
    const data = await res.json();
    console.log(data)
    setOrders(data.data.data); // Đặt kết quả vào danh sách đơn hàng
  } catch (error) {
    console.error("Lỗi khi tìm kiếm đơn hàng:", error);
    setOrders([]);
  }
};
//Reset kết quả tìm kiếm
const resetSearch = async () => {
  setfindID(''); // Xóa mã tìm kiếm
  try {
    const apiUrl = `${server}/order/admin/payment-success?page=0&size=10`; // API danh sách gốc
    const res = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Ngrok-Skip-Browser-Warning': 1,
      },
    });
    const data = await res.json();
    setOrders(data.data.data); // Khôi phục danh sách ban đầu
  } catch (error) {
    console.error("Lỗi khi reset tìm kiếm:", error);
  }
};
// const Reject =(id)=>{
//      setAccept(false);
//      setPending(true);
// }
const ChangePage = async (page, size) => {
  const apiUrl = server + `/order/admin?page=${page-1}&size=${size}`;
  try {
    const res = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Ngrok-Skip-Browser-Warning': 1,
      },
    });
    const data = await res.json();
    setOrders(data.data.data);
    setTotalPages(data.data.totalPage);
  } catch (error) {
    console.log('Error fetching data', error);
  }
};
const items = Orders.map((Order) => ({
  key: Order.id,
  label: (
    <div>
 Mã đơn hàng : {Order.id} || Tên người nhận:  {Order.user.fullName} || Username:  {Order.user.username} || Email : {Order.user.email} || Ngày tạo :       
  {Order.createdAt} || Tổng tiền : {Order.totalAmount} || Trạng thái thanh toán :  {Order.payment.status} || Trạng thái đơn hàng : {Order.status}
<br/>
{Order.payment.status === 'SUCCESS' && Order.status !== 'SUCCESS' && (
        <Button variant="primary" onClick={() => Accept(Order.id)} >
          Accept
        </Button>
      )}
    </div>
  ),
  children: (
    <div>
      <Table>
        <thead>
          <tr>
            <th className='text'>id</th>
            <th>Số lượng</th>
            <th>Giá</th>
            <th>Mã sản phẩm</th>
            <th>Code</th>
            <th>Trạng thái item</th>
            <th>Trạng thái thanh toán tổng thể</th>
          </tr>
        </thead>
        <tbody>
          {Order.orderItems.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.productId}</td>
              <td>{item.code}</td>
              <td>{item.status}</td>
              <td>{Order.payment.status}</td>
            </tr>
          ))}
      
        </tbody>
      </Table>
    </div>
  ),
}));

  return (
    <MainCard title="Xem danh sách đơn hàng">
      <div className="product-management">
        <div className="management-header">
        <div className="management-actions">
  <Input 
    value={findID} 
    onChange={(e) => setfindID(e.target.value)} 
    placeholder="Nhập mã đơn hàng" 
    style={{ width: '250px' }} /* Đặt chiều rộng cho Input */
  />
  <Button 
    className="action-button add-button"
    type="primary"
    onClick={funcfindID} /* Gọi hàm tìm kiếm theo mã */
  >
    Tìm theo mã
  </Button>
  
  <Select
    placeholder="Chọn trạng thái"
    value={findStatus}
    onChange={(value) => setfindStatus(value)}
    style={{ width: '200px' }} /* Đặt chiều rộng cho Select */
  >
    {selectedStatus.map((status) => (
      <Option key={status.id} value={status.name}>
        {status.name}
      </Option>
    ))}
  </Select>
  <Button 
    className="action-button add-button"
    type="primary"
    onClick={funcfindStatus} /* Gọi hàm tìm kiếm theo trạng thái */
  >
    Tìm theo trạng thái
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
        <div className="product-management collapse-container" style={{ marginLeft: '0' }}>
  <Collapse items={items} />
    </div>

      </div>
    </MainCard>
  );
};

export default ProductManagement;
