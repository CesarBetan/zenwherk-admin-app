import React, { Component } from 'react';
import { CollectionItem, Button, Col, Row } from 'react-materialize';
import axios from 'axios';
import {apis as api} from "../../Utils/apis";
import PropTypes from "prop-types";

class PlaceProposalCollection extends Component {

    constructor(props) {
        super(props);
        this.api = api.zenwherk_api;
        this.config = {
            headers:{'Authorization':'Bearer ' + localStorage.getItem("accesstoken")}
        };
    }

    approve() {
        const uuid = this.props.place.uuid;
        axios.put(`${this.api}place/${uuid}/approval`, null,this.config).then( res => {
            window.Materialize.toast('Lugar aceptado', 3000);
            this.props.onApprove(uuid);
        }).catch( err => {
            window.Materialize.toast('Server Error: ' + err.message, 3000);
        })
    }

    decline() {
        const uuid  = this.props.place.uuid;
        axios.put(`${this.api}place/${uuid}/rejection`, null, this.config).then( res => {
            window.Materialize.toast('Lugar declinado', 3000);
            this.props.onDecline(uuid);
        }).catch( err => {
            window.Materialize.toast('Server Error: ' + err.message, 3000);
        })
    }

    render() {
        const { place } = this.props;
        return (
            <CollectionItem className="collection-item">
                <Row>
                    <Col s={6}>
                        <h5>{place.name}</h5>
                        <p>{place.description}</p>
                        <p>{place.address}</p>
                        <p>{place.phone}</p>
                    </Col>
                    <Col s={3}><Button className='green' waves='light' onClick={this.approve.bind(this)}>Aceptar</Button></Col>
                    <Col s={3}><Button className='red' waves='light' onClick={this.decline.bind(this)}>Declinar</Button></Col>
                </Row>
            </CollectionItem>
        )
    }

}

PlaceProposalCollection.defaultProps = {
    onApprove: () => {
        console.log("Se espera función onApprove");
    },
    onDecline: () => {
        console.log("Se espera función onDecline");
    },
    place: {uuid: ''}
};

PlaceProposalCollection.propTypes = {
    onDecline: PropTypes.func.isRequired,
    onDecline: PropTypes.func.isRequired,
    place: PropTypes.object.isRequired,
};

export default PlaceProposalCollection
