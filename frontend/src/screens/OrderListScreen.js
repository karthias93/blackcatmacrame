// import React, { useEffect } from 'react'
// import { LinkContainer } from 'react-router-bootstrap'
// import { Table, Button } from 'react-bootstrap'
// import { useDispatch, useSelector } from 'react-redux'
// import Message from '../components/Message'
// import Loader from '../components/Loader'
// import { listOrders } from '../actions/orderActions'

// const OrderListScreen = ({ history }) => {
//   const dispatch = useDispatch()

//   const orderList = useSelector((state) => state.orderList)
//   const { loading, error, orders } = orderList

//   const userLogin = useSelector((state) => state.userLogin)
//   const { userInfo } = userLogin

//   useEffect(() => {
//     if (userInfo && userInfo.isAdmin) {
//       dispatch(listOrders())
//     } else {
//       history.push('/login')
//     }
//   }, [dispatch, history, userInfo])

//   return (
//     <>
//       <h1>Orders</h1>
//       {loading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant='danger'>{error}</Message>
//       ) : (
//         <Table striped bordered hover responsive className='table-sm'>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>USER</th>
//               <th>DATE</th>
//               <th>TOTAL</th>
//               <th>PAID</th>
//               <th>DELIVERED</th>
//               <th></th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => (
//               <tr key={order._id}>
//                 <td>{order._id}</td>
//                 <td>{order.user && order.user.name}</td>
//                 <td>{order.createdAt.substring(0, 10)}</td>
//                 <td>${order.totalPrice}</td>
//                 <td>
//                   {order.isPaid ? (
//                     order.paidAt.substring(0, 10)
//                   ) : (
//                     <i className='fas fa-times' style={{ color: 'red' }}></i>
//                   )}
//                 </td>
//                 <td>
//                   {order.isDelivered ? (
//                     order.deliveredAt.substring(0, 10)
//                   ) : (
//                     <i className='fas fa-times' style={{ color: 'red' }}></i>
//                   )}
//                 </td>
//                 <td>
//                   <LinkContainer to={`/order/${order._id}`}>
//                     <Button variant='light' className='btn-sm'>
//                       Details
//                     </Button>
//                   </LinkContainer>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}
//     </>
//   )
// }

// export default OrderListScreen

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, message as antMessage } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listOrders } from '../actions/orderActions';

const OrderListScreen = ({ history }) => {
    const dispatch = useDispatch();

    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders } = orderList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders());
        } else {
            history.push('/login');
        }
    }, [dispatch, history, userInfo]);

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'USER',
            dataIndex: 'user.name',
            key: 'user.name',
        },
        {
            title: 'DATE',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => text.substring(0, 10),
        },
        {
            title: 'TOTAL',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (text) => `$${text}`,
        },
        {
            title: 'PAID',
            dataIndex: 'isPaid',
            key: 'isPaid',
            render: (isPaid, record) =>
                isPaid ? record.paidAt.substring(0, 10) : <i className='fas fa-times' style={{ color: 'red' }}></i>,
        },
        {
            title: 'DELIVERED',
            dataIndex: 'isDelivered',
            key: 'isDelivered',
            render: (isDelivered, record) =>
                isDelivered ? record.deliveredAt.substring(0, 10) : <i className='fas fa-times' style={{ color: 'red' }}></i>,
        },
        {
            title: '',
            dataIndex: '_id',
            key: 'actions',
            render: (orderId) => (
                <Link to={`/order/${orderId}`}>
                    <Button type='primary' size='small'>
                        Details
                    </Button>
                </Link>
            ),
        },
    ];

    return (
        <>
            <h1 className="text-3xl mb-8">Orders</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message type='error' message={error} />
            ) : (
                <Table columns={columns} dataSource={orders} rowKey='_id' bordered />
            )}
        </>
    );
};

export default OrderListScreen;

