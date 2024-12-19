import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import MainCard from '../Card/MainCard';
import './ProductManagement.css';
import { FaCalendarAlt } from 'react-icons/fa';
import RevenueChart from 'components/RevenueChart';
import { ConsoleSqlOutlined } from '@ant-design/icons';
import TopProductsChart from 'components/TopProductChart';
import PieChartProduct from 'components/PieChartProduct'
import PieBasicChart from 'views/charts/nvd3-chart/chart/PieBasicChart';

const ProductManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [show, setShow] = useState(false);
  const [showModalSua, setShowModalSua] = useState(false);
  const [showSua, setShowSua] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [revenueData,setRevenueData]=useState([]);
  // Sample data - replace with your actual data source
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', category: 'Category A', price: 100, phongban: "mua ban", loaisp: "abc" },
    { id: 2, name: 'Product 2', category: 'Category B', price: 200, phongban: "mua ban", loaisp: "abcd" },
  ]);

  const Gatherdata=  () => {
  
  console.log(ConvertDate(startDate))
  console.log(ConvertDate(endDate))
  };
  const ConvertDate = (date)=>{
    return new Date(date).getTime();
  }
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
  dateFormat="MM/yyyy"
  showMonthYearPicker
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
  dateFormat="MM/yyyy"
  showMonthYearPicker
  className="date-picker"
/>

        <FaCalendarAlt className="date-picker-icon" />
      </div>
    
    </div>
  </div>

  <Button variant="primary" className="statistic-button" onClick={(startDate,endDate) => Gatherdata(startDate,endDate)}>
    Thống kê
  </Button>
</div>
        </div>

      </div>
      <RevenueChart revenueData={revenueData}/>
    
        <TopProductsChart/>
 

 
        <PieChartProduct/>
      

    </MainCard>
  );
};

export default ProductManagement;
