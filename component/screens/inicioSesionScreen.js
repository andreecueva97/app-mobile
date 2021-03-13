import realm from '../../src/REALMDB';
import * as React from 'react';
import {View, Text, BackHandler, StyleSheet,Dimensions,TouchableHighlight,ImageBackground } from 'react-native';

import { FloatingTitleTextInputField } from '../../src/floating_title_text_input_field';
import { FloatingTitleTextInputFieldContra } from '../../src/floating_title_text_input_fieldContra';

class inicioSesionScreen extends React.Component {
  _updateMasterState = (attrName, value) => {
    this.setState({ inputEmailLogin: value });
    this.setState({ [attrName]: value });
  }
  _updateMasterState2 = (attrName, value) => {
    this.setState({ inputContrasenaLogin: value });
    this.setState({ [attrName]: value })
  }

  constructor(props) {
    super(props);
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
    this.state = {
      realm: realm,//antes realm:null;
      inputName: '',
      inputApellido: '',
      inputDireccion: '',
      inputEmail: '',
      inputTelefono: '',
      inputContrasena: '',
      inputContrasenaReply: '',
      inputEmailLogin: '',
      inputContrasenaLogin: '',
      icon: "eye-off",
      password: true,
      color:'white'
    }
  }
  onBackButtonPressAndroid = () => {
    return true;
}
  inicioSesion = () => {
    let realm = this.state.realm;
    // realm.write(() => {
    //         realm.deleteAll();
    //     });
    let usuarios = realm.objects('Persons');
    console.log('---------------------Persons-------------------');
    console.log(usuarios);
    let neew = null;
    let last = realm.objects('Persons').length;
    let i = 0;
    while (i < last) {
      if ((realm.objects('Persons'))[i].email === this.state.inputEmailLogin) {
        neew = usuarios[i];
        console.log('usuario ' + i + '->' + usuarios[i].contrasena);
      }
      i = i + 1;
    }
    console.log('--------------------persona coincidente email con DB ----------');
    console.log('neew ==>', neew);
    if (neew != null) {
      if (neew.contrasena == this.state.inputContrasenaLogin) {
        console.log('>>>>>>>>>>>>>>>>borrar PersonsLogin<<<<<<<<<<<<<<<<');
        realm.write(() => {
          realm.delete(realm.objects('PersonsLogin'));
        });
        console.log(realm.objects('PersonsLogin'));
        realm.write(() => {
          realm.create('PersonsLogin', {
            id: 1,
            name: neew.name,
            apellido: neew.apellido,
            direccion: neew.direccion,
            telefono: neew.telefono,
            email: neew.email,
            contrasena: neew.contrasena,
            listDogs: neew.listDogs,
          });
        });
        this.setState({ realm });
        console.log('---------------------PersonsLogin-------------------');
        console.log(realm.objects('PersonsLogin'));
        this.props.navigation.navigate('dashboards');
        this.setState({color:'white'})
      }
      else{
        this.setState({color:'red'})
      }
    }
    else{
      this.setState({color:'red'})
    }
  }
  render() {
    return (
      <View style={styles.centeredView}>
        <ImageBackground source={require('@img/perroHumano2.jpg')} style={styles.modalView}>
          <Text style={[styles.modalText, { fontSize: 40, top: -50 }]}>Dog.S.O.S</Text>
          <View style={{}}>
            <FloatingTitleTextInputField  attrName='Usuario'
              title='Usuario'
              value={this.state.inputEmailLogin}
              updateMasterState={this._updateMasterState}
              textInputStyles={{ // here you can add additional TextInput styles
                color: 'white',
              }}
            // otherTextInputProps = {{   // here you can add other TextInput props of your choice}}
            />
            <View style={{ borderBottomColor: this.state.color, borderBottomWidth: 1, }} />
          </View>
          <Text></Text>
          <View style={{}}>
            <FloatingTitleTextInputFieldContra        attrName='Contrasena'
              title='Contrasena'
              value={this.state.inputContrasenaLogin}
              updateMasterState={this._updateMasterState2}

              textInputStyles={{ color: 'white', fontSize: 20, }}
            />
            <View style={{ borderBottomColor: this.state.color, borderBottomWidth: 1, }} />
            <Text></Text>
          </View>
          <Text></Text>
          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: "grey", borderRadius: 10, width: 300 }}
            onPress={() => { this.inicioSesion(); }}
          >
            <Text style={styles.textStyle}>INICIAR SESION</Text>
          </TouchableHighlight>
          <Text></Text>
          <Text></Text>
          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: "grey", borderRadius: 10, width: 300 }}
            onPress={() => { this.props.navigation.navigate('registro') }}
          >
            <Text style={styles.textStyle}>REGISTRARSE</Text>
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

export default inicioSesionScreen;
