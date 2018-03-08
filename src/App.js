import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CreatePlace from './components/CreatePlace';
import EditPlace from './components/EditPlace';
import Place from './components/Place';
import SearchResults from './components/SearchResults';
import ChangeRequest from './components/ChangeRequest';
import SearchUsersResults from './components/SearchUsersResults';
import Account from './components/Account';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Switch>
                        <Route exact path="/" component={Login}/>
                        <Route exact path="/dashboard" component={Dashboard}/>
                        <Route path="/place/create" component={CreatePlace}/>
                        <Route path="/place/:id/edit" component={EditPlace}/>
                        <Route path="/place/:id" component={Place}/>
                        <Route path="/search_place" component={SearchResults}/>
                        <Route path="/search_users" component={SearchUsersResults}/>
                        <Route path="/change_request/:id" component={ChangeRequest}/>
                        <Route path="/account" component={Account}/>
                        <Redirect from='*' to='/' />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
