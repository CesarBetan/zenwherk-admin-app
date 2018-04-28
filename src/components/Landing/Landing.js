import React, { Component } from 'react';
import logo from '../../logo.svg';
import './Landing.css';
import axios from 'axios'
import queryString from 'query-string'
import { Redirect } from 'react-router-dom';

class Landing extends Component {

    constructor(props){
        super(props);
        this.state = {user: ""}
    }

    remove_hash_from_url() {
        const uri = window.location.toString();
        if (uri.indexOf("#") > 0) {
            const clean_uri = uri.substring(0, uri.indexOf("#"));
            window.history.replaceState({}, document.title, clean_uri);
        }
    }

    componentWillMount(){
        const parsedHash = queryString.parse(window.location.hash);
        this.remove_hash_from_url();
        if(parsedHash.access_token){
            localStorage.setItem("accesstoken", parsedHash.access_token);
        }

        if(localStorage.getItem("accesstoken")){
            if(!localStorage.getItem("user")) {
                console.log('Will obtain user');
                const config = {
                    headers:{'Authorization':'Bearer ' + localStorage.getItem("accesstoken")}
                };
                axios.get("http://192.168.0.16:9999/user", config)
                    .then(resp => {
                        console.log('Updating local storage');
                        localStorage.setItem("user", resp.data.principal.uuid);
                        this.props.history.push('/dashboard');
                    }).catch((error) => console.log(error))
            } else {
                this.props.history.push('/dashboard');
            }
        }
    }

    renderLoginPage() {
        return (<a href="http://192.168.0.16:9999/oauth/authorize?client_id=zenwherk&response_type=token&redirect_uri=http://localhost:3000/">Login</a>);
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    {
                        this.renderLoginPage()
                    }
                </p>
            </div>
        );
    }
}

export default Landing;
