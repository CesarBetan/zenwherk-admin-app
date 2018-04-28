import React, { Component } from 'react';
import './Navbar.css';
import { Navbar, NavItem } from 'react-materialize';

class NavBar extends Component {
    render() {
        return (
            <Navbar left fixed = {true}>
                <NavItem onClick={() => console.log('test click')}>Dashboard</NavItem>
                <NavItem>Places</NavItem>
            </Navbar>
        );
    }
}

export default NavBar;