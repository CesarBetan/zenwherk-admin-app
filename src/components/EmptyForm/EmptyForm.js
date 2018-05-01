import React, { Component } from 'react';
import './EmptyForm.css';
import { Row, Input, Tabs, Tab, Button} from 'react-materialize';
import DraggableMap from "../DraggableMap/DraggableMap";

class EmptyForm extends Component {

    constructor(props) {
        super(props);
        this.state = {latitude: "", longitude: "", place_uuid: ""};
    }

    onMapPinChanged(location) {
        console.log(location);
        location = location.replace(/\s/g, '');
        location = location.slice(1,-1);
        location= location.split(",");
        this.setState({latitude: location[0]});
        this.setState({longitude: location[1]});
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !(this.state.latitude !== nextState.latitude || this.state.longitude !== nextState.longitude);
    }

    postPlace() {

    }

    render() {
        return (
            <div>
            <Tabs className='z-depth-1'>
                <Tab title="Información Principal" active>
                    <Row>
                        <Input s={6} label="Nombre"/>
                        <Input s={6} type='select' label='Categoría'>
                            <option value='1'>Option 1</option>
                            <option value='2'>Option 2</option>
                            <option value='3'>Option 3</option>
                        </Input>
                        <Input s={12} label="Teléfono" />
                        <Input label="Descripción" s={12} />
                        <Input label="Sitio Web" s={12} />
                        <Input label="Dirección" s={12} />
                        <p className='map-exp'>Indica la posición del lugar en el mapa:</p>
                        <div className="map"><DraggableMap onMapPinChanged={this.onMapPinChanged.bind(this)} /></div>
                        <div className='save-btn'><Button s={12} className='green' waves="light" onClick={this.postPlace.bind(this)}>Guardar</Button></div>
                    </Row>
                </Tab>
                <Tab title="Imagenes">
                    {
                        (this.state.place_uuid) ?
                            <div>
                                <p>Imágenes:</p>
                                <input type="file" accept="image/jpeg, image/jpg"/>
                                <Button className='green' waves="light">Guardar</Button>
                            </div>
                        :
                            <h5 className="else-title">Favor de completar la información principal primero</h5>
                    }
                </Tab>
                <Tab title="Features">
                    {
                        (this.state.place_uuid) ?
                            <div>
                                <p>Imágenes:</p>
                                <input type="file" accept="image/jpeg, image/jpg"/>
                                <Button className='green' waves="light">Guardar</Button>
                            </div>
                            :
                            <h5 className="else-title">Favor de completar la información principal primero</h5>
                    }
                </Tab>
                <Tab title="Horarios">
                    {
                        (this.state.place_uuid) ?
                            <div>
                                <p>Imágenes:</p>
                                <input type="file" accept="image/jpeg, image/jpg"/>
                                <Button className='green' waves="light">Guardar</Button>
                            </div>
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
