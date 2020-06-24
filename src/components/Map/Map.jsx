import React from 'react';

import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';

const libraries = ['places'];

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: 6.5236,
  lng: 3.6006
}
const Map = () => {
  const onLoad = (autocomplete) => {
    console.log('autocomplete ready');
  }

  const onPlaceChanged = (x) => {
    console.log('place changed')
  }
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY} libraries={libraries}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <input type="text"
              placeholder="Customized your placeholder"
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `240px`,
                height: `32px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: "absolute",
                left: "50%",
                marginLeft: "-120px"
              }} />
        </Autocomplete>
      </GoogleMap>
    </LoadScript>
  )
}

export default Map
