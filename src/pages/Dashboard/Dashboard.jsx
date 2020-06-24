import React, {useState, useEffect, useContext} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import NoteList from '../../components/NoteList/NoteList'
import NoteEditor from '../../components/NoteEditor/NoteEditor';
import Map from '../../components/Map/Map';
import EntriesApi from '../../apis/entriesApi';
import { FirebaseContext } from '../../components/Firebase';

const Dashboard = () => {
  const firebase = useContext(FirebaseContext);
  const [notes, setNotes] = useState({});
  const [currentNote, setCurrentNote] = useState({});
  const entriesApi = new EntriesApi(firebase);

  useEffect(() => {
    entriesApi.entries().on('value', (snapshot) => {
      setNotes(snapshot.val())
    })
  }, []);

  const updateCurrNote = (selectedNote) => {
    setCurrentNote(selectedNote);
  }

  return (
     <>
       <Container fluid style={{height:'calc(100% - 58px)'}}>
         <Row style={{height: '100%'}}>
           <Col xs={2} style={{border:'1px solid black'}}>
             <NoteList notes={notes} updateDisplayedNote={updateCurrNote}/>
           </Col>
           <Col xs={10}  style={{border:''}}>
             <Tabs defaultActiveKey="note">
               <Tab eventKey="note" title="Note">
                 <NoteEditor currentNote={currentNote} setCurrentNote={setCurrentNote}/>
               </Tab>
               <Tab eventKey="map" title="Map">
                 <Map />
               </Tab>
             </Tabs>
           </Col>
         </Row>
       </Container>
     </>
  )
}

export default Dashboard;
