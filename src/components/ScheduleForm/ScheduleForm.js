import React, { Component } from 'react';
import { Row, Col, Button} from 'react-materialize';
import TimePicker from 'react-time-picker';
import {apis as api} from "../../Utils/apis";
import axios from "axios/index";

class ScheduleForm extends Component {

    constructor(props) {
        super(props);
        this.baseUrl = api.zenwherk_api;
        this.config = {
            headers:{'Authorization':'Bearer ' + localStorage.getItem("accesstoken")}
        };
        this.state = {
            schedules: [],
            monOpen: "00:00",
            monClose: "00:00",
            tusOpen: "00:00",
            tusClose: "00:00",
            wedOpen: "00:00",
            wedClose: "00:00",
            thuOpen: "00:00",
            thuClose: "00:00",
            friOpen: "00:00",
            friClose: "00:00",
            satOpen: "00:00",
            satClose: "00:00",
            sunOpen: "00:00",
            sunClose: "00:00",
        }
    }

    changeTimeMonOpen(e) {
        this.setState({monOpen: e});
    }

    changeTimeMonClose(e) {
        this.setState({monClose: e});
    }

    changeTimeTusOpen(e) {
        this.setState({tusOpen: e});
    }

    changeTimeTusClose(e) {
        this.setState({tusClose: e});
    }

    changeTimeWedOpen(e) {
        this.setState({wedOpen: e});
    }

    changeTimeWedClose(e) {
        this.setState({wedClose: e});
    }

    changeTimeThuOpen(e) {
        this.setState({thuOpen: e});
    }

    changeTimeThuClose(e) {
        this.setState({thuClose: e});
    }

    changeTimeFriOpen(e) {
        this.setState({friOpen: e});
    }

    changeTimeFriClose(e) {
        this.setState({friClose: e});
    }

    changeTimeSatOpen(e) {
        this.setState({satOpen: e});
    }

    changeTimeSatClose(e) {
        this.setState({satClose: e});
    }

    changeTimeSunOpen(e) {
        this.setState({sunOpen: e});
    }

    changeTimeSunClose(e) {
        this.setState({sunClose: e});
    }

    sendSchedule() {
        let schedules = [
            {
                day: 1,
                openTime: "1970-01-01 "+this.state.monOpen,
                closeTime: "1970-01-01 "+this.state.monClose,
                place: {
                    uuid: this.props.place_uuid
                },
                user: {
                    uuid: localStorage.getItem('user')
                }
            },
            {
                day: 2,
                openTime: "1970-01-01 "+this.state.tusOpen,
                closeTime: "1970-01-01 "+this.state.tusClose,
                place: {
                    uuid: this.props.place_uuid
                },
                user: {
                    uuid: localStorage.getItem('user')
                }
            },
            {
                day: 3,
                openTime: "1970-01-01 "+this.state.wedOpen,
                closeTime: "1970-01-01 "+this.state.wedClose,
                place: {
                    uuid: this.props.place_uuid
                },
                user: {
                    uuid: localStorage.getItem('user')
                }
            },
            {
                day: 4,
                openTime: "1970-01-01 "+this.state.thuOpen,
                closeTime: "1970-01-01 "+this.state.thuClose,
                place: {
                    uuid: this.props.place_uuid
                },
                user: {
                    uuid: localStorage.getItem('user')
                }
            },
            {
                day: 5,
                openTime: "1970-01-01 "+this.state.friOpen,
                closeTime: "1970-01-01 "+this.state.friClose,
                place: {
                    uuid: this.props.place_uuid
                },
                user: {
                    uuid: localStorage.getItem('user')
                }
            },
            {
                day: 6,
                openTime: "1970-01-01 "+this.state.satOpen,
                closeTime: "1970-01-01 "+this.state.satClose,
                place: {
                    uuid: this.props.place_uuid
                },
                user: {
                    uuid: localStorage.getItem('user')
                }
            },
            {
                day: 7,
                openTime: "1970-01-01 "+this.state.sunOpen,
                closeTime: "1970-01-01 "+this.state.sunClose,
                place: {
                    uuid: this.props.place_uuid
                },
                user: {
                    uuid: localStorage.getItem('user')
                }
            }
        ];

        schedules.forEach(schedule => {
            axios.post(`${this.baseUrl}place_schedule`, schedule, this.config).then( res => {
                window.Materialize.toast('Horario enviado', 3000);
            }).catch( err => {
                window.Materialize.toast('Server Error: '+err.message, 3000);
            });
        });
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
                    <Col s={6}><TimePicker value={time} onChange={this.changeTimeMonClose.bind(this)}/></Col>
                </Row>
                <Row>
                    <p>Martes</p>
                    <Col s={6}><TimePicker value={time} onChange={this.changeTimeTusOpen.bind(this)}/></Col>
                    <Col s={6}><TimePicker value={time} onChange={this.changeTimeTusClose.bind(this)}/></Col>
                </Row>
                <Row>
                    <p>Miércoles</p>
                    <Col s={6}><TimePicker value={time} onChange={this.changeTimeWedOpen.bind(this)}/></Col>
                    <Col s={6}><TimePicker value={time} onChange={this.changeTimeWedClose.bind(this)}/></Col>
                </Row>
                <Row>
                    <p>Jueves</p>
                    <Col s={6}><TimePicker value={time} onChange={this.changeTimeThuOpen.bind(this)}/></Col>
                    <Col s={6}><TimePicker value={time} onChange={this.changeTimeThuClose.bind(this)}/></Col>
                </Row>
                <Row>
                    <p>Viernes</p>
                    <Col s={6}><TimePicker value={time} onChange={this.changeTimeFriOpen.bind(this)}/></Col>
                    <Col s={6}><TimePicker value={time} onChange={this.changeTimeFriClose.bind(this)}/></Col>
                </Row>
                <Row>
                    <p>Sábado</p>
                    <Col s={6}><TimePicker value={time} onChange={this.changeTimeSatOpen.bind(this)}/></Col>
                    <Col s={6}><TimePicker value={time} onChange={this.changeTimeSatClose.bind(this)}/></Col>
                </Row>
                <Row>
                    <p>Domingo</p>
                    <Col s={6}><TimePicker value={time} onChange={this.changeTimeSunOpen.bind(this)}/></Col>
                    <Col s={6}><iTimePicker value={time} onChange={this.changeTimeSunClose.bind(this)}/></Col>
                </Row>
                <Row className="center">
                    <Button className='green' waves="light" onClick={this.sendSchedule.bind(this)}>Guardar</Button>
                </Row>
            </div>
        )
    }

}
export default ScheduleForm
