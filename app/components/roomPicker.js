import React, { Component } from 'react';
import {
    Picker,
} from 'react-native';

export default class RoomPicker extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let roomRows = this.props.rooms.map(room => <Picker.Item label={room.room_name} value={room.id} key={room.id}/>);

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

}
