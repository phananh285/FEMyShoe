import React from 'react';
import { Row, Col } from 'react-bootstrap';
import UserPage from '../../components/CheckOrder/OrderManagement';
import Card from '../../components/Card/MainCard.jsx';

const SamplePage = () => {
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card title="OrderCheck" isOption>
           
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
