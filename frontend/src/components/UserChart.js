import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import axios from 'axios';

const PieChartExample = ({userInfo}) => {

  const [data, setData] = useState([]);
  const fetchData = async (userInfo) => {
    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
    }
    const customersResponse = await axios.get('/api/users/user-chart', config);
    console.log(customersResponse);
    setData(customersResponse.data)
  }

  useEffect(()=>{
    fetchData(userInfo);
  }, [userInfo])
  // const data = [
  //   { name: 'Total Users', value: 1000 },
  //   { name: 'Active Users', value: 800 }
  // ];

  // Colors for the pie chart segments
  const COLORS = ['#0088FE', '#00C49F'];

  return (
    <div>
      <h2>User Statistics</h2>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default PieChartExample;
