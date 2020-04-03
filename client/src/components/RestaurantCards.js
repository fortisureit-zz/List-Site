import React, { Component } from "react"
import PropTypes from "prop-types"

import { Button, Card, Image, Input } from "semantic-ui-react"
import eggs from "../images/eggs.jpg"

const src = [
  'https://res.cloudinary.com/dz3p8xcr8/image/upload/v1585861242/restaurants/1_nts3hy.jpg',
  'https://res.cloudinary.com/dz3p8xcr8/image/upload/v1585861242/restaurants/2_hydrcy.jpg',
  'https://res.cloudinary.com/dz3p8xcr8/image/upload/v1585861242/restaurants/3_pcpfvz.jpg',
  'https://res.cloudinary.com/dz3p8xcr8/image/upload/v1585861242/restaurants/4_wsocmk.jpg',
  'https://res.cloudinary.com/dz3p8xcr8/image/upload/v1585861242/restaurants/5_qxta9a.jpg',
  'https://res.cloudinary.com/dz3p8xcr8/image/upload/v1585861242/restaurants/6_vq6i0u.jpg'
]

class RestaurantCards extends Component {
  constructor(props) {
    super(props)

    this.state = {
      restaurants: [],
      search: "",
      images: src,
      selectedImage: src[0]
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
    // srcFilter(key) {
    //   for (let i = 0; i < this.state.src.length; i++) {
    //     if (this.state.src[i] == key ) {
    //       return this.state.src[i];
    //     }

    //     images.map((image, index)=> image )
    //     else {
    //       return 'hi'
    //     }
    //   }
    // }
    // function srcFilter(key, string) {
    //    return string + key + '.jpg'
    // }
    const { images, selectedImage } = this.state;
    return (
      <div id="search-cards">
        <Input
          icon="search"
          onChange={this.searchHandler}
          value={this.state.search}
          id="search-bar"
        ></Input>
        <div id="cards-outer">
          <div id="cards">
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
                      Located at {restaurant.Address}, {restaurant.City},{" "}
                      {restaurant.State}, {restaurant.Zipcode}
                    </Card.Description>
                  </Card.Content>
                  <Card.Content>
                    <Card.Meta></Card.Meta>
                    <Card.Meta>
                      Online Orders: {restaurant.OnlineOrders}
                    </Card.Meta>
                    <Card.Meta>Delivery: {restaurant.Delivery}</Card.Meta>
                  </Card.Content>
                  <Card.Content extra>
                    <div className="ui two buttons">
                      <Button basic color="green">
                        <a href={restaurant.Website} className="websiteBtn">
                          Website,
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
        </div>
      </div>
    )
  }
}

export default RestaurantCards
