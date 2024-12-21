import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, DatePicker, Select, Space } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { Line } from '@ant-design/plots';
import server from 'constant/linkapi';
const { RangePicker } = DatePicker;
const RevenueChart = (revenueData3) => {
  const [frequency, setFrequency] = useState("MONTH");
  const [statisticOption, setStatisticOption] = useState("revenue");
  const [date, setDate] = useState([dayjs('2024-01-01'), dayjs('2024-12-31')]);
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  useEffect(() => {
    let linkAPI = server + `${statisticOption == "revenue" ? "/payment/statistic/revenue" : "/order/statistic/sold"}?from=${date[0].startOf(frequency.toLowerCase()).valueOf()}&to=${date[1].endOf(frequency.toLowerCase()).valueOf()}&frequency=${frequency}`;
    const callAPI = async () => {
      const response = await axios.get(linkAPI);
      const dataResponse = response.data.data.data;
      setData(dataResponse)
      console.log(response.data.data.data);

    }
    callAPI();
  }, [load])
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
      <Button type='primary' onClick={() => setLoad(!load)}>Thống kê</Button>
    </Space>
    {data.length == 0 ? <div style={{ padding: "20px 0" }}>Không có dữ liệu</div> : <Line {...config} />}
  </>
};

export default RevenueChart;
