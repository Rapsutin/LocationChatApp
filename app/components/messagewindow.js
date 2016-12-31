import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    ListView,
    Button
} from 'react-native';

export default class MessageWindow extends Component {

    constructor(props) {
        super(props);
    }

    row(rowData, sectionID, rowID) {
        color = rowID % 2 == 0 ? 'ivory': 'beige';
        return (
            <View style={{backgroundColor: color}}>
                <Text>{JSON.stringify(rowData)}</Text>
            </View>
        )
    }

    render() {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.ds = ds.cloneWithRows(this.props.messages);
        return(
            <ListView enableEmptySections={true} style={styles.messageWindowBackground} dataSource={this.ds} renderRow={this.row}/>
        )
    }
}

const styles = StyleSheet.create({
    messageWindowBackground: {
        backgroundColor: 'ghostwhite',
        flex: 3,
    },
})

