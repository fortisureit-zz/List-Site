import React, { Component } from "react"
import PropTypes from "prop-types"
import { Accordion, AccordionItem } from "react-sanfona"
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react"

import CurrentLocation from "./Map"

import {
  Button,
  Card,
  Image,
  Input,
  Icon,
  List,
  CardDescription,
  Table,
  Popup,
  Header,
  Divider,
  Menu,
  Container,
} from "semantic-ui-react"

import fflogo from "../images/ff-logo.svg"
import eggs from "../images/eggs.jpg"

export class RestaurantCards extends Component {
  constructor(props) {
    super(props)

    this.state = {
      restaurants: [],
      search: "",
      showingInfoWindow: false, //Hides or the shows the infoWindow
      activeMarker: {}, //Shows the active marker upon click
      selectedPlace: {}, //Shows the infoWindow to the selected place upon a marke
      newCenter: {
        lat: -34,
        lng: 151
      }
    }

    this.searchHandler = this.searchHandler.bind(this)
    this.panner = this.panner.bind(this)
  }
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    })
    
  }

  panner(props) {
    // this.props.google.maps.Map.prototype.panTo({lat: -34, lng: 151})
    this.props.newCenter = this.state.newCenter

  }

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      })
    }
  }

  componentDidMount() {
    this.getRestaurants()
  }

  getRestaurants = (_) => {
    fetch("/restaurants")
      .then((response) => response.json())
      .then((response) => this.setState({ restaurants: response.data }))
      .catch((err) => console.error(err))
  }

  searchHandler(e) {
    this.setState({ search: e.target.value })
  }

  // function searchingFor(search) {
  //   return function (x) {
  //     return x.Name.toLowerCase().includes(search.toLowerCase()) || !search
  //   }
  // }

  render() {
    function searchingFor(search) {
      return function (x) {
          let filteredRest = x.Name.toLowerCase() + x.Address.toLowerCase() + x.City.toLowerCase()
        return filteredRest.includes(search.toLowerCase()) || !search
          
          
        } 
      
    }

    // const bounds = new this.props.google.maps.LatLngBounds()
    // for (var i = 0; i < this.state.restaurants.length; i++) {
    //   bounds.extend({
    //     lat: parseFloat(this.state.restaurants.Latitude),
    //     lng: parseFloat(this.state.restaurants.Longitude),
    //   })
    // }

    // TIME CONVERTER
    function time(value) {
      if (value !== null && value !== undefined){ //If value is passed in
        if(value.indexOf('AM') > -1 || value.indexOf('PM') > -1){ //If time is already in standard time then don't format.
          return value;
        }
        else {
          if(value.length == 8){ //If value is the expected length for military time then process to standard time.
            var hour = value.substring ( 0,2 ); //Extract hour
            var minutes = value.substring ( 3,5 ); //Extract minutes
            var identifier = 'AM'; //Initialize AM PM identifier
     
            if(hour == 12){ //If hour is 12 then should set AM PM identifier to PM
              identifier = 'PM';
            }
            if(hour == 0){ //If hour is 0 then set to 12 for standard time 12 AM
              hour=12;
            }
            if(hour > 12){ //If hour is greater than 12 then convert to standard 12 hour format and set the AM PM identifier to PM
              hour = hour - 12;
              identifier='PM';
            }
            return hour + ':' + minutes + ' ' + identifier; //Return the constructed standard time
          }
          else { //If value is not the expected length than just return the value as is
            return value;
          }
        }
      } else {
        return 'Closed'
        // eventually function needs updated to take in both time values but whatever
      }
    };
    return (
      <div id="mainPage">
        <div id="nav">
          <Menu fixed="top" inverted id="navBar">
            <Container>
              <Image
                size="mini"
                src={fflogo}
                style={{ marginRight: "1.5em" }}
                id="logo-image"
              />
              <Input
                icon="search"
                onChange={this.searchHandler}
                value={this.state.search}
                id="search-bar"
              ></Input>
            </Container>
          </Menu>
        </div>
        <div id="map">
          <CurrentLocation
            centerAroundCurrentLocation
            google={this.props.google}
            changeLocation
          >
            <Marker onClick={this.onMarkerClick} name={"current location"} />

            {this.state.restaurants
              .filter(searchingFor(this.state.search))
              .map((restaurant) => (
                <Marker
                  onClick={this.onMarkerClick}
                  key={restaurant.RestrntID}
                  name={restaurant.Name}
                  position={{
                    lat: parseFloat(restaurant.Latitude),
                    lng: parseFloat(restaurant.Longitude),
                  }}
                />
              ))}

            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}
            >
              <div>
                <h4>{this.state.selectedPlace.name}</h4>
              </div>
            </InfoWindow>
          </CurrentLocation>
        </div>
        <div id="search-cards">
          <div id="cards-outer">
            <div id="cards">
              {this.state.restaurants
                .filter(searchingFor(this.state.search))
                .map((restaurant) => (
                  <div key={restaurant.RestrntID} id="card">
                    <Card.Content id="cardSection1">
                      <Image
                        id="rImage"
                        floated="right"
                        size="medium"
                        src={
                          window.location.origin +
                          "/images/" +
                          restaurant.RestrntID +
                          ".jpg"
                        }
                        rounded
                        width="250px"
                        height="250px"
                      />
                    </Card.Content>

                    <Card.Content id="cardSection2">
                      <Header id="cardHeader">{restaurant.Name}</Header>
                      <Card.Meta>
                        <span>
                          Takeout:{" "}
                          <Icon
                            name={
                              restaurant.OnlineOrders == "Y" ? "check" : "close"
                            }
                          ></Icon>
                        </span>
                        <span>
                          Delivery:{" "}
                          <Icon
                            name={
                              restaurant.DeliveryOrders == "Y"
                                ? "check"
                                : "close"
                            }
                          ></Icon>
                        </span>
                        {/* <span>Open Now: Y</span> FUTURE VERSION*/}
                      </Card.Meta>
                    </Card.Content>

                    <Card.Content id="cardSection3">
                      <Accordion>
                        {[0].map((item) => {
                          return (
                            <AccordionItem
                              title={"More Information  ←"}
                              expanded={item === 2}
                            >
                              <div>
                                <React.Fragment>
                                  <Popup
                                    trigger={
                                      <Button basic fluid>
                                        Hours of Operation
                                      </Button>
                                    }
                                    content={
                                      <Table basic="very" celled collapsing>
                                        <Table.Body>
                                          <Table.Row>
                                            <Table.Cell>
                                              Mon: {" " + time(restaurant.MondayOpen) + ' - ' + time(restaurant.MondayClose)}
                                            </Table.Cell>
                                          </Table.Row>
                                          <Table.Row>
                                            <Table.Cell>
                                              Tues: {" " + time(restaurant.TuesdayOpen) + ' - ' + time(restaurant.TuesdayClose)}
                                            </Table.Cell>
                                          </Table.Row>
                                          <Table.Row>
                                            <Table.Cell>
                                              Wed: {" " + time(restaurant.WednesdayOpen) + ' - ' + time(restaurant.WednesdayClose)}
                                            </Table.Cell>
                                          </Table.Row>
                                          <Table.Row>
                                            <Table.Cell>
                                              Thurs: {" " + time(restaurant.ThursdayOpen) + ' - ' + time(restaurant.ThursdayClose)}
                                            </Table.Cell>
                                          </Table.Row>
                                          <Table.Row>
                                            <Table.Cell>
                                              Fri: {" " + time(restaurant.FridayOpen) + ' - ' + time(restaurant.FridayClose)}
                                            </Table.Cell>
                                          </Table.Row>
                                          <Table.Row>
                                            <Table.Cell>
                                              Sat: {" " + time(restaurant.SaturdayOpen) + ' - ' + time(restaurant.SaturdayClose)}
                                            </Table.Cell>
                                          </Table.Row>
                                          <Table.Row>
                                            <Table.Cell>
                                              Sun: {" " + time(restaurant.SundayOpen) + ' - ' + time(restaurant.SundayClose)}
                                            </Table.Cell>
                                          </Table.Row>
                                        </Table.Body>
                                      </Table>
                                    }
                                    on="click"
                                    wide
                                    hideOnScroll
                                    position="right center"
                                  />
                                </React.Fragment>
                                <Card.Description>
                                  <Button.Group fluid>
                                    <a
                                      href={restaurant.DeliveryWebsite}
                                      id="deliveryBtn"
                                    >
                                      <Button
                                        basic
                                        compact
                                        color="orange"
                                        id="deliveryBtn"
                                      >
                                        Delivery
                                      </Button>
                                    </a>
                                    <a
                                      href={restaurant.OrderWebsite}
                                      id="takeoutBtn"
                                    >
                                      <Button
                                        basic
                                        compact
                                        color="yellow"
                                        id="takeoutBtn"
                                      >
                                        Takeout
                                      </Button>
                                    </a>
                                  </Button.Group>
                                </Card.Description>
                                <List>
                                  <List.Item
                                    icon="marker"
                                    content={
                                      restaurant.Address +
                                      ", " +
                                      restaurant.City +
                                      ", " +
                                      restaurant.State +
                                      " " +
                                      restaurant.Zipcode
                                    }
                                  />
                                </List>
                              </div>
                            </AccordionItem>
                          )
                        })}
                      </Accordion>
                    </Card.Content>

                    <Card.Content extra id="cardSection4">
                      <div className="ui two buttons">
                        <a href={"tel:" + restaurant.Phone} className="callBtn">
                          <Button color="green" id="call-btn" fluid>
                            <Icon
                              flipped="horizontally"
                              name="call"
                              id="call"
                            ></Icon>
                          </Button>
                        </a>
                        <a href={restaurant.Website} className="websiteBtn">
                          <Button color="blue" id="website-btn" fluid basic>
                            Website
                            {/* possibly a switch statement that loops through order site delivery site  */}
                          </Button>
                        </a>
                      </div>
                    </Card.Content>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCjjSs6symeoHC50P2kpo-vWn2Pow0YvYI&",
})(RestaurantCards)
