import React, { Component } from 'react'
import { Appbar } from 'react-native-paper';

export class Header extends Component {

    // constructor(props){
    //     super(props);
    //     console.log(this.props.navigation.state.params)
    // }

    _goBack = () => console.log('Go back');

    _openDrawer = () => this.props.navigation.toggleDrawer()

    render() {
        return (
            <Appbar.Header>
                <Appbar.BackAction
                    onPress={this._goBack}
                />
                <Appbar.Content
                    title={this.props.title}
                />
                <Appbar.Action icon="menu" onPress={this._openDrawer} />
            </Appbar.Header>
        )
    }
}

export default Header
