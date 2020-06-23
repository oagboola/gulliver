import React, {useState, useEffect} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import EntriesApi from '../../apis/entriesApi';

const NoteList = ({notes, updateDisplayedNote}) => {

  const displayNote = (selectedNote) => {
    updateDisplayedNote(selectedNote);
  }

  const handleClick = (selection) => {
    EntriesApi.delete(selection.id);
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
