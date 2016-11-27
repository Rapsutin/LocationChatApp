import React, { Component } from 'react';
import {
    AppRegistry,
} from 'react-native';
import App from './app/app'

export default class LocationChat extends Component {
    render() {
        return (
            <App></App>
        );
    }
}

AppRegistry.registerComponent('LocationChat', () => LocationChat);
