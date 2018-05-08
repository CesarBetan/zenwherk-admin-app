import React, { Component } from 'react';
import { CollectionItem, Button, Col, Row } from 'react-materialize';
import axios from 'axios';
import {apis as api} from "../../Utils/apis";

class ReviewsCollection extends Component {

    constructor(props) {
        super(props);
        this.api = api.zenwherk_api;
        this.config = {
            headers:{'Authorization':'Bearer ' + localStorage.getItem("accesstoken")}
        };
    }

    approve() {
        const uuid = this.props.review.uuid;
        axios.put(`${this.api}review/${uuid}/approval`, null,this.config).then( res => {
            window.Materialize.toast('Reseña aprovada', 3000);
            this.props.onApprove(uuid);
        }).catch( err => {
            window.Materialize.toast('Server Error: ' + err.message, 3000);
        })
    }

    decline() {
        const uuid  = this.props.review.uuid;
        axios.put(`${this.api}review/${uuid}/rejection`, null, this.config).then( res => {
            window.Materialize.toast('Reseña declinada', 3000);
            this.props.onDecline(uuid);
        }).catch( err => {
            window.Materialize.toast('Server Error: ' + err.message, 3000);
        })
    }

    render() {
        const { review } = this.props;
        return (
            <CollectionItem className="collection-item">
                <Row>
                    <Col s={6}>
                        <h5>Rating: {review.reviewRating}</h5>
                        <p>{review.reviewText}</p>
                        <span>{review.user.name} </span>
                        <span>{review.user.lastName}</span>
                    </Col>
                    <Col s={3}><Button className='green' waves='light' onClick={this.approve.bind(this)}>Aceptar</Button></Col>
                    <Col s={3}><Button className='red' waves='light' onClick={this.decline.bind(this)}>Declinar</Button></Col>
                </Row>
            </CollectionItem>
        )
    }

}
export default ReviewsCollection