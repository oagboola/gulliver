import React, {useState, useEffect, useContext} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import NoteList from '../../components/NoteList/NoteList'
import NoteEditor from '../../components/NoteEditor/NoteEditor';
import EntriesApi from '../../apis/entriesApi';
import { FirebaseContext } from '../../components/Firebase';

const Dashboard = () => {
  const firebase = useContext(FirebaseContext);
  const [notes, setNotes] = useState({});
  const [currNote, setCurrNote] = useState({});
  const entriesApi = new EntriesApi(firebase);

  useEffect(() => {
    console.log('something happened here')
    entriesApi.entries().on('value', (snapshot) => {
      setNotes(snapshot.val())
    })
  }, []);

  const updateCurrNote = (selectedNote) => {
    setCurrNote(selectedNote);
  }

  return (
     <>
       <Container fluid style={{height:'calc(100% - 58px)'}}>
         <Row style={{height: '100%'}}>
           <Col xs={2} style={{border:'1px solid black'}}>
             <NoteList notes={notes} updateDisplayedNote={updateCurrNote}/>
           </Col>
           <Col xs={10}  style={{border:''}}>
             <NoteEditor currNote={currNote} setCurrNote={setCurrNote}/>
           </Col>
         </Row>
       </Container>
     </>
  )
}

export default Dashboard;
