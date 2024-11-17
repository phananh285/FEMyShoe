import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Sidebar from '../../components/SideBar';
import ProductsPage from '../../components/DeUser';
import Card from '../../components/Card/MainCard';

const SamplePage = () => {
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card title="Xóa người dùng" isOption>
           
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
