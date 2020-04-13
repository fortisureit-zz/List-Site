import React, {Component} from 'react'
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
 
 
class List extends Component {
  render() {
    return (
     
        <div id="restaurant-list">
          <RestaurantCards></RestaurantCards>
        </div>
    );
  }
}
 
export default List;