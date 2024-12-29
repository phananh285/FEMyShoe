import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, DatePicker, Select, Space, Table } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { Line } from '@ant-design/plots';
import server from 'constant/linkapi';
import fetchAPI from 'views/auth/config/axiosConfig';
const { RangePicker } = DatePicker;
const RevenueChart = (revenueData3) => {
  const [frequency, setFrequency] = useState("MONTH");
  const [statisticOption, setStatisticOption] = useState("revenue");
  const [date, setDate] = useState([dayjs('2024-01-01'), dayjs('2024-12-31')]);
  const [data, setData] = useState([]);
  const [productVariants, setProductVariants] = useState([]);
  const [load, setLoad] = useState(true);
  const [Top, setTop] = useState(5);
  useEffect(() => {
    let linkAPI = server + `${statisticOption == "revenue" ? "/payment/statistic/revenue" : "/order/statistic/sold"}?from=${date[0].startOf(frequency.toLowerCase()).valueOf()}&to=${date[1].endOf(frequency.toLowerCase()).valueOf()}&frequency=${frequency}`;
    const callAPI = async () => {
      const productVariantsResponse = await fetchAPI.get(server + `/order/statistic/best-sales?from=${date[0].startOf(frequency.toLowerCase()).valueOf()}&to=${date[1].endOf(frequency.toLowerCase()).valueOf()}&top=${Top}`);
   
      setProductVariants(productVariantsResponse);
      console.log("Thong ke data: ",productVariantsResponse);
      // console.log("top 5 sp:", productVariantsResponse.data)
      const response = await fetchAPI.get(linkAPI);
      const dataResponse = response.data;
      setData(dataResponse)
      // console.log("Thong ke data: ",dataResponse)
    }
    callAPI();
  }, [load])
  // console.log(productVariants);

  const frequencyOption = [
    {
      label: "Tháng",
      value: "MONTH"
    },
    {
      label: "Ngày",
      value: "DAY"
    },
    {
      label: "Năm",
      value: "YEAR"
    }
  ]
  const statisticOptions = [
    {
      label: "Doanh Thu",
      value: "revenue"
    },
    {
      label: "Số lượng bán ra",
      value: "sold"
    }
  ]
  const Tops = [
    {
      label: "5",
      value: 5
    },
    {
      label: "10",
      value: 10
    },
    {
      label: "20",
      value: 20
    }
  ]
  const handleChangeFrequency = (e) => {
    setFrequency(e);
  }
  const handleCalendarChange = (dates, dateStrings, info) => {
    setDate(dates);
  }
  const config = {
    data,
    xField: 'label',
    yField: 'value',

    interaction: {
      tooltip: {
        render: (e, { title, items }) => {
          return (
            <div key={title}>
              <h6>{title}</h6>
              {items.map((item) => {
                const { name, value, color } = item;
                return <>{statisticOption == "revenue" ? `Doanh Thu: ${value.toLocaleString()} vnđ` : "Số lượng bán ra: " + value}</>
              })}
            </div>
          );
        },
      },
    },
    legend: false,
    style: {
      lineWidth: 2,
    },
  };
  return <>
    <Space align='end' size={'large'}>
      <Space direction='vertical'>
        Chọn thời gian:
        <RangePicker defaultValue={date} onCalendarChange={handleCalendarChange} picker={frequency.toLowerCase()} />
      </Space>
      <Space direction='vertical'>
        Chọn Tần suất:
        <Select
          style={{ width: 120 }}
          defaultValue={frequency}
          onChange={handleChangeFrequency}
          options={frequencyOption}
        />
      </Space>
      <Space direction='vertical'>
        Chọn thống kê theo:
        <Select
          style={{ width: 200 }}
          defaultValue={statisticOption}
          onChange={(e) => setStatisticOption(e)}
          options={statisticOptions}
        />
      </Space>
      <Space direction='vertical'>
      Chọn thống kê theo top:
        <Select
          style={{ width: 200 }}
          defaultValue={Tops}
          onChange={(e) => setTop(e)}
          options={Tops}
        />
      </Space>
    
      <Button type='primary' onClick={() => setLoad(!load)}>Thống kê</Button>
    </Space>
    {data.length == 0 ? <div style={{ padding: "20px 0" }}>Không có dữ liệu</div> : <Line {...config} />}
    <br/>

    <h5>Top {Top} Sản phẩm bán chạy nhất</h5>

    <table className="bordered table">
      <thead>
        <tr>
          <th>Số thứ tự</th>
          <th className='text'>Mã sản phẩm</th>
          <th className='text'>Tên sản phẩm</th>
          <th>Giá</th>
      
          <th>Số lượng bán ra</th>
        </tr>
      </thead>
      <tbody>
        {/* {productVariants?.map((item, index) => {
          return (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.id}</td>
              <td>{item.name}</td>
   
              <td>{item.price.toLocaleString() + " đ"}</td>
      
              <td>{item.sold}</td>
            </tr>
          );
        })} */}
    {Array.from(Array(Top).keys()).map((index) => {
          const item = productVariants[index];
          return (
            <tr key={item?.id}>
              <td>{index + 1}</td>
              <td>{item?.id}</td>
              <td>{item?.name}</td>
   
              <td>{item&&item?.price.toLocaleString() + " đ"}</td>
      
              <td>{item?.sold}</td>
            </tr>
          );
        })} 
      </tbody>
    </table>

  </>
};

export default RevenueChart;
