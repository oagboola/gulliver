import React, {useState, useEffect} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

const NoteList = ({notes, updater}) => {

  const displayNote = (selectedNote) => {
    updater(selectedNote);
  }

  return (
   <>
     {!Object.keys(notes).length ?
       <p>Loading...</p> :
       <ListGroup>
         {Object.values(notes).map(note => (
            <ListGroup.Item key={note.id} variant="flush" style={{padding:0}} onClick={() => displayNote(note)}>
              <p>{note.title}</p>
              <p>{note.date}</p>
            </ListGroup.Item>
         ))}
       </ListGroup>}
   </>
  );
}

export default NoteList;
