import React, { useState, useEffect } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import {Collapse, Form, Input} from 'antd';
import MainCard from '../Card/MainCard';
import './ProductManagement.css';
import ProductForm from './ProductForm.jsx';
import ProductEdit from './ProductEdit.jsx';
import server from 'constant/linkapi';
const ProductManagement = () => {
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [show, setShow] = useState(false)
  const [showModalSua, setShowModalSua] = useState(false);
  const [showSua, setShowSua] = useState(false)
  const [accept,setAccept]=useState(false);
  const [pending,setPending]=useState(true);
  const [isLoad,setIsLoad]=useState(false);
  const [findID, setfindID] = useState('');
  // Sample data - replace with your actual data source
  const [Orders, setOrders] = useState([]);
   useEffect(() => {
     const fetchPro = async () => {
       const apiUrl =server+`/order/admin/payment-success?page=0&size=100`;
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
    },
    
    body: JSON.stringify(bodyid),
  });
  setIsLoad(!isLoad)
  return;
}
const find = (value) =>{
  console.log(findID)
}
const Reject =(id)=>{
     setAccept(false);
     setPending(true);
}
const text="ds"
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
          <Form form={form} onFinish={find} layout="horizontal">
          <div >
          <Button 
              className="action-button add-button"
              type="primary" htmlType="submit"
              >
              <i className="feather icon-plus" />
              Tìm kiếm đơn hàng : 
            </Button>
            <Input value={findID} onChange={(e) => setfindID(e.target.value)} />
          </div>
          
            </Form>
          </div>
        </div>

        <div className="product-management collapse-container" style={{ marginLeft: '0' }}>
  <Collapse items={items} />
</div>

      </div>
    </MainCard>
  );
};

export default ProductManagement;
