import React, { Component } from "react";
import RestaurantCards from "./RestaurantCards";
import image from "../images/map.png";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
} from "react-google-maps";


import { Header, Icon, Image } from "semantic-ui-react";

//restaurant.RestrntID

function Map() {
  const restaurants = [];
  fetch("/restaurants")
    .then((response) => response.json())
    .then((response, restaurants) => {restaurants.push(response.json())} )
    .catch((err) => console.error(err));
  console.log(restaurants);
  return (
    <GoogleMap defaultZoom={12} defaultCenter={{ lat: 45.4211, lng: -75.6903 }}>
      {restaurants.map((restaurant) => (
        <Marker
          key={restaurant.RestrntID}
          position={{
            lat: restaurant.Latitude,
            lng: restaurant.Longitude,
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
