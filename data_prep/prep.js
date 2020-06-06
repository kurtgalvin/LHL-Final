data = require ( './google-places-supermarket-raw.js');

// interface IMarker {
//   id: number;
//   name: string;
//   google_id: string; 
//   type: string;
//   lat: number;
//   lng: number;
//   tp_stock: number;
//   hs_stock: number;
//   mask_stock: number;
// }

const markers = [];
let id = 1;
for(result of data.results){
  const marker = {};
  marker.id = id;
  marker.name = result.name;
  marker.google_id = result.id;
  marker.type = 'supermarket';
  marker.lat = result.geometry.location.lat;
  marker.lng = result.geometry.location.lng;
  marker.tp_stock = Math.floor(Math.random() * 3);
  marker.hs_stock = Math.floor(Math.random() * 3);
  marker.mask_stock = Math.floor(Math.random() * 3);


  markers.push(marker);
  id++;
}

console.log(markers);