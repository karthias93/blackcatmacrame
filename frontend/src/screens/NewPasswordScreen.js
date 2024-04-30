import React, { useState, useEffect } from 'react';
import { Form, Button, message as antMessage } from 'antd';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { updatePassword } from '../actions/userActions';

const NewPasswordScreen = ({ history, match }) => {
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const userUpdatePassword = useSelector((state) => state.userUpdatePassword);
    const { loading, message } = userUpdatePassword;

    const submitHandler = (e) => {
        e.preventDefault();
        if (password) {
            dispatch(updatePassword(password, match.params.id));
        } else {
            antMessage.error('Please insert your password');
        }
    };

    useEffect(() => {
        if (message?.data.message) {
            antMessage[message.data.success ? 'success' : 'error'](message.data.message);
            if (message.data.success) {
                history.push('/login');
            }
        }
    }, [message, history]);

    return (
        <FormContainer>
            <h1 className="text-3xl mb-8">New Password</h1>
            {loading && <Loader />}
            <Form layout="vertical" onSubmit={submitHandler}>
                <Form.Item label="New Password">
                    <input
                        className="w-full p-3 border rounded"
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Item>
                <Button type="primary" htmlType="submit" className="w-full">
                    Update Password
                </Button>
            </Form>
        </FormContainer>
    );
};

export default NewPasswordScreen;
