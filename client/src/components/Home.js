
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
    
      renderRestaurant = ({ field1, field2  }) => 
        
        <Grid.Column key={field1} mobile={16} tablet={8} computer={2}> 
             <a href="/list">
                <Button size='massive' >
                    {field2}
                </Button>
            </a>
        </Grid.Column>
    

  render() {
    const { restaurants } = this.state
    return (
      <div className="main">
        <Grid divided="vertically" centered="true" relaxed>
          <Grid.Row columns={2}>
            <Grid.Column verticalAlign="middle" textAlign="center" mobile={16} tablet={9} computer={6}>
              <Header as="h1" textAlign="right">
                <Icon name="street view" />
                <Header.Content>Welcome to Fortisure Foods</Header.Content>
              </Header>
            </Grid.Column>
            <Grid.Column verticalAlign="middle" mobile={16} tablet={9} computer={6}>
              <SearchComponent></SearchComponent>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns='equal'>

            <Grid.Column verticalAlign="middle" width={8} className='landing' mobile={16} tablet={9} computer={6}>
              <Image src={image}></Image>
            </Grid.Column>
            <Grid.Column verticalAlign="middle" mobile={16} tablet={9} computer={6}>
              <h1>Find your City!</h1>
            </Grid.Column>

          </Grid.Row>
          <Grid.Row columns='equal'>

            {restaurants.map(this.renderRestaurant)}
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default Home