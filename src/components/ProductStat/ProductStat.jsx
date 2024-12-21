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
  const [revenueData, setRevenueData] = useState([]);



  const Gatherdata = () => {

    console.log(ConvertDate(startDate))
    console.log(ConvertDate(endDate))
    // const res = await fetch(server+`/product/${id}`, {
    //   method: 'DELETE',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
    // setIsLoad(!isLoad)
    // // setProducts((prevProducts) =>
    // //   prevProducts.map((product) =>
    // //     product.id === id ? { ...product, ...updatedProduct } : product
    // //   )
    // // );
    // setConfirmDelete({ show: false, productId: null });
    // return;
  };
  const ConvertDate = (date) => {
    return new Date(date).getTime();
  }
  return (
    <MainCard title="Thống kê">
      <RevenueChart />
    </MainCard>
  );
};

export default ProductManagement;
