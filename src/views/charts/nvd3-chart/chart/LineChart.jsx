import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

const LineChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // TODO: Replace this with actual API call
    // API should return data in format:
    // [
    //   {
    //     date: "2023-01", // Format: YYYY-MM
    //     quantitySold: 150
    //   },
    //   ...
    // ]
    
    // Example API call:
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch('/api/sales/trends');
    //     const jsonData = await response.json();
    //     setData(jsonData);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };
    // fetchData();

    // Mock data for testing
    const mockData = [
      { date: '2023-01', quantitySold: 150 },
      { date: '2023-02', quantitySold: 230 },
      { date: '2023-03', quantitySold: 180 },
      { date: '2023-04', quantitySold: 290 },
      { date: '2023-05', quantitySold: 320 },
      { date: '2023-06', quantitySold: 270 }
    ];
    setData(mockData);
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      drawChart();
    }
  }, [data]);

  const drawChart = () => {
    // Clear previous chart
    d3.select('#trend-chart').selectAll('*').remove();

    const isSmallScreen = window.matchMedia('(max-width: 1024px)').matches;
    const margin = { top: 20, right: 30, bottom: 50, left: 60 };
    const width = (isSmallScreen ? 300 : 600) - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create SVG container
    const svg = d3
      .select('#trend-chart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Set up scales
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, d => new Date(d.date)))
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.quantitySold)])
      .range([height, 0])
      .nice();

    // Create line generator
    const line = d3
      .line()
      .x(d => xScale(new Date(d.date)))
      .y(d => yScale(d.quantitySold))
      .curve(d3.curveMonotoneX);

    // Add X axis
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat('%Y-%m')))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-45)');

    // Add Y axis
    svg
      .append('g')
      .call(d3.axisLeft(yScale));

    // Add Y axis label
    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - height / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Số lượng đã bán');

    // Add the line path
    svg
      .append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('stroke', '#04a9f5')
      .attr('stroke-width', 2)
      .attr('d', line);

    // Add dots
    svg
      .selectAll('.dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', d => xScale(new Date(d.date)))
      .attr('cy', d => yScale(d.quantitySold))
      .attr('r', 5)
      .attr('fill', '#04a9f5')
      .on('mouseover', function(event, d) {
        // Show tooltip
        const tooltip = d3.select('#tooltip');
        tooltip
          .style('opacity', 1)
          .html(`Thời gian: ${d.date}<br/>Số lượng: ${d.quantitySold}`)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 10) + 'px');
      })
      .on('mouseout', function() {
        // Hide tooltip
        d3.select('#tooltip').style('opacity', 0);
      });
  };

  return (
    <div>
      <div id="trend-chart"></div>
      <div
        id="tooltip"
        style={{
          position: 'absolute',
          opacity: 0,
          backgroundColor: 'white',
          padding: '8px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          pointerEvents: 'none'
        }}
      ></div>
    </div>
  );
};

export default LineChart;
