import React, { Component } from 'react';
class List extends Component {
  
  state = {
    restaurants: [],
  }

  componentDidMount() {
    this.getRestaurants()
  }

  getRestaurants = _ => {
    fetch('/server')
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
    <div key={RestrntID}>
      
      {Name}
        {Phone}
          Located at {Address}, {City}, {State}, {Zipcode} 
      Online Orders: { OnlineOrders}
      Delivery: { Delivery}
        <div className='ui two buttons'>
          <a href={Website} className='websiteBtn'>Website</a>
            <a href={OrderWebsite} className='orderBtn'>Order Now!</a>
        </div>
    </div>
  render() {
    const { restaurants } = this.state
    return (
      
      <div className="App">
          {restaurants.map(this.renderRestaurant)}
      </div>
      
    )
  }
}

export default List;