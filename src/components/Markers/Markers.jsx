import React from 'react';
import { Marker } from '@react-google-maps/api';

const Markers = ({locations, onMarkerClick}) => {
  return Object.values(locations).map((location, i) =>{
  const mapIcon = location.visited ?
    'https://res.cloudinary.com/lydex/image/upload/v1594130375/Gulliver/icons/green.png' : 'https://res.cloudinary.com/lydex/image/upload/v1594130371/Gulliver/icons/blue.png'
    return <Marker key={location.id} position={{lat: location.lat, lng: location.lng}} onClick={(e) => onMarkerClick(e, location)} icon={mapIcon} id={location.id}></Marker>
  })
}

export default Markers;
