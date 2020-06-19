import React, {useState, useEffect} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import notesApi from '../../utils/notesApi';

const NoteList = ({notes, updater}) => {

  const displayNote = (selectedNote) => {
    updater(selectedNote);
  }

  const handleClick = (selection) => {
    notesApi.delete(selection.id);
  }

  return (
   <>
     {!Object.keys(notes).length ?
       <p>Loading...</p> :
       <ListGroup>
         {Object.values(notes).map(note => (
            <ListGroup.Item key={note.id} variant="flush" style={{padding:0}}>
              <div onClick={() => displayNote(note)}>
                <p>{note.title}</p>
                <p>{note.date}</p>
              </div>
              <Button type="button" onClick={(e) => handleClick(note)}>Delete</Button>
            </ListGroup.Item>
         ))}
       </ListGroup>}
   </>
  );
}

export default NoteList;
