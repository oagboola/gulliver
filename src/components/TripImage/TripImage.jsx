import React, { useEffect, useState } from 'react';
import { CloudinaryContext, Image } from 'cloudinary-react';
import axios from 'axios';

const TripImage = ({currentEntry}) => {
  const [images, setImages] = useState([]);
  useEffect(() => {
  axios.get(`https://res.cloudinary.com/lydex/image/list/${currentEntry.id}.json`)
    .then(res => {
      setImages(res.data.resources);
    })
    .catch(err => {
      setImages([])
    })
  }, [currentEntry]);

  console.log('images here', images)
  if(images.length) {
    return images.map(img => <Image key={img.public_id} publicId={img.public_id}/>)
  }

  return <p>No images uploaded for this trip yet</p>
}

export default TripImage;
