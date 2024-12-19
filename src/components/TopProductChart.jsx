import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

const TopProductsMultiLineChart = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        // Gọi API để lấy dữ liệu bán hàng của các sản phẩm
        const response = await axios.get('/api/top-products-sales'); // Thay đổi URL này theo API của bạn
        setProductData(response.data); // Dữ liệu trả về dạng: [{ name: 'Product A', sales: [{ date: '2024-01', amount: 100 }, ...] }, ...]
      } catch (error) {
        console.error('Error fetching product sales data:', error);
        // Mock data để test
        setProductData([
          {
            name: 'Sản phẩm A',
            sales: [
              { date: '2024-01', amount: 100 },
              { date: '2024-02', amount: 120 },
              { date: '2024-03', amount: 150 },
            ],
          },
          {
            name: 'Sản phẩm B',
            sales: [
              { date: '2024-01', amount: 200 },
              { date: '2024-02', amount: 180 },
              { date: '2024-03', amount: 220 },
            ],
          },
          {
            name: 'Sản phẩm C',
            sales: [
              { date: '2024-01', amount: 90 },
              { date: '2024-02', amount: 110 },
              { date: '2024-03', amount: 100 },
            ],
          },
          {
            name: 'Sản phẩm D',
            sales: [
              { date: '2024-01', amount: 300 },
              { date: '2024-02', amount: 280 },
              { date: '2024-03', amount: 310 },
            ],
          },
          {
            name: 'Sản phẩm E',
            sales: [
              { date: '2024-01', amount: 50 },
              { date: '2024-02', amount: 70 },
              { date: '2024-03', amount: 60 },
            ],
          },
          {
            name: 'Sản phẩm R',
            sales: [
              { date: '2024-01', amount: 5 },
              { date: '2024-02', amount: 20 },
              { date: '2024-03', amount: 10 },
            ],
          },
        ]);
      }
    };

    fetchProductData();
  }, []);

  useEffect(() => {
    if (productData.length > 0) {
      drawChart();
    }
  }, [productData]);

  const drawChart = () => {
    // Xóa biểu đồ cũ
    d3.select('#multi-line-chart').selectAll('*').remove();
  
    // Cấu hình kích thước
    const margin = { top: 20, right: 30, bottom: 70, left: 70 };
    const width = 1100 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
  
    // Tạo SVG container
    const svg = d3
      .select('#multi-line-chart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
  
    // Chuẩn hóa dữ liệu
    const allDates = Array.from(
      new Set(productData.flatMap(product => product.sales.map(sale => sale.date)))
    );
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
  
    // X Scale
    const xScale = d3.scalePoint().domain(allDates).range([0, width]).padding(0.5);
  
    // Y Scale
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(productData, product => d3.max(product.sales, sale => sale.amount))])
      .range([height, 0])
      .nice();
  
    // Vẽ trục X
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');
  
    // Vẽ trục Y
    svg
      .append('g')
      .call(d3.axisLeft(yScale).tickFormat(d => d.toLocaleString('vi-VN')))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -50)
      .attr('x', -height / 2)
      .attr('fill', 'black')
      .attr('text-anchor', 'middle')
      .text('Số lượng bán ra');
  
    // Vẽ đường cho từng sản phẩm
    const line = d3
      .line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.amount));
  
    productData.forEach((product, index) => {
      svg
        .append('path')
        .datum(product.sales)
        .attr('fill', 'none')
        .attr('stroke', colorScale(product.name))
        .attr('stroke-width', 2)
        .attr('d', line);
  
      // Vẽ chấm tròn cho từng điểm dữ liệu
      svg
        .selectAll(`.dot-${index}`)
        .data(product.sales)
        .enter()
        .append('circle')
        .attr('class', `dot-${index}`)
        .attr('cx', d => xScale(d.date))
        .attr('cy', d => yScale(d.amount))
        .attr('r', 4)
        .attr('fill', colorScale(product.name));
  
      // Thêm chú thích
      svg
        .append('text')
        .attr('x', width-100) // Đặt khoảng cách
        .attr('y', 20 * index)
        .attr('fill', colorScale(product.name))
        .text(product.name);
    });
  };
  

  return (
    <div className="multi-line-chart-container">
      <h3>Biểu đồ bán hàng của 5 sản phẩm hàng đầu</h3>
      <div id="multi-line-chart"></div>
    </div>
  );
};

export default TopProductsMultiLineChart;
