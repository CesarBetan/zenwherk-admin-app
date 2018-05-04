import React, { Component } from 'react';
import './Place.css';
import { Card, Col, CardTitle, Button, Chip, Modal, Tab, Tabs, Row} from 'react-materialize';
import noPic from '../../Assets/noPic.jpg';
import PlaceForm from '../PlaceForm';
import { apis as api} from '../../Utils/apis';
import axios from 'axios';
import ImagesForm from "../ImagesForm/ImagesForm";
import EditSchedule from "../EditSchedule/EditSchedule";

class Place extends Component {

    constructor(props) {
        super(props);
        this.api = api.zenwherk_api;
        this.config = {
            headers:{'Authorization':'Bearer ' + localStorage.getItem("accesstoken")}
        };
    }

    deletePlace() {
        const { uuid } = this.props.place;
        axios.delete(`${this.api}place/${uuid}`, this.config).then( res => {
            window.Materialize.toast('Lugar Eliminado', 3000);
            this.props.onDeletePlace(uuid);
        }).catch( err => {
            window.Materialize.toast('Error al eliminar', 3000);
        })
    }

    render () {
        const { place } = this.props;
        return (
            <Col key={place.uuid} m={4} s={12} className="place-card">
                <Card horizontal header={<CardTitle image={ (place.pictures.length > 0) ? place.pictures[0].url : noPic }>{place.name}</CardTitle>}>
                    <p>{place.description}</p>
                    <p>{place.address}</p>
                    <p>{place.website}</p>
                    <p>{place.phone}</p>
                    <p>FEATURES</p>
                    <Chip>Wi-Fi</Chip><Chip>Coffee</Chip>
                    <Row className='center'>
                        <Col s={6}>
                            <Modal
                                header='Editar'
                                fixedFooter
                                trigger={<Button floating
                                                 small
                                                 className='blue'
                                                 waves='light'
                                                 icon='edit'/>}>
                                <Tabs className='z-depth-1'>
                                    <Tab title="Información principal">
                                        <PlaceForm place = { place }/>
                                    </Tab>
                                    <Tab title="Imagenes">
                                        <ImagesForm place_uuid = {place.uuid}/>
                                    </Tab>
                                    <Tab title="Horarios">
                                        <EditSchedule schedules = { place.schedules }/>
                                    </Tab>
                                    <Tab title="Features">
                                    </Tab>
                                </Tabs>
                            </Modal>
                        </Col>
                        <Col s={6}>
                            <Modal
                                header='¿Está seguro de borrar este lugar?'
                                bottomSheet
                                trigger={<Button floating
                                                 small
                                                 className='red'
                                                 waves='light'
                                                 icon='delete'/>}>
                                <p>Al borrar este lugar no se podrá recuperar.</p>
                                <Button className='red' waves="light" onClick={this.deletePlace.bind(this)}>Borrar</Button>
                            </Modal>
                        </Col>
                    </Row>
                </Card>
            </Col>)
    }

}

export default Place;
