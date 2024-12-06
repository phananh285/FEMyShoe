import React, { useState } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import MainCard from '../Card/MainCard';
import './ProductManagement.css';
import { FaCalendarAlt } from 'react-icons/fa';
const ProductManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [show, setShow] = useState(false);
  const [showModalSua, setShowModalSua] = useState(false);
  const [showSua, setShowSua] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Sample data - replace with your actual data source
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', category: 'Category A', price: 100, phongban: "mua ban", loaisp: "abc" },
    { id: 2, name: 'Product 2', category: 'Category B', price: 200, phongban: "mua ban", loaisp: "abcd" },
  ]);

  return (
    <MainCard title="Thống kê">
      <div className="product-management">
        <div className="management-header">
        <div className="toolbar">
  <div className="date-picker-row">
    <div className="date-picker-group">
      <label>Ngày bắt đầu:</label>
      <div className="date-picker-wrapper">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="dd-MM-yyyy"
          className="date-picker"
        />
        <FaCalendarAlt className="date-picker-icon" />
      </div>
    </div>
    <span className="date-separator"/>
    <div className="date-picker-group">
      <label>Ngày kết thúc:</label>
      <div className="date-picker-wrapper">
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="dd-MM-yyyy"
          className="date-picker"
        />
        <FaCalendarAlt className="date-picker-icon" />
      </div>
    </div>
  </div>
  <Button variant="primary" className="statistic-button">
    Thống kê
  </Button>
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
              <th>Số lượng bán ra</th>
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
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </MainCard>
  );
};

export default ProductManagement;
