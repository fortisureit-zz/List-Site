import React from "react"
import { NavLink } from "react-router-dom"

import fflogo from "../images/ff-logo.svg"

import {
  Container,
  Image,
  Menu
} from "semantic-ui-react"

const Navigation = () => {
  return (
    <div id="nav">
      <Menu fixed="top" inverted>
        <Container>
              <Image
                size="mini"
                src={fflogo}
                style={{ marginRight: "1.5em" }}
                id="logo-image"
              />
        </Container>
      </Menu>
    </div>
  )
}

export default Navigation
