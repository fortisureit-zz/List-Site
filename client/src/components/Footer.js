import React from "react"
import { NavLink } from "react-router-dom"

import fflogo from "../images/ff-logo.svg"

import {
  Segment,
} from "semantic-ui-react"


const Footer = () => {
  return (
    <div id="footer">
        <Segment color='black'>
            <div id='inner-footer'>
                <h5>Fortisure IT</h5>
                <h5>Work With Us</h5>
                <p>Why we do it</p>
                <p>© 2020 fortisurefoods.com All Rights Reserved</p>
            </div>
        
        </Segment>
    </div>
  )
}

export default Footer