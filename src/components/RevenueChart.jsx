import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

const RevenueChart = (revenueData3) => {
  // State để lưu trữ dữ liệu từ backend
  const [revenueData, setRevenueData] = useState([]);
 

  /*useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        // Gọi API để lấy dữ liệu từ backend
        const response = await axios.get('/api/revenue'); // Thay đổi URL này theo API của bạn
        setRevenueData(response.data); // Giả sử dữ liệu trả về có dạng [{ date: '2024-01', revenue: 50000000 }, ...]
      } catch (error) {
        console.error('Error fetching revenue data:', error);
      }
    };

    fetchRevenueData(); // Gọi hàm fetchRevenueData
  }, []);*/
  useEffect(() => {
    const fetchRevenueData = async()=>{
      try{
        const respone = await axios.get('api');
        setRevenueData(response.data); 
      } catch(error){
        console.error('Error fetching data revenue',error);
      }
    };
    fetchRevenueData();
    // TODO: Gọi API để lấy dữ liệu từ backend
    // Ví dụ cấu trúc data từ backend:
    // {
    //   date: "2024-01",
    //   revenue: 50000000
    // }
    
    // Mock data cho testing
    const mockData = [
      { date: '2024-01', revenue: 50000000 },
      { date: '2024-02', revenue: 65000000 },
      { date: '2024-03', revenue: 75000000 }
    ];
    
    setRevenueData(mockData);
  }, []);

  useEffect(() => {
    if (revenueData.length > 0) {
      drawChart();
    }
  }, [revenueData]);

  const drawChart = () => {
    // Xóa chart cũ nếu có
    d3.select('#revenue-chart').selectAll('*').remove();

    // Cấu hình kích thước
    const margin = { top: 20, right: 30, bottom: 50, left: 70 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Tạo SVG container
    const svg = d3
      .select('#revenue-chart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Định dạng scales
    const xScale = d3
      .scalePoint()
      .domain(revenueData.map(d => d.date))
      .range([0, width])
      .padding(0.5);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(revenueData, d => d.revenue)])
      .range([height, 0])
      .nice();

    // Tạo line generator
    const line = d3
      .line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.revenue));

    // Vẽ line
    svg
      .append('path')
      .datum(revenueData)
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('stroke', '#04a9f5')
      .attr('stroke-width', 2)
      .attr('d', line);

    // Vẽ dots
    svg
      .selectAll('.dot')
      .data(revenueData)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', d => xScale(d.date))
      .attr('cy', d => yScale(d.revenue))
      .attr('r', 5)
      .attr('fill', '#04a9f5');

    // Thêm tooltip
    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('background-color', 'white')
      .style('padding', '5px')
      .style('border', '1px solid #ddd')
      .style('border-radius', '3px')
      .style('opacity', 0);

    svg
      .selectAll('.dot')
      .on('mouseover', (event, d) => {
        tooltip
          .transition()
          .duration(200)
          .style('opacity', 0.9);
        tooltip
          .html(
            `Tháng: ${d.date}<br/>Doanh thu: ${d.revenue.toLocaleString('vi-VN')} VNĐ`
          )
          .style('left', event.pageX + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', () => {
        tooltip
          .transition()
          .duration(500)
          .style('opacity', 0);
      });

    // Thêm trục X
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .append('text')
      .attr('x', width / 2)
      .attr('y', 40)
      .attr('fill', 'black')
      .attr('text-anchor', 'middle')
      .text('Tháng');

    // Thêm trục Y
    svg
      .append('g')
      .call(d3.axisLeft(yScale)
        .tickFormat(d => d.toLocaleString('vi-VN')))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -60)
      .attr('x', -height / 2)
      .attr('fill', 'black')
      .attr('text-anchor', 'middle')
      .text('Doanh thu (VNĐ)');
  };

  return (
    <div className="revenue-chart-container">
      <h2>Thống kê doanh thu 3 tháng gần nhất</h2>
      <div id="revenue-chart"></div>
    </div>
  );
};

export default RevenueChart;
