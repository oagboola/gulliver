import React, { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import EntriesApi from '../../apis/entriesApi';
import { FirebaseContext } from '../Firebase';


const NoteEditor = ({currentNote, setCurrentNote}) => {
  const firebase = useContext(FirebaseContext);
  const entriesApi = new EntriesApi(firebase);

  const handleSubmit = (e) => {
    e.preventDefault();
    entriesApi.createOrUpdate(currentNote)
  };
  const handleChange = (e, field) => {
    let entry = {...currentNote};
    entry[field] = e.target.value
    setCurrentNote(entry)
  };

  return <Form onSubmit={(e) => handleSubmit(e)}>
    <Form.Group>
      <Form.Label>Note title:</Form.Label>
      <Form.Control type="text" value={currentNote.title} onChange={(e) => handleChange(e, 'title')}/>
    </Form.Group>
    <Form.Group>
      <Form.Label>Put in your Entry</Form.Label>
      <Form.Control as="textarea" value={currentNote.content} onChange={(e) => handleChange(e, 'content')}/>
    </Form.Group>
    <Button type="submit">Submit</Button>
  </Form>
}

export default NoteEditor
