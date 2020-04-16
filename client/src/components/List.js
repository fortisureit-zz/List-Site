import React, {Component} from 'react'
import RestaurantCards from "./RestaurantCards";
 
 
 
class List extends Component {
  render() {
    return (
     
        <div id="restaurant-list">
          <RestaurantCards></RestaurantCards>
        </div>
    );
  }
}
 
export default List;