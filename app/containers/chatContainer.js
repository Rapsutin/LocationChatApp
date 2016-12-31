import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text

} from 'react-native'
import MessageContainer from './messageContainer'
import RoomPicker from '../components/roomPicker'

const SERVER = 'http://192.168.1.40:3000/';

export default class ChatContainer extends Component {

    constructor(props) {
        super(props)
        console.log("Constructor called!")
        this.state = {
            selectedRoom: null,
            rooms: {}
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("UPDATING")
        console.log(nextProps)
        console.log(nextState)
        return true
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        if(this.props.location != nextProps.location) {
            this.fetchRooms(nextProps.location)
        }
    }

    fetchRooms(position) {
        return fetch(SERVER + "rooms/" + position.coords.latitude + "/" + position.coords.longitude)
            .then(response => response.json())
            .then(nextRooms => {
                console.log(nextRooms)
                this.setState({rooms: nextRooms})
                if(!(this.state.selectedRoom in nextRooms)) {
                    this.changeRoom(null)
                }
            })
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
