import React, { Component } from 'react';
import './Place.css';

class Place extends Component {
    render() {
        return (
            <p>Place component with id { this.props.match.params.id }!</p>
        );
    }
}

export default Place;