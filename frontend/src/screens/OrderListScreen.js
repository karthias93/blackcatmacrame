import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'antd';
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

