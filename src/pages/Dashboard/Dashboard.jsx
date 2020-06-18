import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import NoteList from '../../components/NoteList/NoteList'
import NoteEditor from '../../components/NoteEditor/NoteEditor'

const Dashboard = () => {

  return (
     <>
       <Container fluid style={{height:'calc(100% - 58px)'}}>
         <Row style={{height: '100%'}}>
           <Col xs={2} style={{border:'1px solid black'}}>
             <NoteList />
           </Col>
           <Col xs={10}  style={{border:''}}>
             <NoteEditor />
           </Col>
         </Row>
       </Container>
     </>
  )
}

export default Dashboard;
