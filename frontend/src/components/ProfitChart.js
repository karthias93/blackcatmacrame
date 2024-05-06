import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const LineChartExample = ({userInfo}) => {
    const [data, setData] = useState([]);
  const fetchData = async (userInfo) => {
    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
    }
    const customersResponse = await axios.get('/api/orders/chart-data', config);
    console.log(customersResponse);
    setData(customersResponse.data)
  }

  useEffect(()=>{
    fetchData(userInfo);
  }, [userInfo])

  return (
    <div>
      <h2>Profits</h2>
      <LineChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="_id" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="total" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default LineChartExample;
