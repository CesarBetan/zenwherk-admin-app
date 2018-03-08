import React, { Component } from 'react';
import './ChangeRequest.css';

class ChangeRequest extends Component {
    render() {
        return (
            <p>ChangeRequest component with place id { this.props.match.params.id }!</p>
        );
    }
}

export default ChangeRequest;