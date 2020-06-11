import React from 'react';
import MapContainer from '../components/MapContainer';
import '../styles/map.scss';

interface IProps {

}

const MapView: React.FC<IProps> = () => {
  return (
   <MapContainer />

  )
}

export default MapView