import React, {useState, useContext, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import { GoogleMap, LoadScript, Autocomplete, Marker, InfoWindow } from '@react-google-maps/api';

import Markers from '../Markers/Markers';
import PlacesApi from '../../apis/placesApi';
import { FirebaseContext } from '../Firebase';
import UserContext from '../../contexts/UserContext';

const libraries = ['places'];

const containerStyle = {
  width: '100%',
  height: '900px'
};

const center = {
  lat: 6.5236,
  lng: 3.6006
};

const Map = ({locations, setLocations}) => {
  const firebase = useContext(FirebaseContext);
  const placesApi = new PlacesApi(firebase);
  const user = useContext(UserContext);
  const [mapAutocomplete, setMapAutoComplete] = useState(null);
  const [mapCenter, setMapCenter] = useState(center);
  const [showInfo, setShowInfo] = useState(false)
  const [zoom, setZoom] = useState(10);
  const [currentClickedLocation, setCurrentClickedLocation] = useState(center);

  const onLoad = (autoComplete) => {
    setMapAutoComplete(autoComplete);
  }

  const onPlaceChanged = (x) => {
    const location = mapAutocomplete.getPlace();
    const { lat, lng} = location.geometry.location;
    setMapCenter({
      lat: lat(),
      lng: lng()
    })
    setZoom(15);
  }

  const handleMarkerClick = (e) => {
    const location = mapAutocomplete.getPlace();
    const locationDetails = {
      ...(location && {name: location.name, formatted_address: location.formatted_address}),
    }
    setCurrentClickedLocation({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
      ...(locationDetails && locationDetails)
    })
    setShowInfo(true)
  }

  const handleCloseClick = () => {
    setShowInfo(false)
  }

  const handleClick= (visited) => {
    const selectedLocation = {
      ...currentClickedLocation,
      visited
    }
    placesApi.add(selectedLocation, user.uid)
    setShowInfo(false);
  }

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY} libraries={libraries}>
      <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={zoom}>
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
        <Marker position={mapCenter} onClick={handleMarkerClick} icon="https://res.cloudinary.com/lydex/image/upload/v1594130380/Gulliver/icons/red.png"></Marker> : ''
        <Markers locations={locations} onClick={handleMarkerClick} />
        { showInfo &&  mapAutocomplete.getPlace() ?
          <>
            <InfoWindow position={currentClickedLocation} onCloseClick={handleCloseClick}>
              <div>
                <Button type="button" onClick={() => handleClick(true)}>Add to visited places</Button>
                ''
                <Button type="button"  onClick={() => handleClick(false)}>Add to wishlist</Button>
              </div>
            </InfoWindow>
          </>
          :
          ''
        }
      </GoogleMap>
    </LoadScript>
  )
}

export default Map
