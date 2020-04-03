import React, { Component } from "react"

import image from "../images/two-women.jpg"

import { Header, Button, Icon, Image } from "semantic-ui-react"

class Home extends Component {
  state = {
    restaurants: [],
    color: ''
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

  // colorChange = (key) => {
  //   Math.floor((Math.random() * 100))
  // }

  renderRestaurant = ({ RestrntID, City }) => (
    // NOTE: map through array of colors
    <div key={RestrntID} onLoad={this.colorChanger}>
      <a href="/list">
        <Button size="massive">{City}</Button>
      </a>
    </div>
  )

  render() {
    const { restaurants } = this.state
    return (
      <div id="home">
        <header>
          <Header id="main-header" as="h1" textAlign="right">
            <div id="inner-header">
              <Icon name="street view" />
              <Header.Content>Welcome to Fortisure Foods</Header.Content>
            </div>
          </Header>
        </header>
        <h3>This our site to show you our favorite restaurants</h3>
        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto.</p>
        <h3>Find your City!</h3>

        <div id="cities">
          <div>
            <a href="/list" key='1' onLoad=''>
              <Button size="massive">Sample City</Button>
            </a>
          </div>
          <div>
            <a href="/list" key='2'>
              <Button size="massive">Sample City</Button>
            </a>
          </div>
          <div>
            <a href="/list" key='3'>
              <Button size="massive">Sample City</Button>
            </a>
          </div>
          <div>
            <a href="/list" key='4'>
              <Button size="massive">Sample City</Button>
            </a>
          </div>
          <div>
            <a href="/list">
              <Button size="massive">Sample City</Button>
            </a>
          </div>
          <div>
            <a href="/list">
              <Button size="massive">Sample City</Button>
            </a>
          </div>
          <div>
            <a href="/list">
              <Button size="massive">Sample City</Button>
            </a>
          </div>
          <div>
            <a href="/list">
              <Button size="massive">Sample City</Button>
            </a>
          </div>
          <div>
            <a href="/list">
              <Button size="massive">Sample City</Button>
            </a>
          </div>
          {restaurants.map(this.renderRestaurant)}
        </div>
      </div>
    )
  }
}

export default Home
