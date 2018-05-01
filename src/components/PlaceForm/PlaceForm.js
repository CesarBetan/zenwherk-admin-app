import React, { Component } from 'react';
import './PlaceForm.css';
import { Row, Input} from 'react-materialize';

class PlaceForm extends Component {

    render() {
        const { place } = this.props;
        return (
            <Row>
                <Input placeholder={place.name} s={6} label="Nombre" />
                <Input s={6} type='select' label='Categoría'>
                    <option value='1'>Option 1</option>
                    <option value='2'>Option 2</option>
                    <option value='3'>Option 3</option>
                </Input>
                <Input s={12} placeholder={place.phone} label="Teléfono" />
                <Input placeholder={place.description} label="Descripción" s={12} />
                <Input placeholder={place.address} label="Dirección" s={12} />
                <Input placeholder={place.website} label="Sitio Web" s={12} />
            </Row>
        );
    }
}

export default PlaceForm;