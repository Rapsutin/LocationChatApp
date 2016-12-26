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
import MessageWindow from './components/messagewindow'
import Sender from './components/sender'
/* const SERVER = 'http://ec2-52-211-250-0.eu-west-1.compute.amazonaws.com:3000/'*/
const SERVER = 'http://192.168.1.40:3000/';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            room: null
        };
        console.log(this.state)
        this.initialize()
    }

    initialize() {
        this.updatePosition()
        setInterval(this.updatePosition.bind(this), 30000);
        setInterval(this.fetchMessages.bind(this), 10000)
    }

    updatePosition() {
        navigator.geolocation.getCurrentPosition(position => {
                this.fetchRooms(position);
            },
            error => console.log(error),
            {enableHighAccuracy: false, timeout: 120000}
        )
    }

    fetchRooms(position) {
        fetch(SERVER + "rooms/" + position.coords.latitude + "/" + position.coords.longitude)
            .then(response => response.json())
            .then(json => this.setState({rooms: json}))
    }

    fetchMessages() {
        fetch(SERVER + "message/" + this.state.room)
            .then(response => response.json())
            .then(json => this.setState({messages: json.messages}))
            .catch(error => console.log(error));
    }

    sendMessage(message) {
        fetch(SERVER + "message/" + this.state.room, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                text: message,
            })
        })
            .then(response => response.json())
            .then(json => this.setState({messages: json.messages}))
            .catch(error => console.log(error));
    }

    render() {
        let messages = this.state.messages;
        let rooms = this.state.rooms.map(room => <Picker.Item label={room.name} value={room.id} key={room.id}/>)
        return (
            <View style={styles.container}>
                <Picker
                    selectedValue={this.state.room}
                    onValueChange={value => {
                            this.setState({room: value, messages: []}, this.fetchMessages)
                    }}>
                    <Picker.Item label="Select a nearby room" value={null} key={null} />
                    {rooms}
                </Picker>
                <MessageWindow messages={messages} />
                <Sender sendMessage={this.sendMessage.bind(this)}/>
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
