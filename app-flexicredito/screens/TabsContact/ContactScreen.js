import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  ScrollView,
  Text,
  Image,
  View,
  TextInput,
  Button,
  Platform,
  Alert
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import {KeyboardAvoidingView} from 'react-native';

import {saveContact, respuesta_contact} from '../../redux/actions/contact.action';

export class ContactScreen extends Component {
  state = {
    identification: '',
    name: '',
    surname: '',
    img: '',
    img_flat: false,
  };

  changeState = (value, name) => {
    this.setState ({
      [name]: value,
    });
  };

  componentWillReceiveProps(newsProps) {
    console.log(newsProps)
    if(newsProps.respuesta){
      newsProps.respuesta_contact(undefined);
      Alert.alert(`Se guardo el contacto ${newsProps.respuesta.name}`);
    }
  }

  handleChoosePhoto = async () => {
    const options = {
      title: 'Select Avatar',
      chooseFromLibraryButtonTitle: 'Dispositivo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker (options, response => {
      if (response.uri) {
        this.setState ({img: response.data, img_: response, img_flat: true});
      }
    });
  };

  createFormdata = (photo, body) => {
    const data = new FormData ();
    // data.append('image', this.state.img, this.state.img.name);
    data.append ('image', {
      name: photo.name,
      type: photo.type,
      uri: Platform.OS === 'android'
        ? photo.uri
        : photo.uri.replace ('file://', ''),
    });

    Object.keys (body).forEach (key => {
      data.append (key, body[key]);
    });

    return data;
  };

  saveContact = async () => {
    let { img_, ...resultado } = this.state;
    await this.props.saveContact(resultado);
  };

  render () {
    return (
      <ScrollView style={{backgroundColor: '#FFF'}}>
        <View style={styles.container}>
          <View style={styles.img}>
            <View style={styles.containerphoto}>
              {this.state.img_flat
                ? <Image
                    source={{uri: this.state.img_.uri}}
                    style={styles.profile}
                  />
                : <Text
                    style={styles.txtimage}
                    onPress={this.handleChoosePhoto}
                  >
                    Subir imagen
                  </Text>}
            </View>
          </View>
          <KeyboardAvoidingView behavior="padding" enabled>
            <View>
              <View style={styles.formcontrol}>
                <TextInput
                  style={styles.input}
                  value={this.state.identification}
                  placeholder="Identificación"
                  placeholderTextColor="rgba(47, 53, 66,1.0)"
                  onChangeText={text =>
                    this.changeState (text, 'identification')}
                />
              </View>
              <View style={styles.formcontrol}>
                <TextInput
                  style={styles.input}
                  value={this.state.name}
                  placeholder="Nombre"
                  placeholderTextColor="rgba(47, 53, 66,1.0)"
                  onChangeText={text => this.changeState (text, 'name')}
                />
              </View>
              <View style={styles.formcontrol}>
                <TextInput
                  style={styles.input}
                  value={this.state.surname}
                  placeholder="Apellido"
                  placeholderTextColor="rgba(47, 53, 66,1.0)"
                  onChangeText={text => this.changeState (text, 'surname')}
                />
              </View>
            </View>
            <View style={styles.containerbuttons}>
              <Button title="Guardar" onPress={this.saveContact} />
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create ({
  img: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'rgba(209, 216, 224,1.0)',
    marginBottom: 20,
  },
  containerphoto: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 170,
    height: 170,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: '#FFF',
    backgroundColor: '#34495e',
  },
  container: {
    display: 'flex',
    padding: 10,
    backgroundColor: '#FFF',
  },
  formcontrol: {
    borderColor: '#000000',
    backgroundColor: 'rgba(209, 216, 224,1.0)',
    marginBottom: 10,
    borderRadius: 10,
    flex: 1,
  },
  input: {
    height: 40,
    color: 'rgba(47, 53, 66,1.0)',
    paddingHorizontal: 10,
  },
  txtimage: {
    color: '#ecf0f1',
    fontSize: 18,
    textAlign: 'center',
  },
  containerbuttons: {
    marginTop: 30,
  },
  profile: {
    width: 170,
    height: 170,
    borderRadius: 80,
  },
});

const mapStateToProps = state => {
  return {
    respuesta : state.contact.respuesta
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveContact: payload => dispatch (saveContact (payload)),
    respuesta_contact :  payload => dispatch(respuesta_contact(payload))
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (ContactScreen);
