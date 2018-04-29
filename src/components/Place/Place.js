import React, { Component } from 'react';
import './Place.css';
import { Card, Col, CardTitle, Row, Button, Chip, Input, Icon, Modal } from 'react-materialize';
import NavBar from '../Shared/Navbar/Navbar';
import axios from 'axios';
import { apis as api } from '../../Utils/apis';
import noPic from './noPic.jpg';

class Place extends Component {

    constructor(props) {
        super(props);
        this.baseUrl = api.zenwherk_api;
        this.state = {places: [], inputValue: ''};
    }

    componentWillMount() {
        if(!localStorage.getItem('accesstoken') || !localStorage.getItem('user')){
            this.props.history.push('/landing');
        }
        axios.get(`${this.baseUrl}public/place`).then( ({data}) => {
            this.setState({places: data.result});
        }).catch( err => {
           console.log(err);
        });
    }

    forPlace() {
        return this.state.places.map((place) => {
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
                                header='Modal Header'
                                fixedFooter
                                trigger={<Button floating
                                                 small
                                                 className='blue'
                                                 waves='light'
                                                 icon='edit'/>}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                            </Modal>
                            <Modal
                                header='Modal Header'
                                bottomSheet
                                trigger={<Button floating
                                                 small
                                                 className='red'
                                                 waves='light'
                                                 icon='delete'/>}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                            </Modal>
                        </div>
                    </Card>
                </Col>);
        })
    }

    updateInputValue(event) {
        this.setState({
            inputValue: event.target.value
        });
    }

    searchPlace() {
        axios.get(`${this.baseUrl}public/place?name=${this.state.inputValue}`)
            .then( ({data}) => {
                this.setState({places: data.result});
            }).catch( err => {
                console.log(err);
        });
    }

    render() {
        return (
            <div>
                <NavBar history={this.props.history}/>
                    <Row className="inputRow">
                        <div className="input" m={12} >
                            <Input
                                label="Buscar Lugar..."
                                value={this.state.inputValue}
                                onChange={event => this.updateInputValue(event)}
                                onKeyPress={event => {
                                    if (event.key === 'Enter') {
                                        this.searchPlace()
                                    }
                                }}>
                                <Icon>search</Icon>
                            </Input>
                        </div>
                    </Row>
                <Row>
                    {this.forPlace()}
                </Row>
                <div><Button floating fab='horizontal' icon='add' className='red' large style={{bottom: '45px', right: '24px'}}>
                </Button></div>
            </div>
        );
    }
}

export default Place;
