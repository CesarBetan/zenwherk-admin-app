import React, { Component } from 'react';
import { Row, Input, Tabs, Tab, Button, Col} from 'react-materialize';
import { features } from "../../Utils/features";
import axios from 'axios';
import {apis as api} from "../../Utils/apis";
import PropTypes from "prop-types";

class FeatureForm extends Component {

    constructor() {
        super();
        this.features = features;
        this.baseUrl = api.zenwherk_api;
        this.config = {
            headers:{'Authorization':'Bearer ' + localStorage.getItem("accesstoken")}
        };
        this.state = {
            features: [{ description: '' , value: 1}],
        };
    }

    handleFeatureDescriptionChange = (idx) => (evt) => {
        const newfeatures = this.state.features.map((feature, sidx) => {
            if (idx !== sidx) return feature;
            return { ...feature, description: evt.target.value };
        });

        this.setState({ features: newfeatures });
    };

    handleFeatureValueChange = (idx) => (evt) => {
        const newfeatures = this.state.features.map((feature, sidx) => {
            if (idx !== sidx) return feature;
            return { ...feature, value: evt.target.value };
        });

        this.setState({ features: newfeatures });
    };

    handleAddFeature = () => {
        this.setState({ features: this.state.features.concat([{ description: '' }]) });
    };

    handleRemoveFeature = (idx) => () => {
        this.setState({ features: this.state.features.filter((s, sidx) => idx !== sidx) });
    };

    forFeatures(){
        return this.features.map(feature => {
            return (
                <option value={feature.id}>{feature.name}</option>
            )
        })
    }

    postFeatures() {
        this.state.features.map(feature => {
            const payload = {
                featureDescription: feature.description,
                featureEnum: feature.value,
                place: {
                    uuid: this.props.place_uuid
                },
                user: {
                    uuid: localStorage.getItem('user')
                }
            };
            axios.post(`${this.baseUrl}place_feature`, payload, this.config).then(res => {
                window.Materialize.toast('Feature Enviado', 3000);
            }).catch(err => {
                window.Materialize.toast('Server Error: '+err.message, 3000);
            })
        });

    };

    render() {
        return (
            <div>
                <form>
                    {this.state.features.map((feature, idx) => (
                        <Row >
                            <Col>
                                <Input s={12} type='select' onChange={this.handleFeatureValueChange(idx)}>
                                    {this.forFeatures()}
                                </Input>
                            </Col>
                            <Col s={6}>
                                <input
                                    type="text"
                                    placeholder={`Feature #${idx + 1} Description`}
                                    value={feature.description}
                                    onChange={this.handleFeatureDescriptionChange(idx)}
                                />
                            </Col>
                            <Button type="button" waves='light' className="red" onClick={this.handleRemoveFeature(idx)}>-</Button>
                        </Row>
                    ))}
                    <Button type="button" waves='light' onClick={this.handleAddFeature}>+</Button>
                </form>
                <Row className="center"><Button waves='light' className="green" onClick={this.postFeatures.bind(this)}>Guardar</Button></Row>
            </div>
        )
    }

}

FeatureForm.defaultProps = {
    place_uuid: ''
};

FeatureForm.propTypes = {
    place_uuid: PropTypes.string.isRequired
};

export default FeatureForm
