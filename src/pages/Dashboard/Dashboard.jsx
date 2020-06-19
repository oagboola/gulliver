import React, {useState, useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import NoteList from '../../components/NoteList/NoteList'
import NoteEditor from '../../components/NoteEditor/NoteEditor';
import notesApi from '../../utils/notesApi'

const Dashboard = () => {
  const [notes, setNotes] = useState({});
  const [currNote, setCurrNote] = useState({});
  useEffect(() => {
    notesApi
      .list()
        .then(notes => {
          setNotes(notes.val())
        })
        .catch(err => alert(err));
  }, [notes]);

  const updateCurrNote = (selectedNote) => {
    setCurrNote(selectedNote);
  }

  return (
     <>
       <Container fluid style={{height:'calc(100% - 58px)'}}>
         <Row style={{height: '100%'}}>
           <Col xs={2} style={{border:'1px solid black'}}>
             <NoteList notes={notes} updater={updateCurrNote}/>
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
