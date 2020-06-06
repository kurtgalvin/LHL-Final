import React from 'react';
type LocateProps = {panTo: ({lat, lng}:any)=> void}
const Locate = function ({panTo}:LocateProps) {
  return (<button className="locate" onClick={()=> {
    navigator.geolocation.getCurrentPosition((position) => {
      panTo({lat: position.coords.latitude, lng: position.coords.longitude})
    }, () => null);

  }}>
    <img src="./compass.svg" alt="compass - locate me"/>
  </button>
  );  
}


export default Locate;