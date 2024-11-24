import React from 'react';
import { Row, Col } from 'react-bootstrap';
import UserPage from '../../components/UserManagement/UserManagement.jsx';
import Card from '../../components/Card/MainCard.jsx';

const SamplePage = () => {
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card title="Quản lý người dùng" isOption>
           
            <UserPage/>
            <p>
              
            </p>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default SamplePage;
