import React, { useContext, useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

import PlacesApi from '../../apis/placesApi';
import { FirebaseContext } from '../Firebase';
import UserContext from '../../contexts/UserContext';

const PlacesList = ({ locations }) => {
  const { uid } = useContext(UserContext);
  const firebase = useContext(FirebaseContext);
  const placesApi = new PlacesApi(firebase);

  const handleDelete = (key) => {
    placesApi.delete(key, uid)
  }

  const handlePlaceClick = (place) => {
    console.log('clicked', place)
  }

  const visitedPlaces = Object.values(locations).filter(place => place.visited);
  const notVisitedPlaces = Object.values(locations).filter(place => !place.visited);

  return <Accordion defaultActiveKey="0">
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey="0">
        Places visited
      </Accordion.Toggle>
       { visitedPlaces && visitedPlaces.map(place =>
          <Accordion.Collapse eventKey="0" key={place.id}>
            <Card.Body onClick={() => handlePlaceClick(place)}>
              <p>{place.name}</p>
              <p>{place.formatted_address}</p>
              <Button type="button" onClick={() => handleDelete(place.id)}>Delete</Button>
            </Card.Body>
          </Accordion.Collapse>
       )}
    </Card>
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey="1">
        Wishlist
      </Accordion.Toggle>
      { notVisitedPlaces && notVisitedPlaces.map(place =>
         <Accordion.Collapse eventKey="1" key={place.id}>
           <Card.Body  onClick={() => handlePlaceClick(place)}>
             <p>{place.name}</p>
             <p>{place.formatted_address}</p>
             <Button type="button" onClick={() => handleDelete(place.id)}>Delete</Button>
           </Card.Body>
         </Accordion.Collapse>
      )}
    </Card>
  </Accordion>
}

export default PlacesList;
