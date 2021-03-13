import * as React from 'react';
import { View, Text,  StyleSheet, Dimensions, TouchableHighlight, Alert, ImageBackground } from 'react-native';
import realm from '../../src/REALMDB';
import { FloatingTitleTextInputField } from '../../src/floating_title_text_input_field';
import { FloatingTitleTextInputFieldNumber } from '../../src/floating_title_text_input_field_number';
import { FloatingTitleTextInputFieldContra } from '../../src/floating_title_text_input_fieldContra';

class registroScreen extends React.Component {
    _updateMasterStateName = (attrName, value) => {
        this.setState({ inputName: value });
        this.setState({ [attrName]: value })
    }
    _updateMasterStateApellido = (attrName, value) => {
        this.setState({ inputApellido: value });
        this.setState({ [attrName]: value });
    }
    _updateMasterStateDireccion = (attrName, value) => {
        this.setState({ inputDireccion: value });
        this.setState({ [attrName]: value });
    }
    _updateMasterStateEmail = (attrName, value) => {
        this.setState({ inputEmail: value });
        this.setState({ [attrName]: value });
    }
    _updateMasterStateTelefono = (attrName, value) => {
        this.setState({ inputTelefono: (value) });
        this.setState({ [attrName]: value });
    }
    _updateMasterStateContrasena = (attrName, value) => {
        this.setState({ inputContrasena: value });
        this.setState({ [attrName]: value });
    }
    _updateMasterStateContrasenaReingreso = (attrName, value) => {
        this.setState({ inputContrasenaReply: value });
        this.setState({ [attrName]: value });
    }
    constructor(props) {
        super(props);

        this.state = {
            realm: realm,
            inputName: '',
            inputApellido: '',
            inputDireccion: '',
            inputEmail: '',
            inputTelefono: '',
            inputContrasena: '',
            inputContrasenaReply: '',
            color:'white'
        }
    }
    agregarUsuario() {
        let realm = this.state.realm;
        let last = realm.objects('Persons').length + 1;
        realm.write(() => {
            realm.create('Persons', {
                id: last,
                name: this.state.inputName,
                apellido: this.state.inputApellido,
                direccion: this.state.inputDireccion,
                email: this.state.inputEmail,
                telefono: Number(this.state.inputTelefono),
                listDogs: [],
                contrasena: this.state.inputContrasena,
            });
        });
        this.setState({ realm });
        this.props.navigation.navigate('inicioSesion');
        console.log('---------------------Persons-------------------');
        console.log(realm.objects('Persons'));
    }
    agregarNuevoUsuario = () => {
        if (this.state.inputContrasena === this.state.inputContrasenaReply) {
            this.agregarUsuario();
            this.setState({color:'white'});
        }
        else {
            Alert.alert('contrasena verificacion no coincide');
            this.setState({color:'red'});
        }
    }
    render() {
        return (
            <View style={styles.centeredView}>
                <ImageBackground source={require('@img/perroHumano2.jpg')} style={styles.modalView}>
                    <Text style={{ fontFamily: 'Serif', fontSize: 30 }}>Registro</Text>
                    <View>
                        <FloatingTitleTextInputField               attrName='Nombre'
                            title='Nombre'
                            value={this.state.inputName}
                            updateMasterState={this._updateMasterStateName}
                            textInputStyles={{ // here you can add additional TextInput styles
                                color: 'white',
                            }}
                        // otherTextInputProps = {{   // here you can add other TextInput props of your choice //   maxLength: 12,  // }}
                        />
                        <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, }} />
                    </View>
                    <View>
                        <FloatingTitleTextInputField      attrName='Apellido'
                            title='Apellido'
                            value={this.state.inputApellido}
                            updateMasterState={this._updateMasterStateApellido}
                            textInputStyles={{  color: 'white',        }}
                        />
                        <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, }} />
                    </View>
                    <View>
                        <FloatingTitleTextInputField                attrName='Direccion'
                            title='Direccion'
                            value={this.state.inputDireccion}
                            updateMasterState={this._updateMasterStateDireccion}
                            textInputStyles={{    color: 'white' }}
                        />
                        <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, }} />
                    </View>
                    <View>
                        <FloatingTitleTextInputField                attrName='Email'
                            title='Email'
                            value={this.state.inputEmail}
                            updateMasterState={this._updateMasterStateEmail}
                            textInputStyles={{  color: 'white',  }}
                        />
                        <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, }} />
                    </View>
                    <View>
                        <FloatingTitleTextInputFieldNumber                attrName='Telefono'
                            title='Telefono'
                            value={(this.state.inputTelefono).toString()}
                            updateMasterState={this._updateMasterStateTelefono}
                            textInputStyles={{color: 'white', }}
                        />
                        <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, }} />
                    </View>
                    <View>
                        <FloatingTitleTextInputFieldContra                attrName='Contrasena'
                            title='Contrasena'
                            value={this.state.inputContrasena}
                            updateMasterState={this._updateMasterStateContrasena}
                            textInputStyles={{    color: 'white',                            }}                       
                        />
                        <View style={{ borderBottomColor: this.state.color, borderBottomWidth: 1, }} />
                    </View>
                    <View>
                        <FloatingTitleTextInputFieldContra                attrName='Reingreso Contrasena'
                            title='Reingreso Contrasena'
                            value={this.state.inputContrasenaReply}
                            updateMasterState={this._updateMasterStateContrasenaReingreso}
                            textInputStyles={{   color: 'white',}}
                        />
                        <View style={{ borderBottomColor: this.state.color, borderBottomWidth: 1, }} />
                    </View>
                    <Text></Text>
                    <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "grey", borderRadius: 10, width: 300 }}
                        onPress={() => {       this.agregarNuevoUsuario();    }}
                    >
                        <Text style={styles.textStyle}>ACEPTAR</Text>
                    </TouchableHighlight>
                    <Text></Text>
                    <Text></Text>
                    <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "grey", borderRadius: 10, width: 300 }}
                        onPress={() => {this.props.navigation.navigate('inicioSesion'); }}
                    >
                        <Text style={styles.textStyle}>CANCELAR</Text>
                    </TouchableHighlight>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    dogBox: {
        flexDirection: 'row',
        height: 40,
    },
    textAyudar: { fontFamily: 'Serif', fontSize: 20 },
    textInputAyudar: {
        textAlign: 'center', backgroundColor: 'white', width: 300, fontSize: 15
    },
    modalView: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        position: 'absolute',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#17A589',

        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    Box: {
        width: 150,
        height: 150,
        backgroundColor: '#24A1C8',
    },
    posicionesDogitos: {
        height: 300,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    Dogitos: {
        height: 300,
    },
    dropArea: {
        backgroundColor: 'gray',
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textDrop: {
        fontSize: 30,
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        justifyContent: "center",
        alignItems: "center",
    }, textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
});

export default registroScreen;