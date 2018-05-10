import React, { Component } from 'react';
import './DraggableMap.css';
import PropTypes from "prop-types";

class DraggableMap extends Component {

    placeMarker(event) {
        if (this.state.marker == null) {
            const google = window.google;
            const location = event.latLng;
            var marker = new google.maps.Marker({
                position: location,
                map: this.map,
                draggable:true,
                animation: google.maps.Animation.DROP,
            });
            marker.addListener('click', this.toggleBounce);
            marker.addListener('dragend', this.handleEvent.bind(this));
            this.setState({marker : marker});
            this.map.setCenter(location);
            this.props.onMapPinChanged(event.latLng.toString());
        }
    }

    handleEvent(event){
        this.props.onMapPinChanged(event.latLng.toString());
    }

    createInitialMarker(event) {
        if (this.state.marker == null) {
            const google = window.google;
            const location = event.latLng;
            var marker = new google.maps.Marker({
                position: location,
                map: this.map,
                draggable:false, // Change to true in create view.
                animation: google.maps.Animation.DROP,
            });
            this.setState({marker : marker});
            this.map.setCenter(location);
        }
    }

    toggleBounce() {
        const google = window.google;
        const marker = this.state.marker;
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
            window.setTimeout(this.toggleBounce, 500);
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            marker: null,
        };
        this.createInitialMarker = this.createInitialMarker.bind(this);
        this.placeMarker = this.placeMarker.bind(this);
        this.toggleBounce = this.toggleBounce.bind(this);
    }

    componentDidMount() {
        const INIT_POS = {
            lat: 19.426426,
            lng: -99.167164
        };
        const google = window.google;
        this.map = new google.maps.Map(this.refs.map, {
            mapTypeControl: false,
            fullscreenControl: false,
            streetViewControl: false,
            center: INIT_POS,
            zoom: 16
        });
        google.maps.event.addListener(this.map, 'click', this.placeMarker);
    }
    render() {
        return (
            <div ref="map" className="map"/>
        );
    }
}

DraggableMap.defaultProps = {
    onMapPinChanged: () => {
        console.log("Se espera función onMapPinChanged");
    }
};

DraggableMap.propTypes = {
    onMapPinChanged: PropTypes.func.isRequired
};

export default DraggableMap;
