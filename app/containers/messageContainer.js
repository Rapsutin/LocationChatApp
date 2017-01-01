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
        this.messageUpdater = setInterval(() => this.fetchMessages(this.props.room), 10000)
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.room != nextProps.room) {
            this.clearMessagesAndFetchNew(nextProps.room)
        }
    }

    clearMessagesAndFetchNew(newRoom) {
        this.setState({messages: []}, () => this.fetchMessages(newRoom))
    }

    componentWillUnmount() {
        clearInterval(this.messageUpdater)
    }

    fetchMessages(room) {
        if(room) {
            return fetch(SERVER + "message/" + room)
                .then(response => response.json())
                .then(messages => {
                    this.setState({messages: messages})
                })
                .catch(error => console.log(error));
        } else {
            this.setState({messages: []})
        }
    }

    sendMessage(message) {
        if(this.props.room) {
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
    }

    render() {
        let sendingNotAllowed = !this.props.room
        return (
            <View style={{flex: 1}}>
                <MessageWindow messages={this.state.messages}/>
                <Sender disabled={sendingNotAllowed} sendMessage={this.sendMessage.bind(this)}/>
            </View>
        )
    }
}
