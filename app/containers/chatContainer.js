import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native'
import MessageContainer from './messageContainer'
import RoomPicker from '../components/roomPicker'

const SERVER = 'http://192.168.1.40:3000/';

export default class ChatContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedRoom: null,
            rooms: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        if(this.props.location != nextProps.location) {
            this.fetchRooms(nextProps.location).then(nextRooms => {
                this.setState({rooms: nextRooms})
            })
        }
    }

    fetchRooms(position) {
        return fetch(SERVER + "rooms/" + position.coords.latitude + "/" + position.coords.longitude)
            .then(response => response.json())
            .catch(error => console.log(error))
    }

    changeRoom(newRoom) {
        this.setState({selectedRoom: newRoom})
    }

    render() {
        return(
            <View style={styles.container}>
                <RoomPicker selectedRoom={this.state.selectedRoom} rooms={Object.values(this.state.rooms)} onRoomChange={this.changeRoom.bind(this)}/>
                <MessageContainer room={this.state.selectedRoom}/>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
