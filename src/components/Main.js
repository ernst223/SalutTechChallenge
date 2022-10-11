import React, { Component, useState, useEffect } from "react";
import axios from 'axios';

class Main extends Component {
    constructor() {
        super();
        this.state = {
            myTokenText: 'Token still needed',
            myResponseBody: ''
        }
    }

    render() {
        return (
            <div className="App-header">
                <button onClick={this.submitTokenRequest}>Get Token</button>
                <p>{this.state.myTokenText}</p>
                <button onClick={this.submitGetRequest}>Make Post Request</button>
                {this.state.myResponseBody}
            </div>
        )
    }
    
    submitTokenRequest = e => {
        console.log('Token Request');
        let body = {
            grant_type: 'password',
            client_id: 'salutmobile',
            username: 'Craigneill+tst3@gmail.com',
            password: 'Test123!!',
            client_secret: 'Qj2CcT86pgnaU2jS'
        }
        axios.post('https://salut-iam-tst.gezondmetsalut.nl/api/connect/token', body)
            .then(response => {
                console.log(response);
                localStorage.setItem('myToken', response.data.token);
                this.setState({myTokenText : 'Token Received!..'});
            })
            .catch(error => {
                console.log(error);
            })
    }

    submitGetRequest = e => {
        let data = [];
        const headers = { 
            'Authorization': 'Bearer ' + localStorage.getItem('myToken')
        };
        axios.get('https://salut-health-tst.gezondmetsalut.nl/api/KeyValue', { headers })
            .then(response => {
                console.log(response);
                data = response.data;
                this.setState({myResponseBody:
                <table>
                    <thead>
                        <tr>
                            <td>key</td>
                            <td>createdByID</td>
                        </tr>
                    </thead>
                    <tbody>
                            {data.map(entry => (
                                <tr>
                                    <td>{entry.key}</td>
                                    <td>{entry.createdByID}</td>
                                </tr>
                            ))}
                        </tbody>
                </table>});
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export default Main
