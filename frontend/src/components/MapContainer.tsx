import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '60vw',
  height: '60vh',
  padding: '5rem',
  display: 'inline-block',
  'border-radius': '15px',
  'box-shadow': '5px 10px #888888'

};

const center = {
  lat: 49.282730,
  lng: -123.120735
};

const options = {
  disableDefaultUI: true,
  zoomControl: true
}

function MapContainer() {
  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        options={options}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(MapContainer)
