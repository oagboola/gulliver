import React from 'react';
import { Marker } from '@react-google-maps/api';

const Markers = ({locations, onClick}) => {
  return Object.values(locations).map((location, i) =>{
  const mapIcon = location.visited ?
    'https://res.cloudinary.com/lydex/image/upload/v1594130375/Gulliver/icons/green.png' : 'https://res.cloudinary.com/lydex/image/upload/v1594130371/Gulliver/icons/blue.png'
    return <Marker key={i} position={{lat: location.lat, lng: location.lng}} onClick={onClick} icon={mapIcon}></Marker>
  })
}

export default Markers;
