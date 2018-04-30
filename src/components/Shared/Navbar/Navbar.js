import React, { Component } from 'react';
import './Navbar.css';
import { Navbar, NavItem} from 'react-materialize';
import { apis as api } from '../../../Utils/apis';

class NavBar extends Component {

    constructor(props) {
        super (props);
        this.baseUrl = api.auth_api;
        this.logOut = this.logOut.bind(this);
    }

    logOut() {
        localStorage.removeItem('accesstoken');
        localStorage.removeItem('user');
        window.location.href = `${this.baseUrl}logout`;
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <Navbar right fixed = {true} style={{backgroundColor: '#00de91'}}>
                    <NavItem href="/dashboard">Dashboard</NavItem>
                    <NavItem href="/places">Places</NavItem>
                    <NavItem onClick={this.logOut}>Log Out</NavItem>
                </Navbar>
            </div>
        );
    }
}

export default NavBar;