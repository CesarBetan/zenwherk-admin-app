import React, { Component } from 'react';
import './PlaceForm.css';

class PlaceForm extends Component {
    render() {
        return (
            <p>PlaceForm component { this.props.match.params.id }!</p>
        );
    }
}

export default PlaceForm;