import React, { Component } from 'react';
import './Dashboard.css';
import NavBar from '../Shared/Navbar/Navbar'
import { Col, Row, Collection, CollectionItem, Button, Toast } from 'react-materialize';
import {apis as api} from "../../Utils/apis";
import axios from 'axios';
import { LineChart, XAxis, YAxis, Tooltip, CartesianGrid, Line, Legend, Label } from 'recharts';
import PlaceProposalCollection from "../PlaceProposalCollection/PlaceProposalCollection";

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.api = api.zenwherk_api;
        this.config = {
            headers:{'Authorization':'Bearer ' + localStorage.getItem("accesstoken")}
        };
        this.state = {placeProposals: [], data: []};
    }

    componentWillMount() {
        if(!localStorage.getItem('accesstoken') || !localStorage.getItem('user')){
            this.props.history.push('/landing');
        }
        this.getPlaceProposals();
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

    getPlaceProposals() {
        axios.get(`${this.api}place_proposals`, this.config).then( ({data: result}) => {
            this.setState({placeProposals: result.result});
        }).catch( err => {
            window.Materialize.toast('Error al obtener Place_Proposals', 3000);
        });
    }

    forPlaceProposals() {
        return this.state.placeProposals.map(place => {
            return (
                <PlaceProposalCollection
                    place = { place }
                    onApprove={this.deletePlace.bind(this)}
                    onDecline={this.deletePlace.bind(this)}
                />
            );
        });
    }

    deletePlace(uuid) {
        const proposals = this.state.placeProposals.filter((place) => place.uuid !== uuid);
        this.setState({ placeProposals: proposals });
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
                    <Col m={6} s={12} className="proposals-container">
                        <h4>Place Proposals</h4>
                        <Collection className="collection">
                            {this.forPlaceProposals()}
                        </Collection>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Dashboard;