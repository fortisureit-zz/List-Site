import React, { Component } from "react"
import PropTypes from "prop-types"
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

import fflogo from "../images/order-logo.svg"

export class RestaurantCards extends Component {
  constructor(props) {
    super(props)

    this.state = {
      restaurants: [],
      search: "",
      showingInfoWindow: false, //Hides or the shows the infoWindow
      activeMarker: {}, //Shows the active marker upon click
      selectedPlace: {}, //Shows the infoWindow to the selected place upon a marke
      markers: {},
      // I think this was working?
      // newCenter: {
      //   lat: -34,
      //   lng: 151
      // },
    }

    this.searchHandler = this.searchHandler.bind(this)
  }
  // getDistance (selectedMarker) {
  //   var distance = new this.props.google.maps.computeDistanceBetween()
  //   var userLocation = this.props.mapCenter
  //   distance(selectedMarker, userLocation)
  // }
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      search: marker.name,
    })
    // getDistance(marker.position)
    console.log(marker.position)
  }

  addPoint = () => {
    this.setState((state) => {
      return { points: { lat: state.Latitude, lng: state.Longitude } }
    })
  }

  currentLocationClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    })
  }

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        search: "",
      })
    }
  }

  componentDidMount() {
    this.getRestaurants()
    console.log(this.props.google)
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

  render() {
    const restaurants = this.state.restaurants

    function searchingFor(search) {
      return function (x) {
        let filteredRest =
          x.Name.toLowerCase() + x.Address.toLowerCase() + x.City.toLowerCase()
        return filteredRest.includes(search.toLowerCase()) || !search
      }
    }

    //PLACES ARRAY

    const places = []

    // for (let i = 0; i < restaurants.length; i++) {
    //   places.push(new this.props.google.maps.LatLng(restaurants[i].Latitude, restaurants[i].Longitude))
    // }

    // function without lat/lng
    for (let i = 0; i < restaurants.length; i++) {
      let place
      places.push({
        lat: parseFloat(restaurants[i].Latitude),
        lng: parseFloat(restaurants[i].Longitude),
      })
    }
    console.log(places)

    var bounds = new this.props.google.maps.LatLngBounds()
    for (var i = 0; i < places.length; i++) {
      bounds.extend(places[i])
    }
    // bounds.extend()
    // TIME CONVERTER
    function time(value) {
      if (value !== null && value !== undefined) {
        //If value is passed in
        if (value.indexOf("AM") > -1 || value.indexOf("PM") > -1) {
          //If time is already in standard time then don't format.
          return value
        } else {
          if (value.length == 8) {
            //If value is the expected length for military time then process to standard time.
            var hour = value.substring(0, 2) //Extract hour
            var minutes = value.substring(3, 5) //Extract minutes
            var identifier = "AM" //Initialize AM PM identifier

            if (hour == 12) {
              //If hour is 12 then should set AM PM identifier to PM
              identifier = "PM"
            }
            if (hour == 0) {
              //If hour is 0 then set to 12 for standard time 12 AM
              hour = 12
            }
            if (hour > 12) {
              //If hour is greater than 12 then convert to standard 12 hour format and set the AM PM identifier to PM
              hour = hour - 12
              identifier = "PM"
            }
            return hour + ":" + minutes + " " + identifier //Return the constructed standard time
          } else {
            //If value is not the expected length than just return the value as is
            return value
          }
        }
      } else {
        return "Closed"
        // eventually function needs updated to take in both time values but whatever
      }
    }
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
              <a href='/info'><Icon name="question circle outline" id='questionCircle'></Icon></a>
            </Container>
          </Menu>
        </div>
        <div id="map">
          <CurrentLocation
            centerAroundCurrentLocation
            google={this.props.google}
            changeLocation
            //or maybe this was i'm not sure
            // mapCenter={this.props.mapCenter}
            bounds={bounds}
            // fitBounds={bounds}
          >
            <Marker
              onClick={this.currentLocationClick}
              name={"Your Location"}
              icon={{
                url: window.location.origin + "/images/Person.png",
              }}
            />

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
                  icon={{
                    url: window.location.origin + "/images/chef-hat.png",
                  }}
                >
                  {/* {bounds.extend({
                    lat: parseFloat(restaurant.Latitude),
                    lng: parseFloat(restaurant.Longitude),
                  })} */}
                </Marker>
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
                  <div
                    key={restaurant.RestrntID}
                    id="card"
                    style={
                      restaurant.Open == "N"
                        ? { display: "none" }
                        : { display: "grid" }
                    }
                  >
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
                    <div id="#cardText">
                    <Card.Content id="cardSection2">
                      <Header id="cardHeader">{restaurant.Name}</Header>
                        {restaurant.OnlineOrders == "Y" ? (
                          <a href={restaurant.OrderWebsite} id="takeoutBtn">
                            <Button
                              basic
                              compact
                              color="yellow"
                              id="takeoutBtn"
                            >
                              Online Order 
                            </Button>
                          </a>
                        ) : (
                          null
                        )}
                        {restaurant.Delivery == "Y" ? (
                          <a href={restaurant.DeliveryWebsite} id="deliveryBtn">
                            <Button
                              basic
                              compact
                              color="orange"
                              id="deliveryBtn"
                            >
                              Delivery
                            </Button>
                          </a>
                        ) : (
                          null
                        )}
                    </Card.Content>

                    <Card.Content id="cardSection3">
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
                                    Mon:{" "}
                                    {" " +
                                      time(restaurant.MondayOpen) +
                                      " - " +
                                      time(restaurant.MondayClose)}
                                  </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                  <Table.Cell>
                                    Tues:{" "}
                                    {" " +
                                      time(restaurant.TuesdayOpen) +
                                      " - " +
                                      time(restaurant.TuesdayClose)}
                                  </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                  <Table.Cell>
                                    Wed:{" "}
                                    {" " +
                                      time(restaurant.WednesdayOpen) +
                                      " - " +
                                      time(restaurant.WednesdayClose)}
                                  </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                  <Table.Cell>
                                    Thurs:{" "}
                                    {" " +
                                      time(restaurant.ThursdayOpen) +
                                      " - " +
                                      time(restaurant.ThursdayClose)}
                                  </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                  <Table.Cell>
                                    Fri:{" "}
                                    {" " +
                                      time(restaurant.FridayOpen) +
                                      " - " +
                                      time(restaurant.FridayClose)}
                                  </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                  <Table.Cell>
                                    Sat:{" "}
                                    {" " +
                                      time(restaurant.SaturdayOpen) +
                                      " - " +
                                      time(restaurant.SaturdayClose)}
                                  </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                  <Table.Cell>
                                    Sun:{" "}
                                    {" " +
                                      time(restaurant.SundayOpen) +
                                      " - " +
                                      time(restaurant.SundayClose)}
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
