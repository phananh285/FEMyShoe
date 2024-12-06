import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Card from '../../components/Card/MainCard.jsx';
import CategoryManagement from '../../components/CategoryManagement/CategoryManagement.jsx'
const SamplePage = () => {
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card title="Quản lý danh mục" isOption>
           
            <CategoryManagement/>
            <p>
              
            </p>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default SamplePage;
