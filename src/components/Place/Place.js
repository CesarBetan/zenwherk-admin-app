import React, { Component } from 'react';
import { Card, Col, CardTitle, Button, Chip, Modal} from 'react-materialize';
import noPic from '../../Assets/noPic.jpg';
import PlaceForm from '../PlaceForm';
import { apis as api} from '../../Utils/apis';
import axios from 'axios';

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
            <Col key={place.uuid} m={4} s={12}>
                <Card horizontal header={<CardTitle image={ (place.pictures.length > 0) ? place.pictures[0].url : noPic }>{place.name}</CardTitle>}>
                    <p>{place.description}</p>
                    <p>{place.address}</p>
                    <p>{place.website}</p>
                    <p>{place.phone}</p>
                    <p>FEATURES</p>
                    <Chip>Wi-Fi</Chip><Chip>Coffee</Chip>
                    <div>
                        <Modal
                            header='Editar'
                            fixedFooter
                            trigger={<Button floating
                                             small
                                             className='blue'
                                             waves='light'
                                             icon='edit'/>}>
                            <PlaceForm place = { place }/>
                        </Modal>
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
                    </div>
                </Card>
            </Col>)
    }

}

export default Place;
