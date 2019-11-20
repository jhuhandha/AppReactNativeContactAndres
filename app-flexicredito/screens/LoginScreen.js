import React, { Component } from 'react'
import { connect } from 'react-redux';
import { StyleSheet, View, TextInput, Image, Text, TouchableOpacity } from 'react-native';
import logo from '../assets/img/logoflexi.png'

import { login } from '../redux/actions/login.action';

export class LoginScreen extends Component {

    static navigationOptions = {
        headerMode: null,
        header: null,
    }

    state = {
        username: '',
        password: ''
    }

    login = () => {
        this.props.loginData({
            username: this.state.username, 
            password: this.state.password
        }).then((data) => {
            this.props.navigation.navigate('Contact')
        }).catch((error) => {
            console.log(error);
        })
    }

    render() {
        return (
            <View style={styles.box}>
                <View style={styles.container_logo}>
                    <Image source={logo} style={styles.logo} />
                </View>
                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        placeholder='Correo eléctronico'
                        placeholderTextColor="rgba(255, 255, 255, 0.7)"
                        value={this.state.username}
                        onChangeText={(username) => this.setState({ username })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Contraseña'
                        placeholderTextColor="rgba(255, 255, 255, 0.7)"
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={(password) => this.setState({ password })}
                    />
                    <TouchableOpacity style={styles.buttonContainer} 
                        onPress={ () => this.login() }
                    >
                        <Text style={styles.buttonText}>
                            { !this.props.loading ? 'Ingresar' : 'Cargando' }
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Registrarme</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    box: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#3498db'
    },
    container_logo: {
        alignItems: 'center',
        // flexGrow: 1,
        justifyContent: 'center'
    },
    labels: {
        fontSize: 18,
        marginBottom: 10,
        color: '#FFFFFF'
    },
    logo: {
        width: '100%',
        height: '70%'
    },
    container: {
        marginTop : -70,
        padding: 10,
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginBottom: 30,
        color: '#FFF',
        paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor: '#2980b9',
        paddingVertical: 15,
        marginBottom: 10
    },
    buttonText:{
        textAlign: 'center',
        color: '#FFF'
    }
});

const mapStateToProps = state => {
    return {
        'loading': state.login.loading,
        'error': state.login.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginData: (payload) => dispatch(login(payload)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
