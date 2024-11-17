import React from 'react';
import Card from '../../components/Card/MainCard';
import LineChart from '../charts/nvd3-chart/chart/LineChart';

const XuHuong = () => {
  return (
    <Card sx={{ p: 3 }}>
      <LineChart />
    </Card>
  );
};

export default XuHuong;
