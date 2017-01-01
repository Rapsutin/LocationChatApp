import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text

} from 'react-native'
import Config from 'react-native-config'
import MessageContainer from './messageContainer'
import RoomPicker from '../components/roomPicker'

export default class ChatContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedRoom: null,
            rooms: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.location != nextProps.location) {
            this.fetchRooms(nextProps.location)
        }
    }

    fetchRooms(position) {
        return fetch(Config.SERVER + "rooms/" + position.coords.latitude + "/" + position.coords.longitude)
            .then(response => response.json())
            .then(nextRooms => {
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
