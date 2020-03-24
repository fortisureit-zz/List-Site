import React from 'react'
import { NavLink } from 'react-router-dom'

import Home from './Home'
import List from './List'

const Navigation = () => {
    return (
        <div>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/list">List</NavLink>
        </div>
    )
}

export default Navigation