import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableHighlight, Alert, ImageBackground } from 'react-native';
import realm from '../../src/REALMDB';
import { FloatingTitleTextInputFieldPerfil } from '../../src/floating_title_text_input_field_Perfil';
import { FloatingTitleTextInputFieldNumberPerfil } from '../../src/floating_title_text_input_field_numberPerfil';
import { FloatingTitleTextInputFieldContraPerfil } from '../../src/floating_title_text_input_fieldContraPerfil';
// perdidosScreen ==> perfilLoginScreen
class perfilLoginScreen extends React.Component {
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
            emailSave: '',
            color:'white'
        }
    }
    cerrarSesion(){
        console.log('>>>>>>>>>>>>>>>>borrar PersonsLogin<<<<<<<<<<<<<<<<');
        realm.write(() => {
          realm.delete(realm.objects('PersonsLogin'));
        });
        console.log(realm.objects('PersonsLogin'));
        this.props.navigation.navigate('inicioSesion');
    }
    actualizar() {
        let realm = this.state.realm;
        let last = realm.objects('Persons').length;
        let usuarios = realm.objects('Persons');
        let i = 0;
        while (i < last) {
            if ((realm.objects('Persons'))[i].email === this.state.emailSave) {
                if (this.state.inputContrasena== this.state.inputContrasenaReply) {
                    this.setState({color:'white'});
                    realm.write(() => {
                        realm.objects('Persons')[i].name = this.state.inputName;
                        realm.objects('Persons')[i].apellido = this.state.inputApellido;
                        realm.objects('Persons')[i].direccion = this.state.inputDireccion;
                        realm.objects('Persons')[i].telefono = Number(this.state.inputTelefono);
                        realm.objects('Persons')[i].email = this.state.inputEmail;
                        realm.objects('Persons')[i].contrasena = this.state.inputContrasena;
                        realm.objects('Persons')[i].listDogs = realm.objects('PersonsLogin')[0].listDogs;

                        realm.objects('PersonsLogin')[0].name = this.state.inputName;
                        realm.objects('PersonsLogin')[0].apellido = this.state.inputApellido;
                        realm.objects('PersonsLogin')[0].direccion = this.state.inputDireccion;
                        realm.objects('PersonsLogin')[0].telefono = Number(this.state.inputTelefono);
                        realm.objects('PersonsLogin')[0].email = this.state.inputEmail;
                        realm.objects('PersonsLogin')[0].contrasena = this.state.inputContrasena;
                    });
                    this.setState({ realm });
                    neew = usuarios[i];
                    console.log(realm.objects('PersonsLogin')[0]);
                    console.log(realm.objects('Persons')[i]);
                    
                }
                else{
                    this.setState({color:'red'});
                }
            }
            i = i + 1;
        }
    }
    componentDidMount() {
        let realm = this.state.realm;
        let personaInicia = realm.objects('PersonsLogin')[0];
        this.setState({
            inputName: personaInicia.name,
            inputApellido: personaInicia.apellido,
            inputDireccion: personaInicia.direccion,
            inputEmail: personaInicia.email,
            inputTelefono: personaInicia.telefono,
            inputContrasena: personaInicia.contrasena,
            inputContrasenaReply: personaInicia.contrasena,
            emailSave: personaInicia.email,
        })
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
        }
        else {
            Alert.alert('contrasena verificacion no coincide');
        }
    }
    render() {
        return (
            <View style={[styles.centeredView, { top: -40 }]}>
                <ImageBackground source={require('@img/perroHumano2.jpg')} style={styles.modalView}>
                    <Text style={{ fontFamily: 'Serif', fontSize: 30 }}>Perfil</Text>
                    {/* <Text style={styles.textAyudar}>Ingrese el nombre: </Text>
                <View style={styles.dogBox}>
                  <View style={{}}>
                    <TextInput ref={'textInput2'} style={styles.textInputAyudar} onChangeText={value => this.setState({ inputName: value })} />
                  </View> 
          </View>*/}
                    <View>
                        <FloatingTitleTextInputFieldPerfil attrName='Nombre'
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
                        <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, }} />
                    </View>
                    <View>
                        <FloatingTitleTextInputFieldPerfil attrName='Apellido'
                            title='Apellido'
                            value={this.state.inputApellido}
                            updateMasterState={this._updateMasterStateApellido}
                            textInputStyles={{ // here you can add additional TextInput styles
                                color: 'white',
                            }}
                        />
                        <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, }} />
                    </View>

                    <View>
                        <FloatingTitleTextInputFieldPerfil attrName='Direccion'
                            title='Direccion'
                            value={this.state.inputDireccion}
                            updateMasterState={this._updateMasterStateDireccion}
                            textInputStyles={{  color: 'white', }}
                        />
                        <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, }} />
                    </View>
                    <View>
                        <FloatingTitleTextInputFieldPerfil attrName='Email'
                            title='Email'
                            value={this.state.inputEmail}
                            updateMasterState={this._updateMasterStateEmail}
                            textInputStyles={{  color: 'white',  }}
                        />
                        <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, }} />
                    </View>
                    <View>
                        <FloatingTitleTextInputFieldNumberPerfil attrName='Telefono'
                            title='Telefono'
                            value={(this.state.inputTelefono).toString()}
                            updateMasterState={this._updateMasterStateTelefono}
                            textInputStyles={{   color: 'white',   }}
                            otherTextInputProps={{   // here you can add other TextInput props of your choice
                            }}
                        />
                        <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, }} />
                    </View>
                    <View>
                        <FloatingTitleTextInputFieldContraPerfil attrName='Contrasena'
                            title='Contrasena'
                            value={this.state.inputContrasena}
                            updateMasterState={this._updateMasterStateContrasena}
                            textInputStyles={{      color: 'white', }}
                        />
                        <View style={{ borderBottomColor: this.state.color, borderBottomWidth: 1, }} />
                    </View>
                    <View>
                        <FloatingTitleTextInputFieldContraPerfil attrName='Reingreso Contrasena'
                            title='Reingreso Contrasena'
                            value={this.state.inputContrasenaReply}
                            updateMasterState={this._updateMasterStateContrasenaReingreso}
                            textInputStyles={{ color: 'white',}}
                        />
                        <View style={{ borderBottomColor: this.state.color, borderBottomWidth: 1, }} />
                    </View>
                    <Text style={{height:10}}></Text>
                    <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "grey", borderRadius: 10, width: 300 }}
                        onPress={() => {  this.actualizar();}} >
                        <Text style={styles.textStyle}>ACTUALIZAR PERFIL</Text>
                    </TouchableHighlight>
                    <Text style={{height:10}}></Text>
                    <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "grey", borderRadius: 10, width: 300 }}
                        onPress={() => {    }}  >
                        <Text style={styles.textStyle}>SOLICITUDES ENVIADAS</Text>
                    </TouchableHighlight>
                    <Text style={{height:10}}></Text>
                    <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "grey", borderRadius: 10, width: 300 }}
                        onPress={() => {   this.cerrarSesion();   }}    >
                        <Text style={styles.textStyle}>CERRAR SESION</Text>
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

export default perfilLoginScreen;
// import * as React from 'react';
// import { Alert, Modal, PermissionsAndroid, Platform, Image, FlatList, TouchableHighlight, View, Text, TouchableOpacity, StyleSheet, TextInput, Dimensions } from 'react-native';
// import realm from './REALMDB';
// import DogoGlobitosIcon from './DogoGlobitosIcon';
// import Menu, { MenuItem } from 'react-native-material-menu';
// import MapaMarker from './MapaMarker';

// class perdidosScreen extends React.Component {

//     constructor(props) {
//         super(props);

//         this.state = {
//             realm: realm,//antes realm:null;
//             inputName: '',
//             inputColor: '',
//             inputRaza: '',
//             inputEstado: '',
//             inputImagen: '',
//             inputInformacion: '',
//             selectedDog: '',
//             modalVisible: false,
//             inputPersonsName: '',
//             inputPersonsApellido: '',
//             inputPersonsDireccion: '',
//             inputPersonsTelefono: 'int',
//             inputPersonsEmail: '',
//             nameMenu: 'seleccionar',
//             nameMenu2: 'seleccionar',

//         }

//         Realm.open(

//         ).then(realm => {
//             this.setState({ realm });
//         })
//     }

//     setModalVisible = (visible) => {
//         this.setState({ modalVisible: visible });
//     }
//     latitude =()=>{
//         return (((Math.floor(Math.random() * (10 - 0 + 1))) *0.0000000000000001)+37.421998333333335);

//         //return Math.floor(Math.random() * 37.421998333333335) + 37.421998333333300;

//     }
//     longitude =()=>{
//         console.log((((Math.floor(Math.round()*6)) *1)-122.084));
//         return (((Math.floor(Math.random() * (10 - 0 + 1))) *1)-122.084);
//         //return Math.floor(Math.random() * -122.099) + -122.075;
//     }
//     transitar = () => {
//         let realm = this.state.realm;
//         let baseDogos = realm.objects('Dogo');
//         this.setModalVisible(true);
//         console.log('<<<<<<<perros>>>>>>');
//         for (let p of baseDogos) {
//             console.log(p);
//         }
//         console.log('<<<<<<<perros Perdidos>>>>>>');
//         let perrosOwners = baseDogos.filter(baseDogos => baseDogos.estado == "perdido");
//         for (let p of perrosOwners) {
//             console.log(p);
//         }

//     }
//     borrarTodosDatosRealms = () => {
//         let realm = this.state.realm;

//         realm.write(() => {
//             realm.deleteAll();
//         });
//         this.setState({ realm });
//         console.log('realm BD',realm);
//     }
//     asociar = () => {
//         let realm = this.state.realm;
//         let sDog = realm.objects('Dogo').filtered('id=' + this.state.selectedDog)[0];
//         let sDog2 = realm.objects('Dogo').filtered('id=2')[0];
//         console.log('<<<<<<<perro elegido>>>>>>');
//         console.log(sDog.name);
//         let last = realm.objects('Persons').length + 1;
//         realm.write(() => {
//             let john = realm.create('Persons',
//                 {
//                     id: last,
//                     name: this.state.inputPersonsName,
//                     apellido: this.state.inputPersonsApellido,
//                     direccion: this.state.inputPersonsDireccion,
//                     telefono: this.state.inputPersonsTelefono,
//                     email: this.state.inputPersonsEmail,
//                     listDogs: [],
//                     contrasena: ''
//                 },
//             );
//             john.listDogs.push(sDog);
//             // john.listDogs.push(sDog2);
//             sDog.solicitudes = sDog.solicitudes + 1;
//         });

//         this.setState({ realm });

//         //console.log(realm.objects('Persons'));
//         console.log('<<<<<<<personas>>>>>>');
//         let personsOwners = realm.objects('Persons');
//         //.filtered('cars.@size > 0');
//         console.log('persons owners')
//         for (let p of personsOwners) {
//             // console.log(`  ${p.name}`);
//             console.log(p);
//         }
//         let sPerson = realm.objects('Persons').filtered('id=' + last)[0];
//         console.log('<<<<<<<nombre perrito>>>>>>');
//         console.log(sPerson.listDogs);
//         console.log(sPerson.listDogs[0].name);
//         this.refs['textInput1'].setNativeProps({ text: '' });
//         this.refs['textInput2'].setNativeProps({ text: '' });
//         this.refs['textInput3'].setNativeProps({ text: '' });
//         this.refs['textInput4'].setNativeProps({ text: '' });
//         this.refs['textInput5'].setNativeProps({ text: '' });
//         // console.log(realm.objects('Persons')[0].listDogs);


//     }
//     render() {

//         const { modalVisible } = this.state;
//         let baseDogos = this.state.realm.objects('Dogo');
//         let dogData = this.state.realm ? baseDogos.filter(baseDogos => baseDogos.estado == "perdido") : "";
//         return (
//             <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', fontFamily: 'Serif', backgroundColor: '#F1C40F' }}>
//                 <Text style={{ fontFamily: 'Serif', fontSize: 30, top: 0 }}>Perdidos y encontrados</Text>
//                 <Text> </Text>
//                 <Text> </Text>
//                 <View>
//                     <TouchableOpacity onPress={() => this.borrarTodosDatosRealms()}>
//                         <View style={styles.ViewButton} >
//                             <Text style={styles.textInputNew}>borrar BD</Text>
//                         </View>
//                     </TouchableOpacity>
//                 </View>
//                 <Text> </Text>
//             </View>
//         );
//     }
// };

// const styles = StyleSheet.create({
//     buttton: { backgroundColor: "#34495E", fontFamily: 'Serif', position: 'relative', width: Dimensions.get('window').width, height: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 10 },
//     textInputNew: { fontFamily: 'Serif', fontSize: 20, color: 'white' },
//     buttonBlueee: { backgroundColor: "#34495E", fontFamily: 'Serif', position: 'relative', width: 300, height: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 10 },
//     buttonBluee: { backgroundColor: "#34495E", fontFamily: 'Serif', position: 'relative', width: 365, height: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 10 },
//     ViewButton: { fontFamily: 'Serif', position: 'relative', width: 300, height: 70, backgroundColor: '#34495E', justifyContent: 'center', alignItems: 'center', borderRadius: 10 },
//     textInputt2: {
//         textAlign: 'center', backgroundColor: 'white', width: 300
//     },
//     textInputt: {
//         textAlign: 'center', backgroundColor: 'white', width: 300, fontSize: 15
//     },
//     nameMenu: {
//         backgroundColor: 'white', textAlign: 'center', justifyContent: 'center', fontSize: 20, alignItems: 'center', alignContent: 'center', backgroundColor: 'white', width: 300, height: 40
//     },
//     addPictureIcon: {
//         height: 30,
//         width: 30,
//         backgroundColor: 'white',
//         borderRadius: 50,
//         position: 'absolute',
//         left: 65,
//         top: 75,
//         justifyContent: 'center',
//         alignItems: 'center',
//         alignItems: 'center',
//     },
//     listDog: {
//         flex: 1,
//         alignItems: 'center',
//         //borderWidth: 2,
//         borderStyle: 'solid',
//         height: 400,
//         width: 400,
//         backgroundColor: '#F1C40F',
//     },
//     itemText: {
//         fontSize: 20,
//         padding: 20,
//         marginVertical: 8,
//         borderRadius: 10,
//         marginHorizontal: 16
//     },
//     inputText: {
//         paddingBottom: 50,
//         color: 'black',
//     },
//     dogBox: {
//         flexDirection: 'row',
//         height: 40,
//     },
//     buttonAdd: {
//         backgroundColor: 'lightblue',
//         borderRadius: 20,
//         width: 100,
//         height: 30,
//         alignItems: 'center',
//         justifyContent: 'center'

//     },
//     modalView: {
//         height: Dimensions.get('window').height,
//         width: Dimensions.get('window').width,
//         position: 'absolute',
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: '#F1C40F',

//         borderRadius: 20,
//         padding: 35,
//         alignItems: "center",
//         shadowColor: "#000",
//         shadowOffset: {
//             width: 0,
//             height: 2
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//         elevation: 5
//     },
//     modalView2: {
//         height: Dimensions.get('window').height + 110,
//         top: -110,
//         width: Dimensions.get('window').width,
//         position: 'absolute',
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: '#F1C40F',

//         borderRadius: 20,
//         padding: 35,
//         alignItems: "center",
//         shadowColor: "#000",
//         shadowOffset: {
//             width: 0,
//             height: 2
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//         elevation: 5
//     },
//     openButton: {
//         backgroundColor: "#F194FF",
//         borderRadius: 20,
//         padding: 10,
//         elevation: 2
//     },
//     textStyle: {
//         color: "white",
//         fontWeight: "bold",
//         textAlign: "center"
//     },
//     modalText: {
//         marginBottom: 15,
//         textAlign: "center"
//     },
// });

// export default perdidosScreen;






























































































































































// import * as React from 'react';
// import { View, Text,Button,TouchableOpacity,KeyboardAvoidingView,StyleSheet,FlatList,TextInput  } from 'react-native';

// import realm from './dataBase';
// export default class perdidosScreen extends React.Component{
//     constructor(props) {  
//         super(props);

//         this.state = {
//           realm: realm,//antes realm:null;
//           inputDog: '',
//           inputPerson: '',
//           selectedDog:'',
//           selectedPerson:'',
//         }
//         //this.persona=realm.objects('Person').sorted('id');
//         //this.personList= realm.objects('Person').sorted('');
//         Realm.open(
//           // {schema:[Person,Dog],



//         ).then( realm => {
//            this.setState({realm});
//         }      
//         )
//       }
//       asociar=()=>{
//         let realm = this.state.realm;
//         let sDog = realm.objects('Dog').filtered('id='+this.state.selectedDog)[0];
//         let sPerson = realm.objects('Person').filtered('id='+this.state.selectedPerson)[0];
//         console.log(sDog.name);
//         console.log(this.state.selectedDog);
//         // console.log(sDog);
//         // console.log(sPerson);
//         //alert(this.state.selectedDog);
//         realm.write(()=>{

//           sPerson.dog=sDog;
//         })
//         console.log(realm.objects('Person'));
//         console.log(realm.objects('Dog'));
//         this.setState({realm});
//       }

//       agregarPersona = () => {
//         let realm = this.state.realm;
//         let last = realm.objects('Person').length + 1;
//         let lastDog = realm.objects('Dog').length + 1;  
//         realm.write(() => {
//           realm.create('Person', {id: last, name: 'Juan' + last , dog: {id: lastDog, name: 'Sooby' + last}});

//         });
//         this.setState({realm});

//          console.log(realm.objects('Person').length);
//          console.log(realm.objects('Person'));
//          console.log(realm.objects('Dog').length);
//          console.log(realm.objects('Dog'));
//          let dogs = realm.objects('Dog');
//          console.log(dogs.filtered('name like "*oo*"'));    
//       }

//       agregarPerro = () => {
//         let realm = this.state.realm;    
//         let lastDog = realm.objects('Dog').length + 1;
//         realm.write(() => {
//           realm.create('Dog', {id: lastDog, name: this.state.inputDog });

//         });
//         console.log(realm.objects('Dog'));
//         this.setState({realm, inputDog: ''});
//         this.agregarPerro1;
//       }
//       agregarPerro1 = () => {
//         let realm = this.state.realm;    
//         let lastDog = realm.objects('Dog').length + 1;
//         realm.write(() => {
//           realm.create('Dog', {id: lastDog, name:'a1' });

//         });
//         console.log(realm.objects('Dog'));
//         this.setState({realm, inputDog: ''});

//       }
//       
//       renderPersonItem=({item})=>{


//         const bckColor=item.id==this.state.selectedPerson?'red':'white';
//         return(
//         <Text onPress={()=>this.setState({selectedPerson:item.id})} style={[styles.itemText,{backgroundColor:bckColor}]}>{item.name} dog: ( {item.dog!=null? item.dog.name:''} )</Text>

//         )
//       }
//       renderDogItem=({item})=>{
//         const bckColor=item.id==this.state.selectedDog?'lightblue':'white';

//         return(
//         <Text onPress={()=>this.setState({selectedDog:item.id})} style={[styles.itemText,{backgroundColor:bckColor}]} >{item.name}</Text>

//         )
//       }
//       agregarPersonaSola = () => {
//         let realm = this.state.realm;
//         let last = realm.objects('Person').length + 1;
//         let lastDog = realm.objects('Dog').length + 1;  
//         realm.write(() => {
//           realm.create('Person', {id: last, name: this.state.inputPerson + last , dog: {id: -1, name: ''}});

//         });
//         this.setState({realm});

//       }
//       agregarUnion=()=>{
//         console.log(this.state.selectedDog);
//         console.log(this.state.selectedPerson);
//       }
//     render(){
//         let personLen = this.state.realm ? this.state.realm.objects('Person').length : 0;
//         let personData = this.state.realm ? this.state.realm.objects('Person') : "";
//         let dogLen = this.state.realm ? this.state.realm.objects('Dog').length : 0;
//         let dogData = this.state.realm ? this.state.realm.objects('Dog'): "";
//         return(

//                 <View style={{flex:2}}>
//          <KeyboardAvoidingView behavior='position'>
//          <View>
//           <Button title="Crear Persona." onPress={this.agregarPersona}/>
//           <Button title="Borrar Todo." onPress={this.borrarTodo}/>
//           <Button title="Asociar perro-persona." onPress={this.asociar}/>
//           <Text> Cantidad de Personas: {personLen}</Text>
//           <View style={styles.listDog}> 
//              <FlatList //lista de personas en vista con sus nombres
//              data={personData}
//              width='100%'
//              keyExtractor={(item) =>  item.id + "_" + item.name+"_"+item.dog}
//              renderItem={({item})=>                
//                          this.renderPersonItem({item})
//                                     //<Text onPress={()=>this.setState({selectedDog:item.id})} style={styles.itemText}/>
//                         }
//              />
//           </View>
//          </View>
//          <Text>Ingrese el nombre de la persona: </Text>
//             <View style={styles.dogBox}>          
//               <View style={{flex:2}}>          
//                 <TextInput style={styles.inputText} onChangeText={ value => this.setState({inputPerson: value}) } />
//               </View>
//               <View>
//                 <TouchableOpacity onPress={ () => this.agregarPersonaSola()}>
//                   <View style={styles.buttonAdd}>
//                      <Text>Agregar</Text>
//                   </View>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={ () => this.agregarUnion()}>
//                   <View style={styles.buttonAdd}>
//                    <Text>Agregar Union</Text>
//                   </View>
//                 </TouchableOpacity>
//               </View>
//             </View>

//           <View>
//             <Text> Cantidad de Perros: {dogLen}</Text>
//             <View style={styles.listDog}>
//               <FlatList //lista de perrros en vista con sus nombres y ids
//                 data={dogData}
//                 width='100%'
//                 keyExtractor={(item) =>  item.id + "_" + item.name}
//                 renderItem={({item})=> 
//                 this.renderDogItem({item} )         
//               }
//                />
//             </View>
//             <Text>Ingrese el nombre del perro: </Text>
//             <View style={styles.dogBox}>          
//               <View style={{flex:2}}>          
//                 <TextInput style={styles.inputText} onChangeText={ value => this.setState({inputDog: value}) } />
//               </View>
//               <View>
//                 <TouchableOpacity onPress={ () => this.agregarPerro()}>
//                   <View style={styles.buttonAdd}>
//                      <Text>Agregar</Text>
//                   </View>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={ () => this.agregarUnion()}>
//                   <View style={styles.buttonAdd}>
//                    <Text>Agregar Union</Text>
//                   </View>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//          </KeyboardAvoidingView>
//        </View>
//         );  
//     }
// };

// const styles = StyleSheet.create({
//     listDog : {
//       alignItems: 'center',  
//       borderWidth: 2,
//       borderStyle: 'solid',
//       height: 200,
//     },
//     itemText: {
//       fontSize: 30 
//     },
//     inputText:{
//       paddingBottom: 50,
//     },
//     dogBox: {
//       flexDirection: 'row'
//     }, 
//     buttonAdd : {
//       backgroundColor: 'lightblue', 
//       borderRadius: 20,
//       width:100,
//       height:30,
//       alignItems: 'center',
//       justifyContent: 'center'

//     }
//   });
