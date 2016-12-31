import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    Picker,
    Button,
    InteractionManager
} from 'react-native';
import ChatContainer from './containers/chatContainer.js'
/* const SERVER = 'http://ec2-52-211-250-0.eu-west-1.compute.amazonaws.com:3000/'*/

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: null
        };
        this.updatePosition()
        this.positionUpdater = setInterval(this.updatePosition.bind(this), 30000)
    }

    componentWillUnmount() {
        clearInterval(this.positionUpdater)
    }

    updatePosition() {
        navigator.geolocation.getCurrentPosition(position => {
                this.setState({location: position})
            },
            error => console.log(error),
            {enableHighAccuracy: false, timeout: 120000}
        )
    }

    render() {
        return (
            <ChatContainer location={this.state.location}/>
        );
    }
}

