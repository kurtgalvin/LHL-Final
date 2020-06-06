import React from 'react'
import MapContainer from '../components/MapContainer'

interface IProps {

}

const MapView: React.FC<IProps> = () => {
  return (
    <div className="map">   
    <MapContainer />
  </div>
  )
}

export default MapView