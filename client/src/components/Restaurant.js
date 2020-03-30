import React, { Component } from 'react';
import '../CSS/App.css';

import { Button, Card, Image } from 'semantic-ui-react'
import eggs from '../images/eggs.jpg'
class App extends Component {
  
  state = {
    restaurants: [],
  }

  componentDidMount() {
    this.getRestaurants()
  }

  getRestaurants = _ => {
    fetch('http://localhost:5000/server')
    .then(response => response.json())
    .then(response => this.setState({ restaurants: response.data }))
    .catch(err => console.error(err));
  }

  renderRestaurant = ({   
    RestrntID, Name, 
    Address, City, State, Zipcode, 
    Phone, Website, DateAdded, 
    OnlineOrders, OrderWebsite, Delivery 
  }) => 
    // NOTE: future add maybe an array of images that this maps through for each restaurnt
    <Card key={RestrntID}>
      <Card.Content>
        <Image
          floated='right'
          size='medium'
          src={eggs}
          rounded
        />
      </Card.Content>
      <Card.Content>
      <Card.Header>{Name}</Card.Header>
        <Card.Meta>{Phone}</Card.Meta>
        <Card.Description>
          Located at {Address}, {City}, {State}, {Zipcode} 
        </Card.Description>
      </Card.Content>
      <Card.Content>
      <Card.Meta></Card.Meta>
      <Card.Meta>Online Orders: { OnlineOrders}</Card.Meta>
      <Card.Meta>Delivery: { Delivery}</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green' >
          <a href={Website} className='websiteBtn'>Website</a>
          </Button>
          <Button basic color='red'>
            <a href={OrderWebsite} className='orderBtn'>Order Now!</a>
            </Button>
        </div>
      </Card.Content>
    </Card>

  render() {
    return (
      
      <div className="App">
        <Card.Group>
          {restaurants.map(this.renderRestaurant)}
        </Card.Group>
      </div>
    )
  }
}

export default App;
