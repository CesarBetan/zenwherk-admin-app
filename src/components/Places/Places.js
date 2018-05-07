import React, { Component } from 'react';
import './Places.css';
import { Col, Row, Button, Input, Icon, Modal, ProgressBar } from 'react-materialize';
import NavBar from '../Shared/Navbar/Navbar';
import axios from 'axios';
import { apis as api } from '../../Utils/apis';
import Place from '../Place/Place';
import EmptyForm from "../EmptyForm/EmptyForm";

class Places extends Component {

    constructor(props) {
        super(props);
        this.baseUrl = api.zenwherk_api;
        this.state = {places: [], inputValue: '', loading: true};
    }

    componentWillMount() {
        if(!localStorage.getItem('accesstoken') || !localStorage.getItem('user')){
            this.props.history.push('/landing');
        }
        axios.get(`${this.baseUrl}public/place`).then( ({data}) => {
            this.setState({places: data.result, loading: false});
        }).catch( err => {
            console.log(err);
        });
    }

    forPlace() {
        return this.state.places.map((place) => {
            return (
                <Place place = { place } onDeletePlace={this.deletePlace.bind(this)}/>);
        })
    }

    deletePlace(uuid) {
        const places = this.state.places.filter((place) => place.uuid !== uuid);
        this.setState({ places });
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
                        <div className="input">
                            <Input
                                m={12}
                                label="Buscar Lugar..."
                                value={this.state.inputValue}
                                onChange={event => this.updateInputValue(event)}
                                onKeyPress={event => {
                                    if (event.key === 'Enter') {
                                        this.searchPlace()
                                    }
                                }}>
                            </Input>
                        </div>
                        {
                            (this.state.loading) ?
                                (<Col s={12} >
                                    <ProgressBar />
                                </Col>)
                                :
                                ""
                        }
                    </Row>
                <Row>
                    {this.forPlace()}
                </Row>
                <Modal
                    header='Nuevo Lugar'
                    fixedFooter
                    trigger={<Button floating
                                     className='red new-btn'
                                     large>+</Button>}>
                    <EmptyForm/>
                </Modal>
            </div>
        );
    }
}

export default Places;
