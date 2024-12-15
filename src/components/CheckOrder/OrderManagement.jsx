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
  const [accept,setAccept]=useState(false);
  const [pending,setPending]=useState(true);
  // Sample data - replace with your actual data source
  const [Order, setOrders] = useState([
    { id: 1, total_amount: 1000, status: 'active' },
    { id: 2, total_amount: 1000, status: 'in-active' },
  ]);

const Accept =()=>{
     setAccept(true);
     setPending(false);
}
const Reject =(id)=>{
     setAccept(false);
     setPending(true);
}
  return (
    
    <MainCard title="Xem danh sách đơn hàng">
      <div className="product-management">
        <div className="management-header">
          <div className="management-actions">
    
          </div>
        </div>

        <Table responsive className="product-table">
          <thead>
            <tr>
              <th className='text'>ID</th>
              <th>trạng thái</th>
              <th>Số lượng</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {Order.map((Order) => (
              <tr key={Order.id}>
                <td>{Order.id}</td>
                <td>{Order.status}</td>
                <td>{Order.total_amount}</td>
                <td className="action-cell">
                  <button
                    className="edit-btn"
                    onClick={() => Accept()} >
                    <i className="feather icon-edit-2" />
                    Xác nhận 
                  </button>      
                     
                    <button
                    className="delete-btn"
                    onClick={() => Reject(Order.id)}
                  >
                    <i className="feather icon-trash-2" />
                    Hủy
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
