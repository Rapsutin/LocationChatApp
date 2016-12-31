import React, { Component } from 'react';
import {
    StyleSheet,
    View
} from 'react-native'

import MessageWindow from '../components/messagewindow'
import Sender from '../components/sender'

const SERVER = 'http://192.168.1.40:3000/';

export default class MessageContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            messages: []
        }
        this.messageUpdater = setInterval(this.fetchMessages.bind(this), 10000)
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.room != nextProps.room) {
            this.fetchMessages()
        }
    }

    componentWillUnmount() {
        clearInterval(this.messageUpdater)
    }

    fetchMessages() {
        return fetch(SERVER + "message/" + this.props.room)
            .then(response => response.json())
            .then(messages => {
                this.setState({messages: messages})
            })
            .catch(error => console.log(error));
    }

    sendMessage(message) {
        fetch(SERVER + "message/" + this.props.room, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                text: message,
            })
        })
            .then(response => response.json())
            .then(messages => this.setState({messages: messages}))
            .catch(error => console.log(error))
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <MessageWindow messages={this.state.messages}/>
                <Sender sendMessage={this.sendMessage.bind(this)}/>
            </View>
        )
    }
}
