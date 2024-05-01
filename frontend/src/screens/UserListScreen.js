import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listUsers, deleteUser } from "../actions/userActions";
import Avatar from "../components/Avatar";

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, successDelete, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteUser(id));
      message.success("User deleted successfully");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "AVATAR",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar) => <Avatar url={avatar} size="40px" />,
    },
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
      render: (email) => <a href={`mailto:${email}`}>{email}</a>,
    },
    {
      title: "ADMIN",
      dataIndex: "isAdmin",
      key: "isAdmin",
      render: (isAdmin) => (
        <i
          className={`fas ${isAdmin ? "fa-check" : "fa-times"}`}
          style={{ color: isAdmin ? "green" : "red" }}
        ></i>
      ),
    },
    {
      title: "",
      key: "action",
      render: (_, user) => (
        <>
          <Link to={`/admin/user/${user._id}/edit`}>
            <Button type="link" className="text-blue-500 mr-2">
              <i className="fas fa-edit"></i>
            </Button>
          </Link>
          <Button
            type="link"
            className="text-red-500"
            onClick={() => deleteHandler(user._id)}
          >
            <i className="fas fa-trash"></i>
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <h1 className="text-2xl mb-4">Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table
          columns={columns}
          dataSource={users}
          rowKey={(record) => record._id}
          bordered
          pagination={false}
        />
      )}
    </>
  );
};

export default UserListScreen;

