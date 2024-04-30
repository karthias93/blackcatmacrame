import React, { useState } from 'react';
import { Form, Button, Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';

const PaymentScreen = ({ history }) => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    if (!shippingAddress.address) {
        history.push('/shipping');
    }

    const [, setPaymentMethod] = useState('PayPal');

    const dispatch = useDispatch();

    const submitHandler = (values) => {
        dispatch(savePaymentMethod(values.paymentMethod));
        history.push('/placeorder');
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1 className="text-3xl">Payment Method</h1>
            <Form layout="vertical" onFinish={submitHandler}>
                <Form.Item label="Select Method" name="paymentMethod" initialValue="PayPal">
                    <Radio.Group onChange={(e) => setPaymentMethod(e.target.value)}>
                        <Radio value="PayPal">Credit Card</Radio>
                        <Radio value="Stripe">Debit Card</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Continue
                    </Button>
                </Form.Item>
            </Form>
        </FormContainer>
    );
};

export default PaymentScreen;

