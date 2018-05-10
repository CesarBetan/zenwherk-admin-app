import React, { Component } from 'react';
import logo from '../../logo.svg';
import './Landing.css';
import axios from 'axios';
import queryString from 'query-string';
import { Button } from 'react-materialize';

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

    componentWillMount() {
        const parsedHash = queryString.parse(window.location.hash);
        this.remove_hash_from_url();
        if(parsedHash.access_token){
            localStorage.setItem("accesstoken", parsedHash.access_token);
        }

        if(localStorage.getItem("accesstoken")){
            if(!localStorage.getItem("user")) {
                const config = {
                    headers:{'Authorization':'Bearer ' + localStorage.getItem("accesstoken")}
                };
                axios.get("https://zenwherk-auth-app.herokuapp.com/user", config)
                    .then(resp => {
                        localStorage.setItem("user", resp.data.principal.uuid);
                        this.props.history.push('/dashboard');
                    }).catch((error) => console.log(error))
            } else {
                this.props.history.push('/dashboard');
            }
        }
    }

    renderLoginPage() {
        return (<Button node='a' href="https://zenwherk-auth-app.herokuapp.com/oauth/authorize?client_id=zenwherk&response_type=token&redirect_uri=https://zenwherk-admin.firebaseapp.com/">Login</Button>);
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">ZenWherk Admin</h1>
                </header>
                <div className="App-intro">
                    <h1 className="Slogan">Busca. Compara. Revoluciona.</h1>
                    {
                        this.renderLoginPage()
                    }
                </div>
            </div>
        );
    }
}

export default Landing;
