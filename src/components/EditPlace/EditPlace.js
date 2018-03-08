import React, { Component } from 'react';
import './EditPlace.css';

class EditPlace extends Component {
    render() {
        return (
            <p>EditPlace component with id { this.props.match.params.id }!</p>
        );
    }
}

export default EditPlace;