import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

const ProductSalesPieChart = () => {
  const [productData, setProductData] = useState([]);
  const [startDate, setStartDate] = useState('2023-10-01'); // Ngày bắt đầu mặc định
  const [endDate, setEndDate] = useState('2023-10-31'); // Ngày kết thúc mặc định

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get('/api/product-sales', {
          params: { startDate, endDate } // Gửi startDate và endDate như tham số
        });
        setProductData(response.data); // Giả sử response.data là mảng sản phẩm với số lượng bán ra
      } catch (error) {
        console.error('Error fetching product sales data:', error);
        // Mock data để test
        setProductData([
          { name: 'Sản phẩm A', amount: 500 },
          { name: 'Sản phẩm B', amount: 300 },
          { name: 'Sản phẩm C', amount: 200 },
          { name: 'Sản phẩm D', amount: 400 },
        ]);
      }
    };

    fetchProductData();
  }, [startDate, endDate]); // Gọi lại khi startDate hoặc endDate thay đổi

  useEffect(() => {
    if (productData.length > 0) {
      drawChart();
    }
  }, [productData]);

  const drawChart = () => {
    // Xóa biểu đồ cũ
    d3.select('#pie-chart').selectAll('*').remove();

    // Tổng số sản phẩm bán ra
    const totalAmount = productData.reduce((sum, product) => sum + product.amount, 0);

    // Cấu hình kích thước
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    // Tạo SVG container
    const svg = d3
      .select('#pie-chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    // Tạo pie và arc generator
    const pie = d3
      .pie()
      .value(d => d.amount)
      .sort(null);

    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const colorScale = d3
      .scaleOrdinal()
      .domain(productData.map(d => d.name))
      .range(d3.schemeCategory10);

    // Vẽ các phần của biểu đồ
    const arcs = svg.selectAll('.arc').data(pie(productData)).enter().append('g').attr('class', 'arc');

    arcs
      .append('path')
      .attr('d', arc)
      .attr('fill', d => colorScale(d.data.name));

    // Thêm phần trăm và tên sản phẩm vào biểu đồ
    arcs
      .append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('dy', '0.35em')
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .text(d => `${d.data.name} (${((d.data.amount / totalAmount) * 100).toFixed(1)}%)`);

    // Thêm legend (chú thích) bên phải biểu đồ
    const legend = d3
      .select('#legend')
      .append('div')
      .style('padding', '10px')
      .style('background-color', '#f9f9f9')
      .style('border-left', '2px solid #ddd')
      .style('width', '200px');

    productData.forEach((product) => {
      legend
        .append('div')
        .style('display', 'flex')
        .style('align-items', 'center')
        .style('margin-bottom', '5px')
        .append('div')
        .style('width', '20px')
        .style('height', '20px')
        .style('background-color', colorScale(product.name))
        .style('margin-right', '10px')
        .style('border-radius', '3px');
      legend
        .append('span')
        .style('font-size', '12px')
        .text(`${product.name} (${((product.amount / totalAmount) * 100).toFixed(1)}%)`);
    });
  };

  return (
    <div className="pie-chart-container">
      <h3>Biểu đồ tỉ lệ bán ra của sản phẩm từ ngày {startDate} đến {endDate}</h3>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <div id="pie-chart"></div>
      <div id="legend"></div>
    </div>
  );
};

export default ProductSalesPieChart;