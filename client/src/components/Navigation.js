import React from "react"
import { NavLink } from "react-router-dom"

import fflogo from "../images/ff-logo.svg"

import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  Menu
} from "semantic-ui-react"

import Home from "./Home"
import List from "./List"

const Navigation = () => {
  return (
    <div id="nav">
      <Menu fixed="top" inverted>
        <Container>
          <NavLink to="/">
            <Menu.Item as="a" header>
              <Image
                size="mini"
                src={fflogo}
                style={{ marginRight: "1.5em" }}
                id="logo-image"
              />
              FortisureFoods
            </Menu.Item>
          </NavLink>
          <NavLink to="/list">
            <Menu.Item as="a" id="right-nav">
              List
            </Menu.Item>
          </NavLink>

          {/* <Dropdown item simple text="Dropdown">
            <Dropdown.Menu>
              <Dropdown.Item>List Item</Dropdown.Item>
              <Dropdown.Item>List Item</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Header>Header Item</Dropdown.Header>
              <Dropdown.Item>
                <i className="dropdown icon" />
                <span className="text">Submenu</span>
                <Dropdown.Menu>
                  <Dropdown.Item>List Item</Dropdown.Item>
                  <Dropdown.Item>List Item</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Item>
              <Dropdown.Item>List Item</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}
        </Container>
      </Menu>
    </div>
  )
}

export default Navigation
