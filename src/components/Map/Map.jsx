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

const Map = ({locations, setLocations, mapCenter, setMapCenter, zoom, setZoom}) => {
  const firebase = useContext(FirebaseContext);
  const placesApi = new PlacesApi(firebase);
  const user = useContext(UserContext);
  const [mapAutocomplete, setMapAutoComplete] = useState(null);
  const [showInfo, setShowInfo] = useState(false)
  const [currentClickedLocation, setCurrentClickedLocation] = useState({});

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

  const handleMarkerClick = (e, location=mapAutocomplete.getPlace()) => {
    setCurrentClickedLocation({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
      ...(location && location)
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
        <Marker position={mapCenter} onClick={handleMarkerClick} icon="https://res.cloudinary.com/lydex/image/upload/v1594130380/Gulliver/icons/red.png"/> : ''
        <Markers locations={locations} onMarkerClick={handleMarkerClick}/>
        { showInfo ?
          <>
            <InfoWindow position={currentClickedLocation} onCloseClick={handleCloseClick}>
              <div>
                <p>{currentClickedLocation.name}</p>
                {
                  !currentClickedLocation.geometry && currentClickedLocation.name ?
                    ( currentClickedLocation.visited ? <p>You have visited this place</p> : <p>You haven't been here yet</p>)
                     :
                    (<div>
                        <Button type="button" onClick={() => handleClick(true)}>Add to visited places</Button>
                        ''
                        <Button type="button"  onClick={() => handleClick(false)}>Add to wishlist</Button>
                      </div>)
                }
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
