import * as React from 'react';
import { ImageBackgroundBase, View, Text, TouchableOpacity, Image, StyleSheet, Animated, Dimensions, Modal, TouchableHighlight, TextInput, Alert, ImageBackground } from 'react-native';

import realm from './src/dataBase';

import DogoGlobitosHome from './src/DogoGlobitosHome';

import { FloatingTitleTextInputField } from './src/floating_title_text_input_field';
import { FloatingTitleTextInputFieldNumber } from './src/floating_title_text_input_field_number';

class App extends React.Component {

  marginTop = new Animated.Value(1);
  margin = new Animated.Value(-200);
  _updateMasterState = (attrName, value) => {
    this.setState({ inputEmailLogin: value });
    this.setState({[attrName]:value});
  }
  _updateMasterState2 = (attrName, value) => {
    this.setState({ inputContrasenaLogin: value });
    this.setState({[attrName]:value})
  }
  _updateMasterStateName = (attrName, value) => {
    this.setState({ inputName: value });
    this.setState({[attrName]:value})
  }
  _updateMasterStateApellido = (attrName, value) => {
    this.setState({ inputApellido: value });
    this.setState({[attrName]:value});
  }
  _updateMasterStateDireccion = (attrName, value) => {
    this.setState({ inputDireccion: value });
    this.setState({[attrName]:value});
  }
  _updateMasterStateEmail = (attrName, value) => {
    this.setState({ inputEmail: value });
    this.setState({[attrName]:value});
  }
  _updateMasterStateTelefono = (attrName, value) => {
    
    this.setState({ inputTelefono:(value) });
    this.setState({[attrName]:value});
  }
  _updateMasterStateContrasena = (attrName, value) => {
    this.setState({ inputContrasena: value });
    this.setState({[attrName]:value});
  }
  _updateMasterStateContrasenaReingreso = (attrName, value) => {
    this.setState({ inputContrasenaReply: value });
    this.setState({[attrName]:value});
  }
  hideMenu = () => {
    Animated.sequence([
      Animated.timing(
        this.marginTop,
        {
          toValue: 0,
          duration: 9000,//900
          useNativeDriver: false,
        }
      ),
      Animated.timing(
        this.margin,
        {
          toValue: 300,//300
          duration: 1,
          useNativeDriver: false,
        }
      )
    ]).start();
  };
  componentDidMount() {                         ///esto para cuando se monta el componente sino usar HIDEMENU
    console.log(realm.objects('Persons'));

  }
  constructor(props) {
    super(props);

    this.state = {
      realm: realm,//antes realm:null;
      modalVisible4: true,
      modalVisible3: false,
      inputName: '',
      inputApellido: '',
      inputDireccion: '',
      inputEmail: '',
      inputTelefono: '',
      inputContrasena: '',
      inputContrasenaReply: '',
      inputEmailLogin: '',
      inputContrasenaLogin: '',
    }
  }
  setModalVisible4 = (visible) => {
    this.setState({ modalVisible4: visible });
  }
  setModalVisible3 = (visible) => {
    this.setState({ modalVisible3: visible });
  }
  agregarUsuario() {

    let realm = this.state.realm;
    let last = realm.objects('Persons').length + 1;
    //let lastDog = realm.objects('Dog').length + 1;  
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
    // this.refs['textInput1'].setNativeProps({ text: '' });
    // this.refs['textInput2'].setNativeProps({ text: '' });
    // this.refs['textInput3'].setNativeProps({ text: '' });
    // this.refs['textInput5'].setNativeProps({ text: '' });
    // this.refs['textInput6'].setNativeProps({ text: '' });
    // this.refs['textInput7'].setNativeProps({ text: '' });
    // this.refs['textInput8'].setNativeProps({ text: '' });
    console.log('---------------------Persons-------------------');
    console.log(realm.objects('Persons'));
    //alert('donacion/ayuda en proceso nos contactaremos con usted...');
  }
  agregarNuevoUsuario = () => {
    if (this.state.inputContrasena === this.state.inputContrasenaReply) {

      this.agregarUsuario();
    }
    else {
      Alert.alert('contrasena verificacion no coincide');
    }
  }
  inicioSesion = () => {
    let realm = this.state.realm;
    //realm.delete(PersonsLogin.class);
   //realm.delete<Dog>() realm.delete(PersonsLogin);
    let usuarios = realm.objects('Persons');
    console.log('---------------------Persons-------------------');
    console.log(usuarios);
    let neew = null;
    let last = realm.objects('Persons').length;
    let i = 0;
    while (i < last) {
      if (usuarios[i].email === this.state.inputEmailLogin) {
        neew = usuarios[i];
        console.log('forrrrrrrrr');
        console.log(usuarios[i]);
      }
      i = i + 1;
    }
    console.log('acaaaaaaaaaaaaaaaaaaa');
    console.log(neew);
    if (neew != null) {
      if (neew.contrasena == this.state.inputContrasenaLogin) {
        this.hideMenu();
        this.setModalVisible4(false);
        
        realm.write(() => {
          realm.create('PersonsLogin', {
            id: 1,
            name: neew.name,
            apellido: neew.apellido,
            direccion: neew.direccion,
            telefono: neew.telefono,
            email: neew.email,
            contrasena: neew.contrasena,
            //listDogs:'string[]',
            listDogs: neew.listDogs,
          });
        });
        this.setState({ realm });
        console.log('---------------------PersonsLogin-------------------');
        console.log(this.state.realm.objects('PersonsLogin')[0]);
      }
    }



  }
  render() {
    //console.log(realm);
    // console.log('---------------------DOGOs-------------------');
    // console.log(realm.objects('Dogo'));
    const { modalVisible4 } = this.state;
    const { modalVisible3 } = this.state;
    return (
      <View style={{ flex: 1, position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
        <View>

          <Animated.View style={[styles.Box, {
            alignItems: 'center', justifyContent: 'center', position: 'absolute', height: Dimensions.get('window').height,
            width: Dimensions.get('window').width, zIndex: 30, opacity: this.marginTop, left: this.margin
          }]}>
            <View>

              <Image
                style={{ width: 160, height: 160, top: -70 }}
                source={require('@img/casaRoja.png')} />

            </View>
            <Text style={{ top: -100, justifyContent: 'center', fontSize: 30 }}>HOME</Text>
            <Text style={{ alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 40 }}>BIENVENIDOS</Text>
            <View style={styles.posicionesDogitos}>
              <DogoGlobitosHome color="#ff0404" />
              <DogoGlobitosHome color="#049cff" />
              <DogoGlobitosHome color='white' />
              <DogoGlobitosHome color="#990c0f" />
            </View>
          </Animated.View>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: '#24A1C8', fontFamily: 'Serif' }}>
          <Text style={{ justifyContent: 'center', alignContent: 'center', top: 23, fontSize: 40, color: 'white', fontFamily: 'Serif' }}>BIENVENIDOS</Text>
          <View style={{
            flex: 2,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            flexWrap: 'wrap',
          }}>

            <View
            //'#7F8C8D'///'#17A589'///'#DC7633'///'#F1C40F'
            >
              <TouchableOpacity onPress={() => this.props.navigation.navigate('adoptar')}>
                <View style={{ fontFamily: 'Serif', position: 'relative', width: 190, height: 260, bottom: 5, right: 5, backgroundColor: '#7F8C8D', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }} >
                  <Image
                    style={{ width: 120, height: 120 }}
                    source={require('@img/andre.png')} />
                  <Text style={{ fontFamily: 'Serif', fontSize: 20 }}>ADOPTAR</Text>

                </View>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('transitar')}>
                <View style={{ fontFamily: 'Serif', position: 'relative', width: 190, height: 260, bottom: 5, left: 5, backgroundColor: '#17A589', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                  <Image
                    style={{ width: 155, height: 120 }}
                    source={require('@img/huellitas.png')} />
                  <Text style={{ fontFamily: 'Serif', fontSize: 20 }}>TRANSITAR</Text>

                </View>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('ayudar')}>
                <View style={{ fontFamily: 'Serif', position: 'relative', width: 190, height: 260, top: 5, right: 5, backgroundColor: '#DC7633', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                  <Image
                    style={{ width: 155, height: 120 }}
                    source={require('@img/corazon3.png')} />
                  <Text style={{ fontFamily: 'Serif', fontSize: 20 }}>AYUDAR</Text>

                </View>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('perdidos')}>
                <View style={{ fontFamily: 'Serif', position: 'relative', width: 190, height: 260, top: 5, left: 5, backgroundColor: '#F1C40F', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                  <Image
                    style={{ width: 155, height: 120 }}
                    source={require('@img/perdidos.png')} />
                  <Text style={{ fontFamily: 'Serif', fontSize: 20 }}>PERDIDOS</Text>

                  <Text style={{ fontFamily: 'Serif', fontSize: 20 }}>ENCONTRADOS</Text>

                </View>
              </TouchableOpacity>
            </View>
          </View>

          <Modal                                                                               //MODAL4 DE INICIO DE SESION
            animationType="none"
            transparent={true}
            visible={modalVisible4}
            onRequestClose={() => {
              Alert.alert("Modal fue cerrado.");
            }}
          >
            <View style={styles.centeredView}>
              <ImageBackground source={require('@img/perroHumano2.jpg')} style={styles.modalView}>
                {/* <Image source={require('@img/andre.png')} /> */}
                <Text style={[styles.modalText, { fontSize: 40, top: -50 }]}>Dog.S.O.S</Text>
                {/* <Text style={[styles.modalText, { fontSize: 20, color: 'white' }]}>Usuario</Text> */}
                <View style={{}}>
                  
                  <FloatingTitleTextInputField
                    attrName='Usuario'
                    title='Usuario'
                    value={this.state.inputEmailLogin}
                    updateMasterState={this._updateMasterState}
                    textInputStyles={{ // here you can add additional TextInput styles
                      color: 'white',
                    }}
                  // otherTextInputProps = {{   // here you can add other TextInput props of your choice
                  //   maxLength: 12,
                  // }}
                  />
                  <View style={{ borderBottomColor: 'white',  borderBottomWidth: 1,}}  />
                </View>
                <Text></Text>
                {/* <Text style={[styles.modalText, { fontSize: 20, color: "white" }]}>Contrasena</Text> */}
                <View style={{}}>
                  
                    <FloatingTitleTextInputField
                    attrName='Contrasena'
                    title='Contrasena'
                    value={this.state.inputContrasenaLogin}
                    updateMasterState={this._updateMasterState2}
                    
                    textInputStyles={{ // here you can add additional TextInput styles
                      color: 'white',
                      fontSize:20,
                    }}
                  // otherTextInputProps = {{   // here you can add other TextInput props of your choice
                  //   maxLength: 12,
                  // }}
                  />
                  <View
                    style={{
                      borderBottomColor: 'white',
                      borderBottomWidth: 1,
                    }}
                  />
                  <Text></Text>
                </View>
                <Text></Text>
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "grey", borderRadius: 10, width: 300 }}
                  onPress={() => {

                    this.inicioSesion();

                  }}
                >
                  <Text style={styles.textStyle}>INICIAR SESION</Text>
                </TouchableHighlight>
                <Text></Text>
                <Text></Text>

                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "grey", borderRadius: 10, width: 300 }}
                  onPress={() => {
                    this.setModalVisible3(!modalVisible3);

                  }}
                >
                  <Text style={styles.textStyle}>REGISTRARSE</Text>
                </TouchableHighlight>
              </ImageBackground>



            </View>

          </Modal>
          <Modal                                                                               //MODAL3 DE REGISTRARSE
            animationType="none"
            transparent={true}
            visible={modalVisible3}
            onRequestClose={() => {
              Alert.alert("Modal fue cerrado.");
            }}
          >
            <View style={styles.centeredView}>
            <ImageBackground source={require('@img/perroHumano2.jpg')} style={styles.modalView}>
                <Text style={{ fontFamily: 'Serif', fontSize: 30 }}>Registro</Text>
                {/* <Text style={styles.textAyudar}>Ingrese el nombre: </Text>
                <View style={styles.dogBox}>
                  <View style={{}}>
                    <TextInput ref={'textInput2'} style={styles.textInputAyudar} onChangeText={value => this.setState({ inputName: value })} />
                  </View> 
          </View>*/}
          <View>
          <FloatingTitleTextInputField
                    attrName='Nombre'
                    title='Nombre'
                    value={this.state.inputName}
                    updateMasterState={this._updateMasterStateName}
                    textInputStyles={{ // here you can add additional TextInput styles
                      color: 'white',
                    }}
                  // otherTextInputProps = {{   // here you can add other TextInput props of your choice
                  //   maxLength: 12,
                  // }}
                  />
                  <View style={{ borderBottomColor: 'white',  borderBottomWidth: 1,}}  />
          </View>
                 
              
                <View>
          <FloatingTitleTextInputField
                    attrName='Apellido'
                    title='Apellido'
                    value={this.state.inputApellido}
                    updateMasterState={this._updateMasterStateApellido}
                    textInputStyles={{ // here you can add additional TextInput styles
                      color: 'white',
                    }}
                  // otherTextInputProps = {{   // here you can add other TextInput props of your choice
                  //   maxLength: 12,
                  // }}
                  />
                  <View style={{ borderBottomColor: 'white',  borderBottomWidth: 1,}}  />
          </View>
                
                <View>
          <FloatingTitleTextInputField
                    attrName='Direccion'
                    title='Direccion'
                    value={this.state.inputDireccion}
                    updateMasterState={this._updateMasterStateDireccion}
                    textInputStyles={{ // here you can add additional TextInput styles
                      color: 'white',
                    }}
                  // otherTextInputProps = {{   // here you can add other TextInput props of your choice
                  //   maxLength: 12,
                  // }}
                  />
                  <View style={{ borderBottomColor: 'white',  borderBottomWidth: 1,}}  />
          </View>
                
                <View>
          <FloatingTitleTextInputField
                    attrName='Email'
                    title='Email'
                    value={this.state.inputEmail}
                    updateMasterState={this._updateMasterStateEmail}
                    textInputStyles={{ // here you can add additional TextInput styles
                      color: 'white',
                    }}
                  // otherTextInputProps = {{   // here you can add other TextInput props of your choice
                  //   maxLength: 12,
                  // }}
                  />
                  <View style={{ borderBottomColor: 'white',  borderBottomWidth: 1,}}  />
          </View>
               
                <View>
          <FloatingTitleTextInputFieldNumber
                    attrName='Telefono'
                    title='Telefono'
                    value={(this.state.inputTelefono).toString()}
                    updateMasterState={this._updateMasterStateTelefono}
                    textInputStyles={{ // here you can add additional TextInput styles
                      color: 'white',
                    }}
                    otherTextInputProps = {{   // here you can add other TextInput props of your choice
                     
                   }}
                  />
                  <View style={{ borderBottomColor: 'white',  borderBottomWidth: 1,}}  />
          </View>
              
                <View>
          <FloatingTitleTextInputField
                    attrName='Contrasena'
                    title='Contrasena'
                    value={this.state.inputContrasena}
                    updateMasterState={this._updateMasterStateContrasena}
                    textInputStyles={{ // here you can add additional TextInput styles
                      color: 'white',
                    }}
                  // otherTextInputProps = {{   // here you can add other TextInput props of your choice
                  //   maxLength: 12,
                  // }}
                  />
                  <View style={{ borderBottomColor: 'white',  borderBottomWidth: 1,}}  />
          </View>
                
                <View>
          <FloatingTitleTextInputField
                    attrName='Reingreso Contrasena'
                    title='Reingreso Contrasena'
                    value={this.state.inputContrasenaReply}
                    updateMasterState={this._updateMasterStateContrasenaReingreso}
                    textInputStyles={{ // here you can add additional TextInput styles
                      color: 'white',
                    }}
                  // otherTextInputProps = {{   // here you can add other TextInput props of your choice
                  //   maxLength: 12,
                  // }}
                  />
                  <View style={{ borderBottomColor: 'white',  borderBottomWidth: 1,}}  />
          </View>
                <Text></Text>
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "grey", borderRadius: 10, width: 300 }}
                  onPress={() => {

                    this.agregarNuevoUsuario(); this.setModalVisible3(!modalVisible3);
                  }}
                >
                  <Text style={styles.textStyle}>ACEPTAR</Text>
                </TouchableHighlight>
                <Text></Text>
                <Text></Text>

                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "grey", borderRadius: 10, width: 300 }}
                  onPress={() => {

                    this.setModalVisible3(!modalVisible3);
                  }}
                >
                  <Text style={styles.textStyle}>CANCELAR</Text>
                </TouchableHighlight>
              </ImageBackground>

            </View>

          </Modal>
        </View></View>

    );
  }
};


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


export default App;