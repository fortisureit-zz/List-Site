import React, { Component } from "react"
import "../CSS/App.css"

import { Button, Card, Image, Input } from "semantic-ui-react"
import eggs from "../images/eggs.jpg"

class RestaurantCards extends Component {
  constructor(props) {
    super(props)

    this.state = {
      restaurants: [],
      search: ""
    }

    this.searchHandler = this.searchHandler.bind(this)
  }

  componentDidMount() {
    this.getRestaurants()
  }

  getRestaurants = _ => {
    fetch("/server")
      .then(response => response.json())
      .then(response => this.setState({ restaurants: response.data }))
      .catch(err => console.error(err))
  }

  searchHandler(e) {
    this.setState({ search: e.target.value })
  }

  render() {
    function searchingFor(search) {
      return function(x) {
        return x.Name.toLowerCase().includes(search.toLowerCase()) || !search
      }
    }
    return (
      <div className="App">
        <Input
          icon="search"
          onChange={this.searchHandler}
          value={this.state.search}
        ></Input>
        {this.state.restaurants
          .filter(searchingFor(this.state.search))
          .map(restaurant => (
            <Card key={restaurant.RestrntID}>
              <Card.Content>
                <Image floated="right" size="medium" src={eggs} rounded />
              </Card.Content>
              <Card.Content>
                <Card.Header>{restaurant.Name}</Card.Header>
                <Card.Meta>{restaurant.Phone}</Card.Meta>
                <Card.Description>
                  Located at {restaurant.Address}, {restaurant.City}, {restaurant.State}, {restaurant.Zipcode}
                </Card.Description>
              </Card.Content>
              <Card.Content>
                <Card.Meta></Card.Meta>
                <Card.Meta>Online Orders: {restaurant.OnlineOrders}</Card.Meta>
                <Card.Meta>Delivery: {restaurant.Delivery}</Card.Meta>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button basic color="green">
                    <a href={restaurant.Website} className="websiteBtn">
                      Website
                    </a>
                  </Button>
                  <Button basic color="red">
                    <a href={restaurant.OrderWebsite} className="orderBtn">
                      Order Now!
                    </a>
                  </Button>
                </div>
              </Card.Content>
            </Card>
          ))}
      </div>
    )
  }
}

export default RestaurantCards
