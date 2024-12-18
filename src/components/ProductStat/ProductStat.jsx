import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import MainCard from '../Card/MainCard';
import './ProductManagement.css';
import { FaCalendarAlt } from 'react-icons/fa';
import RevenueChart from 'components/RevenueChart';

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

  useEffect(() => {
    const fetchPro = async (startDate,endDate) => {
      const apiUrl = '';
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setPro(data);
      } catch (error) {
        console.log('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPro();
  }, []);
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

  <Button variant="primary" className="statistic-button" onClick={(startDate,endDate) => fetchPro()}>
    Thống kê
  </Button>
</div>
        </div>
  <RevenueChart/>
      </div>
    </MainCard>
  );
};

export default ProductManagement;
