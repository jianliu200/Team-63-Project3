/**
 * Has the google maps functionality so that the customers can find the closest chick fil a store from their current location
 * @version 1.0.1
 * @author John Liu
 */

import React from 'react';
import { GoogleMap, LoadScript,MarkerF } from '@react-google-maps/api';
const MapFront = () => {
  
  const mapStyles = {        
    height: "75vh",
    width: "100%"};
  
  const defaultCenter = {
    lat: 30.612030, lng: -96.3409
  }

  // Return HTML Code for Google Maps API
  return (
    <>
     <LoadScript
       googleMapsApiKey='AIzaSyAwD6SbP7BI_UOU_M36kt8u-e4V4_q-1iw'>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={18}
          center={defaultCenter}
        >
          <MarkerF
            position={{lat: 30.6122, lng:-96.3416}}
          />
        </GoogleMap>
     </LoadScript>
     <h1>The Location of Chick-Fil-A</h1>
     <p1>Memorial Student Center, 275 Joe Routt Blvd, College Station, TX 77843</p1>
     </>
  )
}
export default MapFront;

// import { useMemo } from "react";
// import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

// export default function MapFront() {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: 'AIzaSyAwD6SbP7BI_UOU_M36kt8u-e4V4_q-1iw',
//   });



//   if (!isLoaded) return <div>Loading...</div>;
//   return(
//     <>
//     <h1>Howdy guys</h1>
//     {Map()}
//     </>
    
    
//   );
// }

// function Map() {
//   const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

//   return (
//     <GoogleMap zoom={10} center={center} mapContainerClassName={{width: '50%',height:'50%'}}>
//       <Marker position={center} />
//     </GoogleMap>
//   );
// }
