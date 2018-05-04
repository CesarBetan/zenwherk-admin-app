import React, { Component } from 'react';
import './PlaceForm.css';
import { Row, Input, Button} from 'react-materialize';
import DraggableMap from "../DraggableMap/DraggableMap";
import {apis as api} from "../../Utils/apis";
import axios from 'axios';

class PlaceForm extends Component {

    constructor(props) {
        super(props);
        const { place } = this.props;
        this.api = api.zenwherk_api;
        this.config = {
            headers:{'Authorization':'Bearer ' + localStorage.getItem("accesstoken")}
        };
        this.state = {
            uuid: place.uuid,
            latitude: place.latitude,
            longitude: place.longitude,
            name: place.name,
            phone: place.phone,
            description: place.description,
            address: place.address,
            webPage: place.website,
            category: 1,
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !(this.state.latitude !== nextState.latitude ||
            this.state.longitude !== nextState.longitude ||
            this.state.name !== nextState.name ||
            this.state.address !== nextState.address ||
            this.state.category !== nextState.category ||
            this.state.description !== nextState.description ||
            this.state.phone !== nextState.phone ||
            this.state.webPage !== nextState.webPage
        );
    }

    onMapPinChanged(location) {
        location = location.replace(/\s/g, '');
        location = location.slice(1,-1);
        location= location.split(",");
        this.setState({latitude: location[0]});
        this.setState({longitude: location[1]});
    }

    updatePlace() {
        const payload = {
            name: this.state.name,
            address: this.state.address,
            description: this.state.description,
            phone: this.state.phone,
            category: this.state.category,
            website: this.state.webPage,
            latitude: parseFloat(this.state.latitude),
            longitude:  parseFloat(this.state.longitude),
        };
        axios.put(`${this.api}place/${this.state.uuid}`, payload, this.config).then( res => {
            window.Materialize.toast("Lugar Actualizado", 3000);
        }).catch(err => {
            window.Materialize.toast("Server Error: " + err.message, 3000)
        })
    }

    render() {
        const { place } = this.props;
        return (
            <Row>
                <Input value={place.name} s={6} label="Nombre" onChange={(e) => {this.setState({name: e.target.value})}}/>
                <Input s={6} type='select' label='Categoría'>
                    <option value='1'>Option 1</option>
                    <option value='2'>Option 2</option>
                    <option value='3'>Option 3</option>
                </Input>
                <Input s={12} value={place.phone} label="Teléfono" onChange={(e) => {this.setState({phone: e.target.value})}}/>
                <Input value={place.description} label="Descripción" s={12} onChange={(e) => {this.setState({description: e.target.value})}}/>
                <Input value={place.website} label="Sitio Web" s={12} onChange={(e) => {this.setState({webPage: e.target.value})}}/>
                <Input value={place.address} label="Dirección" s={12} onChange={(e) => {this.setState({address: e.target.value})}}/>
                <div className="map"><DraggableMap onMapPinChanged={this.onMapPinChanged.bind(this)} /></div>
                <div className='save-btn'><Button s={12} className='green' waves="light" onClick={this.updatePlace.bind(this)}>Guardar</Button></div>
            </Row>
        );
    }
}

export default PlaceForm;