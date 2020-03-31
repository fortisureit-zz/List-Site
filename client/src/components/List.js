import React, { Component } from "react"
import RestaurantCards from "./RestaurantCards"
import SearchComponent from "./Search"

import image from "../images/two-women.jpg"

import "../CSS/Main.css"

import { Header, Segment, Button, Icon, Grid, Image, Divider } from "semantic-ui-react"

class List extends Component {
  render() {

    return (
      <div id="main">

              <Header id='main-header' as="h1" textAlign="right">
                <div id='inner-header'>
                  <Icon name="street view" />
                  <Header.Content>Welcome to Fortisure Foods</Header.Content>
                </div>
              </Header>

              <SearchComponent id='search-bar'></SearchComponent>

              <Image src={image} id='main-image'></Image>
            
              <h2>Order your food now!</h2>
              <div id='restaurant-list'>
                <RestaurantCards></RestaurantCards>
              </div>
              
      </div>
    )
  }
}

export default List
