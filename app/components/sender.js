import React, { Component } from 'react';
import {
    StyleSheet,
    Button,
    View,
    TextInput
} from 'react-native';

export default class Sender extends Component {

    constructor(props) {
        super(props);
        this.state = {text: ''}
    }

    render() {
        return (
            <View>
                <TextInput
                    onChangeText={text => this.setState({text: text})}
                    value={this.state.text}
                />
                <Button
                    onPress={() => this.props.sendMessage(this.state.text, this.props.position)}
                    disabled={!this.props.position || this.state.text == ''}
                    title={this.props.position ? "Send" : "Waiting for position"}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    messageWindowBackground: {
        backgroundColor: 'ghostwhite',
        flex: 3,
    },
    message: {
    }
})

