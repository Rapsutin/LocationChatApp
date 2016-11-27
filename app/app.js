import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    Button
} from 'react-native';
import MessageWindow from './components/messagewindow'
import Sender from './components/sender'
const SERVER = 'http://ec2-52-211-250-0.eu-west-1.compute.amazonaws.com:3000/'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: null,
            messages: []
        };
        console.log(this.state)
        this.initialize()
    }

    initialize() {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({position: position});
                this.getAllMessages()
            },
            error => this.initialize(),
            {enableHighAccuracy: false, timeout: 120000}
        );
        navigator.geolocation.watchPosition((position) => {
            this.setState({position: position});
        });
    }

    getAllMessages() {
        fetch(SERVER)
            .then(response => response.json())
            .then(json => this.setState({messages: json.messages}))
            .catch(error => console.log(error));
    }

    sendMessage(message, position) {
        fetch(SERVER, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                text: message,
                location: position,
            })
        })
            .then(response => response.json())
            .then(json => this.setState({messages: json.messages}))
            .catch(error => console.log(error));
    }

    render() {
        let messages = this.state.messages;
        return (
            <View style={styles.container}>
                <MessageWindow messages={messages} />
                <Sender sendMessage={this.sendMessage.bind(this)} position={this.state.position}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    chatInputView: {
        flexDirection: 'row',
    },
    chatInput: {
        fontSize: 20,
        flex: 3,
    },
    sendButton: {
        flex: 1,
    }
});
