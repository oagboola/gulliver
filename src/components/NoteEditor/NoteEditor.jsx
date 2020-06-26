import React, { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import EntriesApi from '../../apis/entriesApi';
import { FirebaseContext } from '../Firebase';


const NoteEditor = ({currentEntry, setCurrentEntry}) => {
  const firebase = useContext(FirebaseContext);
  const entriesApi = new EntriesApi(firebase);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('entry ==>', currentEntry)
    entriesApi.createOrUpdate(currentEntry)
  };
  const handleChange = (e) => {
    const target = e.target;
    let entry = {...currentEntry};
    entry[target.name] = target.value;
    setCurrentEntry(entry)
  };

  return (
    <>
      <Row>
        <Col xs={12} sm={6}>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Note title:</Form.Label>
                <Form.Control type="text" value={currentEntry.title || ''} name="title" placeholder="E.g: trip to Rome" onChange={(e) => handleChange(e)} />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" value={currentEntry.location || ''} name="location" onChange={(e) => handleChange(e)}/>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" value={currentEntry.date || ''} name="date" onChange={(e) => handleChange(e)}/>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Favourite thing about this trip:</Form.Label>
                <Form.Control as="textarea" value={currentEntry.favorite || ''} name="favorite" onChange={(e) => handleChange(e)}/>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Activies engaged in:</Form.Label>
                <Form.Control type="text" value={currentEntry.activities || ''} name="activities" placeholder="E.g: hiking, swimming" onChange={(e) => handleChange(e)}/>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Places visited: </Form.Label>
                <Form.Control type="text" value={currentEntry.placesVisited || ''} name="placesVisited" placeholder="E.g: restaurants, public facilities" onChange={(e) => handleChange(e)}/>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Trip Summary:</Form.Label>
                <Form.Control as="textarea" value={currentEntry.tripSummary || ''} name="tripSummary" onChange={(e) => handleChange(e)}/>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Advice to future tourists:</Form.Label>
                <Form.Control as="textarea" value={currentEntry.advice || ''} name="advice" onChange={(e) => handleChange(e)}/>
              </Form.Group>
            </Form.Row>
            <Button type="submit">Submit</Button>
          </Form>
        </Col>
        <Col xs={12} sm={6}>
          <Form>
            <Form.Group>
              <Form.File id="exampleFormControlFile1" label="Add pictures from this trip" />
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </>
  )
}

export default NoteEditor
