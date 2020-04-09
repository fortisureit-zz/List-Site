import React, { Component } from "react";
import PropTypes from "prop-types";
import { Accordion, AccordionItem } from "react-sanfona";
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
} from "semantic-ui-react";

import fflogo from "../images/ff-logo.svg";
import eggs from "../images/eggs.jpg";

class RestaurantCards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurants: [],
      hours: [],
      search: "",
    };

    this.searchHandler = this.searchHandler.bind(this);
  }

  componentDidMount() {
    this.getRestaurants();
    this.getHours();
  }

  getRestaurants = (_) => {
    fetch("/restaurants")
      .then((response) => response.json())
      .then((response) => this.setState({ restaurants: response.data }))
      .catch((err) => console.error(err));
  };
  getHours = (_) => {
    fetch("/hours")
      .then((response) => response.json())
      .then((response) => this.setState({ hours: response.data }))
      .catch((err) => console.error(err));
  };

  searchHandler(e) {
    this.setState({ search: e.target.value });
  }

  render() {
    const { activeIndex } = this.state;

    function searchingFor(search) {
      return function (x) {
        return x.Name.toLowerCase().includes(search.toLowerCase()) || !search;
      };
    }

    function srcFilter(key, string) {
      return string + key + ".jpg";
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
            </Container>
          </Menu>
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
                        <span>Open Now: Y</span>
                      </Card.Meta>
                    </Card.Content>

                    <Card.Content id="cardSection3">
                      <Accordion>
                        {[1].map((item) => {
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
                                              Mon: 11AM-10PM
                                            </Table.Cell>
                                          </Table.Row>
                                          <Table.Row>
                                            <Table.Cell>
                                              Tues: 11AM-10PM
                                            </Table.Cell>
                                          </Table.Row>
                                          <Table.Row>
                                            <Table.Cell>
                                              Wed: 11AM-10PM
                                            </Table.Cell>
                                          </Table.Row>
                                          <Table.Row>
                                            <Table.Cell>
                                              Thurs: 11AM-10PM
                                            </Table.Cell>
                                          </Table.Row>
                                          <Table.Row>
                                            <Table.Cell>
                                              Fri: 11AM-10PM
                                            </Table.Cell>
                                          </Table.Row>
                                          <Table.Row>
                                            <Table.Cell>
                                              Sat: 11AM-10PM
                                            </Table.Cell>
                                          </Table.Row>
                                          <Table.Row>
                                            <Table.Cell>
                                              Sun: 11AM-10PM
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
                          );
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
            {/* SAMPLE CARD */}
            {/* <div id='card' key="1">
          <Card.Content id='cardSection1'>
            <Image
              id="rImage"
              floated="right"
              size="medium"
              src={eggs}
              rounded
              width="50px"
              height="50px"
            />
          </Card.Content>
          <Divider />
          <Card.Content id='cardSection2'>
            <Header>Name of Restaurant</Header>
            <div className='meta'>
              <span>Takeout: Y</span>
              <span>Delivery: N</span>
              <span>Open Now: Y</span>
            </div>
          </Card.Content>
          <Divider />
          <Card.Content id='cardSection3'>
            <Accordion>
              <Accordion.Title
                active={activeIndex === 1}
                index={1}
                onClick={this.handleClick}
              >
                <Icon name={activeIndex === 1 ? "minus" : "plus"}></Icon>More
                Information
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 1}>
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
                            <Table.Cell>Monday</Table.Cell>
                            <Table.Cell>11AM-10PM</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>Tuesday</Table.Cell>
                            <Table.Cell>11AM-10PM</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>Wednesday</Table.Cell>
                            <Table.Cell>11AM-10PM</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>Thursday</Table.Cell>
                            <Table.Cell>11AM-10PM</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>Friday</Table.Cell>
                            <Table.Cell>11AM-10PM</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>Saturday</Table.Cell>
                            <Table.Cell>11AM-10PM</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>Sunday</Table.Cell>
                            <Table.Cell>11AM-10PM</Table.Cell>
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
                <CardDescription>
                  <Button.Group fluid>
                    <a id='deliveryBtn'>
                      <Button basic color='orange' fluid >Delivery</Button>
                    </a>
                    <a id='takeoutBtn'>
                      <Button basic color='yellow' fluid>
                      Takeout
                      </Button>
                    </a>
                    
                  </Button.Group>
                </CardDescription>

                <List>
                  <List.Item
                    icon="marker"
                    content="555 Sandpiper Lane, Wadsworth, Ohio 44281"
                  />
                </List>
              </Accordion.Content>
            </Accordion>
          </Card.Content>
          <Card.Content extra id='cardSection4'>
            <div className="ui two buttons">
              <a href="tel:3305156344" className="callBtn">
                <Button color="green" id="call-btn" fluid>
                  <Icon flipped="horizontally" name="call" id="call"></Icon>
                </Button>
              </a>
              <a href="" className="websiteBtn">
                <Button color="blue" id="website-btn" fluid basic>
                  Website
                  
                </Button>
              </a>
            </div>
          </Card.Content>
        </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default RestaurantCards;
