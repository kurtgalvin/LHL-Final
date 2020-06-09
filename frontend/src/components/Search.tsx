import React from 'react';
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";
import {Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption} from "@reach/combobox";
import "@reach/combobox/styles.css";
type SearchProps = {panTo: ({lat, lng}:any)=> void, selectMarker: (place_id:string, address: string, result: any) => void }
export default function Search ({panTo, selectMarker}:SearchProps) {
  const {ready, value, suggestions: {status, data}, setValue, clearSuggestions} = usePlacesAutocomplete({
    requestOptions: {
      types: ['establishment'],
      location: {
        lat: () => 49.282730,
        lng: ()=> -123.120735,
        equals: (latLng) => {
          if(latLng.lat() === 49.282730 && latLng.lng() === -123.120735) return true;
          else return false;
        },
        toUrlValue: () =>  "49.28730,-123120735",
        toJSON: () => { 
          return {lat: 49.282730, lng: -123.120735};
        }
      },
      radius: 10 * 1000
    },
  });

  return (
    <div className="search">
      <Combobox 
          onSelect= { async (address) => {
            setValue(address, false);
            clearSuggestions();
            try{
              const results = await getGeocode({address});
              const place_id = results[0].place_id;
              await selectMarker(place_id, address, results[0]);
              const {lat, lng} = await getLatLng(results[0]);
              panTo({lat, lng});
            }catch (error) {
              console.log(error);
            }
          
          }}>
        <ComboboxInput 
          value={value} 
          onChange={(e:Event)=> { if(e.target) setValue((e.target as HTMLTextAreaElement).value)}}
          disabled={!ready}
          placeholder="Enter a location"
        />
        <ComboboxPopover >
          <ComboboxList>         {status === "OK" &&
              data.map(({id, description}) => 
                <ComboboxOption key={id} value={description} />
              )}
          </ComboboxList>
  
        </ComboboxPopover>

      </Combobox>
      </div>);
}