import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import Places from './components/Places';
import Landing from './components/Landing/Landing'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Switch>
                        <Route exact path="/" component={Landing}/>
                        <Route path="/dashboard" component={Dashboard}/>
                        <Route path="/places/" component={Places}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
