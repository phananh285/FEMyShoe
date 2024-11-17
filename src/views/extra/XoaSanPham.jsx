import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Sidebar from '../../components/SideBar';
import CategoryDelete from '../../components/CategoryDelete';
import Card from '../../components/Card/MainCard';

const SamplePage = () => {
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card title="Xóa Danh Mục" isOption>
           
            <CategoryDelete/>
            <p>
              
            </p>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default SamplePage;
