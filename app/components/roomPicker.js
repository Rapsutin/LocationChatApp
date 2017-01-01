import React, { Component } from 'react';
import {
    Picker,
    Text
} from 'react-native';

export default class RoomPicker extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let roomRows = this.props.rooms.map(room => <Picker.Item label={room.room_name} value={room.id} key={room.id}/>);
        roomRows.unshift(<Picker.Item label="Select a nearby room" value={null} key={null}/>)

        if(roomRows.length > 1) {
            return(
                <Picker
                    selectedValue={this.props.selectedRoom}
                    onValueChange={selected => this.props.onRoomChange(selected)}
                    prompt="Select a room"
                >
                    {roomRows}
                </Picker>
            )
        }
        else {
            return(<Text>No nearby rooms found!</Text>)
        }
    }

}
