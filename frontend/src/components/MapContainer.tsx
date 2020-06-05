import React from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';

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

  const {isLoaded, loadError} = useLoadScript({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY })
  const [markers, setMarkers] = React.useState([{id: 1, lat: 49.239370, lng: -123.044590 }])

  if (loadError) return <div> "Error loading maps" </div>;
  if (!isLoaded) return <div>"Loading"</div>;
   
  return (

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        options={options}
      >
        { markers.map(marker => (
          <Marker 
            key={marker.id} 
            position= {{lat: marker.lat, lng: marker.lng}} 
            icon= {{
              url:'/shop_cart.svg',
              scaledSize: new window.google.maps.Size(20,20),
              origin: new window.google.maps.Point(0,0),
              anchor: new window.google.maps.Point(15,15)
            }}
          />
        )) }
        
      </GoogleMap>
  )
}

export default React.memo(MapContainer)
