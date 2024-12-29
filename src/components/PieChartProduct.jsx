import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

const ParetoChart = () => {
  const [productData, setProductData] = useState([]);
  const [startDate, setStartDate] = useState('2023-10-01');
  const [endDate, setEndDate] = useState('2023-10-31');

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get('/api/product-sales', {
          params: { startDate, endDate },
        });
        setProductData(response.data);
      } catch (error) {
        console.error('Error fetching product sales data:', error);
        // Mock data
        setProductData([
          { name: 'Sản phẩm A', amount: 500 },
          { name: 'Sản phẩm B', amount: 300 },
          { name: 'Sản phẩm C', amount: 200 },
          { name: 'Sản phẩm D', amount: 400 },
          { name: 'Sản phẩm E', amount: 10 },
          { name: 'Sản phẩm G', amount: 50 },
        ]);
      }
    };

    fetchProductData();
  }, [startDate, endDate]);

  useEffect(() => {
    if (productData.length > 0) {
      drawParetoChart();
    }
  }, [productData]);

  const drawParetoChart = () => {
    // Lọc top 5 sản phẩm
    const sortedData = [...productData]
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);

    // Tính tỷ lệ tích lũy (%)
    const totalAmount = sortedData.reduce((sum, product) => sum + product.amount, 0);
    let cumulativeAmount = 0;
    const paretoData = sortedData.map((product) => {
      cumulativeAmount += product.amount;
      return {
        ...product,
        cumulativePercentage: (cumulativeAmount / totalAmount) * 100,
      };
    });

    // Xóa biểu đồ cũ
    d3.select('#pareto-chart').selectAll('*').remove();

    // Cấu hình kích thước
    const width = 600;
    const height = 400;
    const margin = { top: 40, right: 60, bottom: 40, left: 50 };

    const svg = d3
      .select('#pareto-chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const chart = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Scales
    const xScale = d3
      .scaleBand()
      .domain(sortedData.map((d) => d.name))
      .range([0, chartWidth])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, totalAmount])
      .range([chartHeight, 0]);

    const y2Scale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([chartHeight, 0]);

    // Bars
    chart
      .selectAll('.bar')
      .data(sortedData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d.name))
      .attr('y', (d) => yScale(d.amount))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => chartHeight - yScale(d.amount))
      .attr('fill', 'steelblue');

    // Line
    const line = d3
      .line()
      .x((d) => xScale(d.name) + xScale.bandwidth() / 2)
      .y((d) => y2Scale(d.cumulativePercentage));

    chart
      .append('path')
      .datum(paretoData)
      .attr('class', 'line')
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', 'orange')
      .attr('stroke-width', 2);

    // Axis
    chart.append('g').call(d3.axisLeft(yScale));
    chart
      .append('g')
      .call(d3.axisRight(y2Scale).tickFormat((d) => `${d}%`))
      .attr('transform', `translate(${chartWidth}, 0)`);

    chart
      .append('g')
      .attr('transform', `translate(0, ${chartHeight})`)
      .call(d3.axisBottom(xScale));
  };

  return (
    <div className="pareto-chart-container">
      <h3>Biểu đồ Pareto: Top 5 sản phẩm bán chạy</h3>
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
      <div id="pareto-chart"></div>
    </div>
  );
};

export default ParetoChart;
