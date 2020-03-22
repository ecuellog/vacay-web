import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SideBar from '../SideBar/SideBar';

function SideBarViewContainer(props) {
  return (
    <Container fluid>
      <Row>
        <Col xs="2">
          <SideBar></SideBar>
        </Col>
        <Col>
          {props.children}
        </Col>
      </Row>
    </Container>
  );
}

export default SideBarViewContainer;