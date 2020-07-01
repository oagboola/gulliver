import React from 'react';
import Image from 'react-bootstrap/Image'

const TripImage = ({src}) => {
  return <Image src={src} rounded fluid/>
}

export default TripImage;
