import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import entriesApi from '../../utils/notesApi';

const NoteEditor = () => {
  const [entry, setEntry] = React.useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    entriesApi.create({title: 'Trip to Texas', entry})
  };
  const handleChange = (e) => {
    setEntry(e.target.value)
  };
  return <Form onSubmit={(e) => handleSubmit(e)}>
    <Form.Group>
      <Form.Label>Put in your Entry</Form.Label>
      <Form.Control as="textarea" value={entry} onChange={(e) => handleChange(e)}/>
    </Form.Group>
    <Button type="submit">Submit</Button>
  </Form>
}

export default NoteEditor
