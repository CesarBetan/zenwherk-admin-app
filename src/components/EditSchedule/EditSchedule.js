import React, { Component } from 'react';
import { Row, Col, Button} from 'react-materialize';
import TimePicker from 'react-time-picker';
import {apis as api} from "../../Utils/apis";
import axios from "axios/index";
import PropTypes from "prop-types";

class EditSchedule extends Component {

    constructor(props) {
        super(props);
        this.baseUrl = api.zenwherk_api;
        this.schedules = this.props.schedules;
        this.config = {
            headers:{'Authorization':'Bearer ' + localStorage.getItem("accesstoken")}
        };
        this.state = {
            openTime: "",
            closeTime: ""
        }
    }

    changeTimeOpen(e) {
        this.setState({openTime: e});
    }

    changeTimeClose(e) {
        this.setState({closeTime: e});
    }

    forTimePicker() {
        return this.schedules.map(s => {
            return (
                <div key={s.uuid}>
                    <Row>
                        <p>{s.day}</p>
                        <Col s={4}>
                            <TimePicker value={""} onChange={this.changeTimeOpen.bind(this)} />
                        </Col>
                        <Col s={4}>
                            <TimePicker value={""} onChange={this.changeTimeClose.bind(this)}/>
                        </Col>
                        <Col s={4}>
                            <Button className='green' waves="light" onClick={() => this.sendSchedule(s.uuid)}>Guardar</Button>
                        </Col>
                    </Row>
                </div>
            );
        });
    }

    sendSchedule(uuid) {
        let payload = {
                openTime: "1970-01-01 "+this.state.openTime,
                closeTime: "1970-01-01 "+this.state.closeTime,
        };

        axios.put(`${this.baseUrl}place_schedule/${uuid}`, payload, this.config).then( res => {
            window.Materialize.toast('Horario enviado', 3000);
        }).catch( err => {
            window.Materialize.toast('Server Error: '+err.message, 3000);
        });
    }

    render() {
        return(
            <div>
                {this.forTimePicker()}
            </div>
        )
    }

}

EditSchedule.defaultProps = {
    schedules: []
};

EditSchedule.propTypes = {
    schedules: PropTypes.array.isRequired
};

export default EditSchedule
