import React, { Component } from "react"
import Restaurant from "./Restaurant"
import SearchComponent from "./Search"

import image from "../images/two-women.jpg"

import "../CSS/Main.css"

import { Header, Segment, Button, Icon, Grid, Image, Divider } from "semantic-ui-react"

class List extends Component {
  render() {

    return (
      <div className="main">
        <Grid divided="vertically" centered="true">
          <Grid.Row columns={2}>
            <Grid.Column verticalAlign="middle" textAlign="center" mobile={16} tablet={9} computer={6}>
              <Header as="h1" textAlign="right">
                <Icon name="street view" />
                <Header.Content>Welcome to Fortisure Foods</Header.Content>
              </Header>
            </Grid.Column>
            <Grid.Column verticalAlign="middle" mobile={16} tablet={9} computer={6}>
              <SearchComponent></SearchComponent>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns='equal'>

            <Grid.Column verticalAlign="middle" width={8} className='landing' mobile={16} tablet={9} computer={6}>
              <Image src={image}></Image>
            </Grid.Column>
            <Grid.Column verticalAlign="middle" mobile={16} tablet={9} computer={6}>
              <h1>Order your food now!</h1>
            </Grid.Column>

          </Grid.Row>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={13} computer={10}>
              <Restaurant></Restaurant>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default List
