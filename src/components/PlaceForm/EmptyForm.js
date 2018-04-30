import React, { Component } from 'react';
import './PlaceForm.css';
import { Row, Input, Tabs, Tab, Button} from 'react-materialize';

class EmptyForm extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
            <Tabs className='tab-demo z-depth-1'>
                <Tab title="Información Principal">
                    <Row>
                        <Input s={6} label="Nombre" />
                        <Input s={6} label="Telefono" />
                        <Input label="Descripción" s={12} />
                        <Input label="Dirección" s={12} />
                        <Input label="Sitio Web" s={12} />
                        <Button className='green' waves="light">Guardar</Button>
                    </Row>
                </Tab>
                <Tab title="Imagenes">
                    <p>Imágenes:</p>
                    <input type="file" accept="image/jpeg, image/jpg"/>
                    <Button className='green' waves="light">Guardar</Button>
                </Tab>
                <Tab title="Features"></Tab>
                <Tab title="Horarios">Test 4</Tab>
            </Tabs>
            </div>
        );
    }
}

export default EmptyForm;