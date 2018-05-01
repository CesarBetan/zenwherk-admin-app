import React, { Component } from 'react';
import './Dashboard.css';
import NavBar from '../Shared/Navbar/Navbar'
import { Col, Row, Collection, CollectionItem, Button, Toast } from 'react-materialize';
import {apis as api} from "../../Utils/apis";
import axios from 'axios';
import { LineChart, XAxis, YAxis, Tooltip, CartesianGrid, Line, Legend, Label } from 'recharts';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.api = api.zenwherk_api;
        this.config = {
            headers:{'Authorization':'Bearer ' + localStorage.getItem("accesstoken")}
        };
        this.state = {placeFeatures: [], placeSchedule: [], placeProposals: [], featureChanges: [], scheduleChanges: [], placeChanges: [], data: []};
    }

    componentWillMount() {
        if(!localStorage.getItem('accesstoken') || !localStorage.getItem('user')){
            this.props.history.push('/landing');
        }
        this.getPlaceFeatures();
        this.getFeatureChange();
        this.getPlaceChange();
        this.getPlaceProposals();
        this.getPlaceSchedule();
        this.getScheduleChange();
        this.getStats();
    }

    getStats() {
        axios.get(`${this.api}stats`, this.config).then(({data: result}) => {
            const newData = result.result.map(({date, users}) => ({
                name: date,
                u: users
            }));
            this.setState({ data: newData });
        }).catch(err => {
            console.log(err);
            window.Materialize.toast('Error al obtener estadísticas', 3000);
        });
    }

    getPlaceFeatures() {
        axios.get(`${this.api}place_feature?q=changes`, this.config).then( ({result}) => {
            this.setState({placeFeatures: result});
        }).catch( err => {
            window.Materialize.toast('Error al obtener Place_Features', 3000);
        });
    }

    getPlaceSchedule() {
        axios.get(`${this.api}place_schedule?q=changes`, this.config).then( ({result}) => {
            this.setState({placeSchedule: result});
        }).catch( err => {
            window.Materialize.toast('Error al obtener Place_Schedules', 3000);
        });
    }

    getPlaceProposals() {
        axios.get(`${this.api}place_proposals`, this.config).then( ({result}) => {
            this.setState({placeProposals: result});
        }).catch( err => {
            window.Materialize.toast('Error al obtener Place_Proposals', 3000);
        });
    }

    getFeatureChange() {
        axios.get(`${this.api}place_feature_change`, this.config).then( ({result}) => {
            this.setState({featureChanges: result});
        }).catch( err => {
            window.Materialize.toast('Error al obtener Feature_Change', 3000);
        });
    }

    getScheduleChange() {
        axios.get(`${this.api}place_schedule_change`, this.config).then( ({result}) => {
            this.setState({scheduleChanges: result});
        }).catch( err => {
            window.Materialize.toast('Error al obtener Schedule_Change', 3000);
        });
    }

    getPlaceChange() {
        axios.get(`${this.api}place_change`, this.config).then( ({result}) => {
            this.setState({placeChanges: result});
        }).catch( err => {
            window.Materialize.toast('Error al obtener Place_Change', 3000);
        });
    }

    render() {
        return (
            <div>
                <NavBar history={this.props.history}/>
                <Row>
                    <Col m={6} s={12} className="dashboard-graph-container">
                        <LineChart width={600} height={300} data={this.state.data}
                                   margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                            <Label value="fsdff" />
                            <XAxis dataKey="name"/>
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3"/>
                            <Tooltip/>
                            <Legend verticalAlign="top" height={36}/>
                            <Line type="monotone" dataKey="u" name="Usuarios nuevos" stroke="#00de91" activeDot={{r: 8}}/>
                        </LineChart>
                    </Col>
                </Row>
                <Row>
                    <Col m={4} s={12}>
                        <h5>Features</h5>
                        <Collection className="collection">
                            <CollectionItem>
                                <span><strong>wifi</strong></span>
                                <Button floating className='green' waves='light' icon='check' />
                                <Button floating className='red' waves='light' icon='clear' />
                            </CollectionItem>
                        </Collection>
                    </Col>
                    <Col m={4} s={12}>
                        <h5>Schedules</h5>
                        <Collection className="collection">
                            <CollectionItem>
                                <span><strong>wifi</strong></span>
                                <Button floating className='green' waves='light' icon='check' />
                                <Button floating className='red' waves='light' icon='clear' />
                            </CollectionItem>
                        </Collection>
                    </Col>
                    <Col m={4} s={12}>
                        <h5>Place Proposals</h5>
                        <Collection className="collection">
                            <CollectionItem>
                                <span><strong>wifi</strong></span>
                                <Button floating className='green' waves='light' icon='check' />
                                <Button floating className='red' waves='light' icon='clear' />
                            </CollectionItem>
                            <CollectionItem>
                                <p><strong>wifi</strong></p>
                            </CollectionItem>
                            <CollectionItem>
                                <p><strong>wifi</strong></p>
                            </CollectionItem>
                        </Collection>
                    </Col>
                </Row>
                <Row>
                    <Col m={4} s={12}>
                        <h5>Place Features</h5>
                        <Collection className="collection">
                            <CollectionItem>
                                <span><strong>wifi</strong></span>
                                <Button floating className='green' waves='light' icon='check' />
                                <Button floating className='red' waves='light' icon='clear' />
                            </CollectionItem>
                            <CollectionItem>
                                <p><strong>wifi</strong></p>
                            </CollectionItem>
                            <CollectionItem>
                                <p><strong>wifi</strong></p>
                            </CollectionItem>
                        </Collection>
                    </Col>
                    <Col m={4} s={12}>
                        <h5>Place Schedules</h5>
                        <Collection className="collection">
                            <CollectionItem>
                                <span><strong>wifi</strong></span>
                                <Button floating className='green' waves='light' icon='check' />
                                <Button floating className='red' waves='light' icon='clear' />
                            </CollectionItem>
                            <CollectionItem>
                                <p><strong>wifi</strong></p>
                            </CollectionItem>
                            <CollectionItem>
                                <p><strong>wifi</strong></p>
                            </CollectionItem>
                        </Collection>
                    </Col>
                    <Col m={4} s={12}>
                        <h5>Place Changes</h5>
                        <Collection className="collection">
                            <CollectionItem>
                                <span><strong>wifi</strong></span>
                                <Button floating className='green' waves='light' icon='check' />
                                <Button floating className='red' waves='light' icon='clear' />
                            </CollectionItem>
                            <CollectionItem>
                                <p><strong>wifi</strong></p>
                            </CollectionItem>
                            <CollectionItem>
                                <p><strong>wifi</strong></p>
                            </CollectionItem>
                        </Collection>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Dashboard;