import React from 'react';
import { Row, Col } from 'antd';

const FormContainer = ({ children }) => {
  return (
    <div className="container mx-auto">
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12} xl={8}>
          {children}
        </Col>
      </Row>
    </div>
  );
};

export default FormContainer;
