import React, { Component } from 'react'
import { connect } from 'react-redux';
import { FlatList, Text, View, SafeAreaView, RefreshControl } from 'react-native';
import { List } from 'react-native-paper';


import { getContacts } from '../../redux/actions/contact.action'

const ItemsContact = (props) => {
    return (
        <List.Item
            title={` ${props.name} ${props.surname}`}
            description={props.identification}
            left={props => <List.Icon {...props} icon="folder" />}
        />
    )
}

export class ContactListScreen extends Component {

    state = {
        refresh: false
    }

    async componentDidMount() {
        this.props.getContacts()
    }

    onRefresh = async () => {
        this.setState({ refresh: true })
        await this.props.getContacts().then( () => {
            this.setState({ refresh: false })
        }).catch(() =>{
            console.log('Ocurrio un error al consultar los contactos');
        })
    }

    render() {
        return (
            <SafeAreaView>
                <View>
                    {this.props.loading !== true ?
                        <FlatList
                            data={this.props.contacts}
                            renderItem={({ item }) => <ItemsContact {...item} />}
                            keyExtractor={(item, index) => index.toString()}
                            refreshControl={
                                <RefreshControl 
                                    refreshing={this.state.refresh} 
                                    onRefresh={this.onRefresh} 
                                />
                            }
                        />
                        : <Text> Cargando </Text>
                    }
                </View>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = state => {
    return {
        contacts: state.contact.data,
        loading: state.contact.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getContacts: () => dispatch(getContacts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactListScreen)
