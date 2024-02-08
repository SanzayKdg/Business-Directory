// /*
// to use google maps api 
// install these packages
// npm i @googlemaps/js-api-loader

// for typescript
// install 
// npm i @types/google.maps
// */

// import { useEffect, useRef } from "react";
// import { GOOGLE_MAP_API_KEY } from "../../services/Api/Api.js";
// import { Loader } from "@googlemaps/js-api-loader";
// const GoogleMap = () => {
//   const mapRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     // Initialized map function
//     const initMap = async () => {
//       const loader = new Loader({
//         apiKey: GOOGLE_MAP_API_KEY as string,
//         version: "weekly",
//       });

//       const { Map } = await loader.importLibrary("maps");
//       const position = {
//         lat: 27.631817,
//         lng: 85.362696,
//       };

//       // map options
//       const mapOptions: google.maps.MapOptions = {
//         center: position,
//         zoom: 10,
//         mapId: "react app",
//       };

//       // setup map
//       const map = new Map(mapRef.current as HTMLDivElement, mapOptions);
//     };

//     initMap();
//   }, []);

//   return <div style={{ height: "300px", width: "500px" }} ref={mapRef} />;
// };

// export default GoogleMap;
