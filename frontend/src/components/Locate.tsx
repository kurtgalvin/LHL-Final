import React from 'react';
import {IconButton} from '@material-ui/core';
import ExploreIcon from '@material-ui/icons/Explore';

type LocateProps = {panTo: ({lat, lng}:any)=> void}
const Locate = function ({panTo}:LocateProps) {
  return (<IconButton aria-label="locate" onClick={()=> {
    navigator.geolocation.getCurrentPosition((position) => {
      panTo({lat: position.coords.latitude, lng: position.coords.longitude})
    }, () => null);

  }}>
    <ExploreIcon/>
  </IconButton>
  );  
}


export default Locate;