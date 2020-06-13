const path = process.argv[2];
const type = process.argv[3];

data = require (path);

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

const markers = {};
for(result of data.results){
  const marker = {};
  marker.id = result.place_id;
  marker.name = result.name;
  marker.google_id = result.place_id;
  marker.type = type;
  marker.lat = result.geometry.location.lat;
  marker.lng = result.geometry.location.lng;
  marker.tp_stock = Math.floor(Math.random() * 3);
  marker.hs_stock = Math.floor(Math.random() * 3);
  marker.mask_stock = Math.floor(Math.random() * 3);


  markers[result.place_id] = marker;

}

console.log(markers);