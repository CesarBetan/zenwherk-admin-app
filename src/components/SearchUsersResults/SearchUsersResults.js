import React, { Component } from 'react';
import './SearchUsersResults.css';
import queryString from 'query-string';

class SearchUsersResults extends Component {

    renderQueryParams(){
        const parsed = queryString.parse(this.props.location.search);
        if(typeof parsed.q === 'string' && parsed.q.trim().length > 0) {
            return <span>Query params: { parsed.q }</span>
        }
        return "";
    }

    render() {

        return (
            <p>SearchUsersResults component! Please use q as a query params. {this.renderQueryParams()}</p>
        );
    }
}

export default SearchUsersResults;