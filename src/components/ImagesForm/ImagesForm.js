import React, { Component } from 'react';
import axios from "axios/index";
import { Button, Row } from 'react-materialize';
import {apis as api} from "../../Utils/apis";

class ImagesForm extends Component {

    constructor(props) {
        super(props);
        this.baseUrl = api.zenwherk_api;
        this.config = {
            headers:{'Authorization':'Bearer ' + localStorage.getItem("accesstoken")}
        };
        this.state = {images: []}
    }

    updateImage(e) {
        const tempImgs = [];
        Array.from(e.target.files).forEach( file => {
            this.getBase64(file).then( res => {
                tempImgs.push(res);
                this.setState({images: tempImgs});
                console.log(this.state.images);
            })
        });
    }

    postImage() {
        this.state.images.forEach( img => {
            const payload = {
                place: {
                    uuid: this.props.place_uuid
                },
                user: {
                    uuid: localStorage.getItem('user')
                },
                extension: "jpeg",
                base64: img

            };
            axios.post(`${this.baseUrl}picture`, payload, this.config).then( res => {
                window.Materialize.toast('Imagen enviada', 3000);
            }).catch( err => {
                window.Materialize.toast('Server Error: '+err.data, 3000);
            });
        })
    }

    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    render() {
        return (
            <div>
                <p>Imágenes:</p>
                <input type="file" accept="image/jpeg" multiple onChange={this.updateImage.bind(this)}/>
                <Row className="center">
                    <Button className='green' waves="light" onClick={this.postImage.bind(this)}>Guardar</Button>
                </Row>
            </div>
        )
    }

}
export default ImagesForm
