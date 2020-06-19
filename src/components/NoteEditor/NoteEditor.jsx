import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import entriesApi from '../../utils/notesApi';

const NoteEditor = ({currNote, setCurrNote}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    entriesApi.create(currNote)
  };
  const handleChange = (e, field) => {
    let entry = {...currNote};
    entry[field] = e.target.value
    setCurrNote(entry)
  };
  return <Form onSubmit={(e) => handleSubmit(e)}>
    <Form.Group>
      <Form.Label>Note title:</Form.Label>
      <Form.Control type="text" value={currNote.title} onChange={(e) => handleChange(e, 'title')}/>
    </Form.Group>
    <Form.Group>
      <Form.Label>Put in your Entry</Form.Label>
      <Form.Control as="textarea" value={currNote.content} onChange={(e) => handleChange(e, 'content')}/>
    </Form.Group>
    <Button type="submit">Submit</Button>
  </Form>
}

export default NoteEditor
