import React, {useState, useEffect} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import notesApi from '../../utils/notesApi'

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [noteList, setNoteList] = useState([]);
  useEffect(() => {
    notesApi
      .list()
        .then(notes => setNotes(notes.val()))
        .catch(err => alert(err));
  }, []);

  for(const note in notes) {
    noteList.push(
      <ListGroup.Item key={notes[note].id} variant="flush" style={{padding:0}}}>
        <p>{notes[note].title}</p>
        <p>{notes[note].date}</p>
      </ListGroup.Item>
    );
  }
  return (
    <>
      {!noteList.length ? <p>Loading...</p> : <ListGroup>{noteList}</ListGroup> }
    </>
  );
}

export default NoteList;

