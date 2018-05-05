import React, { Component } from 'react';
import './EmptyForm.css';
import { Row, Input, Tabs, Tab, Button} from 'react-materialize';
import DraggableMap from "../DraggableMap/DraggableMap";
import axios from 'axios';
import {apis as api} from "../../Utils/apis";
import ImagesForm from "../ImagesForm/ImagesForm";
import ScheduleForm from "../ScheduleForm/ScheduleForm";
import { categories as categories } from "../../Utils/categories";
import FeatureForm from "../FeatureForm/FeatureForm";

class EmptyForm extends Component {

    constructor(props) {
        super(props);
        this.baseUrl = api.zenwherk_api;
        this.state = {
            place_uuid: "",
            latitude: "",
            longitude: "",
            name: "",
            phone: "",
            description: "",
            address: "",
            webPage: "",
            category: 1,
            images: [],
            count: 1
        };
        this.config = {
            headers:{'Authorization':'Bearer ' + localStorage.getItem("accesstoken")}
        };
    }

    onMapPinChanged(location) {
        location = location.replace(/\s/g, '');
        location = location.slice(1,-1);
        location= location.split(",");
        this.setState({latitude: location[0]});
        this.setState({longitude: location[1]});
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

    postPlace() {
        const payload = {
            name: this.state.name,
            address: this.state.address,
            description: this.state.description,
            phone: '+52'+this.state.phone,
            category: this.state.category,
            website: this.state.webPage,
            latitude: parseFloat(this.state.latitude),
            longitude:  parseFloat(this.state.longitude),
            user: {
                uuid: localStorage.getItem('user')
            }
        };
        axios.post(`${this.baseUrl}place`, payload, this.config).then( ({data: result}) => {
            this.setState({place_uuid: result.uuid});
            window.Materialize.toast('Información principal enviada, puede continuar', 3000);
        }).catch( err => {
            window.Materialize.toast('Server Error: ' + err.message, 3000);
        });
    }

    render() {
        return (
            <div>
            <Tabs className='z-depth-1'>
                <Tab title="Información Principal">
                    <Row>
                        <Input s={6} label="Nombre" onChange={(e) => {this.setState({name: e.target.value})}}/>
                        <Input s={6} type='select' label='Categoría' onChange={(e) => {this.setState({category: e.target.value})}}>
                            <option value={categories[0].id}>{categories[0].name}</option>
                            <option value={categories[1].id}>{categories[1].name}</option>
                            <option value={categories[2].id}>{categories[2].name}</option>
                        </Input>
                        <Input s={12} label="Teléfono" onChange={(e) => {this.setState({phone: e.target.value})}}/>
                        <Input label="Descripción" s={12} onChange={(e) => {this.setState({description: e.target.value})}}/>
                        <Input label="Sitio Web" s={12} onChange={(e) => {this.setState({webPage: e.target.value})}}/>
                        <Input label="Dirección" s={12} onChange={(e) => {this.setState({address: e.target.value})}}/>
                        <p className='map-exp'>Indica la posición del lugar en el mapa:</p>
                        <div className="map"><DraggableMap onMapPinChanged={this.onMapPinChanged.bind(this)} /></div>
                        <div className='save-btn'><Button s={12} className='green' waves="light" onClick={this.postPlace.bind(this)}>Guardar</Button></div>
                    </Row>
                </Tab>
                <Tab title="Imagenes">
                    {
                        (this.state.place_uuid) ?
                            <div>
                                <ImagesForm place_uuid = {this.state.place_uuid}/>
                            </div>
                        :
                            <h5 className="else-title">Favor de completar la información principal primero</h5>
                    }
                </Tab>
                <Tab title="Features">
                    {
                        (this.state.place_uuid) ?
                            <div>
                                <FeatureForm place_uuid = {this.state.place_uuid}/>
                            </div>
                            :
                            <h5 className="else-title">Favor de completar la información principal primero</h5>
                    }
                </Tab>
                <Tab title="Horarios">
                    {
                        (this.state.place_uuid) ?
                            <ScheduleForm  place_uuid = {this.state.place_uuid}/>
                            :
                            <h5 className="else-title">Favor de completar la información principal primero</h5>
                    }
                </Tab>
            </Tabs>
            </div>
        );
    }
}

export default EmptyForm;
