import React, { Component } from 'react';
import '../CSS/App.css';

import { Button, Card, Image } from 'semantic-ui-react'
import logo from '../images/wendys-logo.jpg'
import eggs from '../images/eggs.jpg'
class App extends Component {
  
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

  renderRestaurant = ({ restrntID, Name, Phone, Address, Website, Delivery  }) => 
    
    <Card key={restrntID}>
      <Card.Content>
        <Image
          floated='right'
          size='small'
          src={eggs}
        />
        <Card.Header>{Name}</Card.Header>
        <Card.Meta>{Phone}</Card.Meta>
        <Card.Description>
          Located in {Address}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green'>
            Mobile Order
          </Button>
          <Button basic color='red'>
            <a href={Website}>Menu</a>
            </Button>
        </div>
      </Card.Content>
    </Card>

  render() {
    const { restaurants } = this.state
    return (
      
      <div className="App">
        <Card.Group>
          {restaurants.map(this.renderRestaurant)}
          <Card>
            <Card.Content>
              <Image
                floated='right'
                size='small'
                src={logo}
              />
              <Card.Header>Wendy's</Card.Header>
              <Card.Meta>3305156344</Card.Meta>
              <Card.Description>
                Serving up square patties since 1812.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className='ui two buttons'>
                <Button basic color='green'>
                  Mobile Order
                </Button>
                <Button basic color='red'>
                  Directions
                </Button>
              </div>
            </Card.Content>
          </Card>
        </Card.Group>
      </div>
    )
  }
}

export default App;
