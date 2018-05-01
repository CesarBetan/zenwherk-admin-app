import React, { Component } from 'react';
import { Row, Col, Button} from 'react-materialize';
import TimePicker from 'react-time-picker';

class ScheduleForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            schedules: [],
            monOpen: "",
            monClose: "",
            tusOpen: "",
            tusClose: "",
            wedOpen: "",
            wedClose: "",
            thuOpen: "",
            thuClose: "",
            friOpen: "",
            friClose: "",
            satOpen: "",
            satClose: "",
            sunOpen: "",
            sunClose: "",
        }
    }

    changeTimeMonOpen(e) {
        this.setState({monOpen: e});
        console.log(this.state.monOpen);
    }

    changeTimeMonClose(e) {
        this.setState({monClose: e.target.value});
    }

    changeTimeTusOpen(e) {
        this.setState({tusOpen: e.target.value});
    }

    changeTimeTusClose(e) {
        this.setState({tusClose: e.target.value});
    }

    changeTimeWedOpen(e) {
        this.setState({wedOpen: e.target.value});
    }

    changeTimeWedClose(e) {
        this.setState({wedClose: e.target.value});
    }

    changeTimeThuOpen(e) {
        this.setState({thuOpen: e.target.value});
    }

    changeTimeThuClose(e) {
        this.setState({thuClose: e.target.value});
    }

    changeTimeFriOpen(e) {
        this.setState({friOpen: e.target.value});
    }

    changeTimeFriClose(e) {
        this.setState({friClose: e.target.value});
    }

    changeTimeSatOpen(e) {
        this.setState({satOpen: e.target.value});
    }

    changeTimeSatClose(e) {
        this.setState({satClose: e.target.value});
    }

    changeTimeSunOpen(e) {
        this.setState({sunOpen: e.target.value});
    }

    changeTimeSunClose(e) {
        this.setState({sunClose: e.target.value});
    }

    render() {
        const time = "";
        return(
            <div>
                <Row>
                    <p>Lunes</p>
                    <Col s={6}>
                        <TimePicker value={time} onChange={this.changeTimeMonOpen.bind(this)} />
                    </Col>
                    <Col s={6}><input name='on' type='time' onChange={this.changeTimeMonClose.bind(this)}/></Col>
                </Row>
                <Row>
                    <p>Martes</p>
                    <Col s={6}><input name='on' type='time' onChange={this.changeTimeTusOpen.bind(this)}/></Col>
                    <Col s={6}><input name='on' type='time' onChange={this.changeTimeTusClose.bind(this)}/></Col>
                </Row>
                <Row>
                    <p>Miércoles</p>
                    <Col s={6}><input name='on' type='time' onChange={this.changeTimeWedOpen.bind(this)}/></Col>
                    <Col s={6}><input name='on' type='time' onChange={this.changeTimeWedClose.bind(this)}/></Col>
                </Row>
                <Row>
                    <p>Jueves</p>
                    <Col s={6}><input name='on' type='time' onChange={this.changeTimeThuOpen.bind(this)}/></Col>
                    <Col s={6}><input name='on' type='time' onChange={this.changeTimeThuClose.bind(this)}/></Col>
                </Row>
                <Row>
                    <p>Viernes</p>
                    <Col s={6}><input name='on' type='time' onChange={this.changeTimeFriOpen.bind(this)}/></Col>
                    <Col s={6}><input name='on' type='time' onChange={this.changeTimeFriClose.bind(this)}/></Col>
                </Row>
                <Row>
                    <p>Sábado</p>
                    <Col s={6}><input name='on' type='time' onChange={this.changeTimeSatOpen.bind(this)}/></Col>
                    <Col s={6}><input name='on' type='time' onChange={this.changeTimeSatClose.bind(this)}/></Col>
                </Row>
                <Row>
                    <p>Domingo</p>
                    <Col s={6}><input name='on' type='time' onChange={this.changeTimeSunOpen.bind(this)}/></Col>
                    <Col s={6}><input name='on' type='time' onChange={this.changeTimeSunClose.bind(this)}/></Col>
                </Row>
                <Row className="center">
                    <Button className='green' waves="light">Guardar</Button>
                </Row>
            </div>
        )
    }

}
export default ScheduleForm
