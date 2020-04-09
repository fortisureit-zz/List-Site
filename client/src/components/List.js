// function Map() {
//   const [restaurants] = useState({list: []})
//   React.useEffect(() => {     
//     fetch("/restaurants", restaurants)
//     .then((response) => response.json())
//     .then((response) => restaurants.setState({ list: response.json.parse(response.data)}))
//     .catch((err) => console.error(err))
//   })
//   console.log(restaurants);
//   return (
//     <GoogleMap defaultZoom={12} defaultCenter={{ lat: 40.656292, lng: -81.635239 }}>
//       {restaurants.list.map((restaurant) => (
//         <Marker
//           key={restaurant.RestrntID}
//           position={{
//             lat: restaurant.Latitude,
//             lng: restaurant.Longitude,
//           }}
//         />
//       ))}
//     </GoogleMap>
//   );
// }
import React, { Component } from "react";
import RestaurantCards from "./RestaurantCards";
import image from "../images/map.png";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
} from "react-google-maps";
import * as restData from "../data/restaurants.json";
 
import { Header, Icon, Image } from "semantic-ui-react";
 
//restaurant.RestrntID
 
function Map() {
  return (
    <GoogleMap defaultZoom={10} defaultCenter={{ lat: 40.901749, lng: -81.111885 }}>
      {restData.data.map((restaurant) => (
        <Marker
          key={restaurant.RestrntID}
          position={{
            lat: parseFloat(restaurant.Latitude),
            lng: parseFloat(restaurant.Longitude),
          }}
        />
      ))}
    </GoogleMap>
  );
}
 
const WrappedMap = withScriptjs(withGoogleMap(Map));
 
class List extends Component {
  render() {
    return (
      <div id="list">
        <div style={{ width: "100vw", height: "70vh" }}>
          <WrappedMap
            googleMapURL={
              "https://maps.googleapis.com/maps/api/js?key=AIzaSyCjjSs6symeoHC50P2kpo-vWn2Pow0YvYI&callback=initMap"
            }
            loadingElement={<div style={{ height: "100%" }} />}
            containerElement={<div style={{ height: "100%" }} />}
            mapElement={<div style={{ height: "100%" }} />}
          />
        </div>
 
        <div id="restaurant-list">
          <RestaurantCards></RestaurantCards>
        </div>
      </div>
    );
  }
}
 
export default List;