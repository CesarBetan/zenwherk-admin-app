import React, { Component } from 'react';
import './User.css';

class User extends Component {
    render() {
        return (
            <p>User component with id { this.props.match.params.id }!</p>
        );
    }
}

export default User;