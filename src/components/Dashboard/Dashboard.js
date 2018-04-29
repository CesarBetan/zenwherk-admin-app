import React, { Component } from 'react';
import './Dashboard.css';
import NavBar from '../Shared/Navbar/Navbar'
import { Col, Row, Collection, CollectionItem, Button } from 'react-materialize';

class Dashboard extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if(!localStorage.getItem('accesstoken') || !localStorage.getItem('user')){
            this.props.history.push('/landing');
        }
    }

    render() {
        return (
            <div>
                <NavBar history={this.props.history}/>
                <Row>
                    <Col m={4} s={12}>
                        <Collection header="Add or Delete Features">
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
                        <Collection header="Add or Delete Features">
                            <CollectionItem>
                                <p><strong>wifi</strong></p>
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
                        <Collection header="Add or Delete Features">
                            <CollectionItem>
                                <p><strong>wifi</strong></p>
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
                        <Collection header="Add or Delete Features">
                            <CollectionItem>
                                <p><strong>wifi</strong></p>
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
                        <Collection header="Add or Delete Features">
                            <CollectionItem>
                                <p><strong>wifi</strong></p>
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
                        <Collection header="Add or Delete Features">
                            <CollectionItem>
                                <p><strong>wifi</strong></p>
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