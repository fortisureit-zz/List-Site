import React, { Component } from "react"
import RestaurantCards from "./RestaurantCards"
import image from "../images/map.png"

import { Header, Icon, Image } from "semantic-ui-react"


class List extends Component {

  render() {

    return (
      <div id="list">

        <Image src={image} id="main-image"></Image>


        <div id="restaurant-list">
          <RestaurantCards></RestaurantCards>
        </div>
      </div>
    )
  }
}

export default List
