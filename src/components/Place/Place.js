import React, { Component } from 'react';
import './Place.css';
import { Card, Col, CardTitle, Row, Button, Tag } from 'react-materialize';
import NavBar from '../Shared/Navbar/Navbar'

class Place extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <Row>
                    <Col m={4} s={12}>
                        <Card horizontal header={<CardTitle image={require('./870886.jpg')}>Starbucks Pedregal</CardTitle>}>
                            <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
                            <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
                            <p>FEATURES</p>
                            <Tag close={false}>Wi-Fi</Tag><Tag close={false}>Coffee</Tag>
                            <div>
                                <Button floating small className='blue' waves='light' icon='edit' />
                                <Button floating small className='red' waves='light' icon='delete' />
                            </div>
                        </Card>
                    </Col>
                    <Col m={4} s={12}>
                        <Card horizontal header={<CardTitle image={require('./870886.jpg')}>WeWork Reforma</CardTitle>}>
                            <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
                            <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
                            <Button floating small className='blue' waves='light' icon='edit' />
                            <Button floating small className='red' waves='light' icon='delete' />
                        </Card>
                    </Col>
                    <Col m={4} s={12}>
                        <Card horizontal header={<CardTitle image={require('./870886.jpg')}>Cielito Lindo</CardTitle>}>
                            <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
                            <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
                            <Button floating small className='blue' waves='light' icon='edit' />
                            <Button floating small className='red' waves='light' icon='delete' />
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Place;