
import React, { Component } from "react"
import SearchComponent from "./Search"

import image from "../images/two-women.jpg"

import "../CSS/Main.css"

import { Header, Segment, Button, Icon, Grid, Image, Divider } from "semantic-ui-react"


class Home extends Component {

    state = {
        restaurants: []
      }
    
      componentDidMount() {
        this.getRestaurants()
      }
    
      getRestaurants = _ => {
        fetch('http://localhost:5000/restaurants')
        .then(response => response.json())
        .then(response => this.setState({ restaurants: response.data }))
        .catch(err => console.error(err));
      }
    
      renderRestaurant = ({ RestrntID, City  }) => 
        
      // NOTE: map through array of colors
        <div key={RestrntID}> 
             <a href="/list">
                <Button size='massive' >
                    {City}
                </Button>
            </a>
        </div>
    

  render() {
    const { restaurants } = this.state
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

              <h2>Find your City!</h2>

              <div id='cities'>
                {restaurants.map(this.renderRestaurant)}
              </div>
              
      </div>
    )
  }
}

export default Home