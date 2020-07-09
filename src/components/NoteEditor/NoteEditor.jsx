import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { CloudinaryContext, Image } from 'cloudinary-react';

import EntriesApi from '../../apis/entriesApi';
import { FirebaseContext } from '../Firebase';
import TripImage from '../TripImage/TripImage';
import UserContext from '../../contexts/UserContext';

const NoteEditor = ({ currentEntry, setCurrentEntry }) => {
  const firebase = useContext(FirebaseContext);
  const user = useContext(UserContext);
  const entriesApi = new EntriesApi(firebase);
  const [images, setImages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    entriesApi.createOrUpdate(currentEntry, user.uid);
    setCurrentEntry({})
  };

  const handleChange = (e) => {
    const target = e.target;
    let entry = { ...currentEntry };
    entry[target.name] = target.value;
    setCurrentEntry(entry)
  };

  const onDrop = (picture) => {
    setImages(images.concat(picture))
  }

  const handleUpload = (images) => {
    window.cloudinary.openUploadWidget({
      cloud_name: 'lydex',
      folder: 'Gulliver',
      uploadPreset: process.env.REACT_APP_CLOUDINARY_PRESET,
      tags: [currentEntry.id]
    }, (err, result) => {
      if (result.event === 'success') {
        //image uploaded successfully
      }
    })
  }

  return ( <>
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
          <CloudinaryContext cloudName="lydex" width="300" height="300" crop="scale">
            <div>
              {currentEntry.id ?
                <>
                  <TripImage currentEntry={currentEntry} />
                  <Button type="button" onClick={handleUpload}>Add images</Button>
                </>
                 : <p>Select existing entry to upload images</p>
              }
            </div>
          </CloudinaryContext>
        </Col>
      </Row>
    </>
  )
}

export default NoteEditor
