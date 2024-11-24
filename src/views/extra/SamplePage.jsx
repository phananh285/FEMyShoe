import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductsPage from '../../components/ProductManagement/ProductManagement.jsx';
import Card from '../../components/Card/MainCard';

const SamplePage = () => {
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card title="Quản lý sản phẩm" isOption>
           
            <ProductsPage/>
            <p>
              
            </p>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default SamplePage;
