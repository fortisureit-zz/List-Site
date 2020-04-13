import React from "react"
import ReactDOM from "react-dom"

export class Location extends React.Component {
    constructor(props) {
        super(props)
    
        const { lat, lng } = this.props.initialCenter
        this.state = {
          currentLocation: {
            lat: lat,
            lng: lng,
          }
        }
      }
}