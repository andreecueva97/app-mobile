import * as React from 'react';
import { Alert, Modal, TouchableHighlight, View, Text, TouchableOpacity, StyleSheet, TextInput,FlatList } from 'react-native';

import realm from '../../src/REALMDB';

import Menu, { MenuItem } from 'react-native-material-menu';


class ayudarScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            realm: realm,//antes realm:null;
            inputName: '',
            inputApellido: '',
            inputDireccion: '',
            inputTipo: '',
            inputEmail: '',
            inputTelefono: 'int',
            modalVisible: false,
            nameMenu: 'seleccionar',
            shouldShow:false,
        }
        //this.persona=realm.objects('Person').sorted('id');
        //this.personList= realm.objects('Person').sorted('');
        Realm.open(
            // {schema:[Person,Dog],  
        ).then(realm => {
            this.setState({ realm });
        })
    }
    _menu = null;

    _updateMasterStateName = (attrName, value) => {
        this.setState({ inputName: value });
        this.setState({ [attrName]: value })
    }
    onPressButtonMenu(menu) {
        console.log(menu.text);
    }
    setMenuRef = ref => {
        this._menu = ref
    };

    hideMenu = () => {
        this._menu.hide();
    };

    showMenu = () => {
        this._menu.show();
    };
    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }
    agregarDonacion = () => {
        let realm = this.state.realm;
        let last = realm.objects('Donacion').length + 1;
        //let lastDog = realm.objects('Dog').length + 1;  
        realm.write(() => {
            realm.create('Donacion', {
                id: last,
                name: this.state.inputName,
                apellido: this.state.inputApellido,
                direccion: this.state.inputDireccion,
                tipo: this.state.nameMenu,
                email: this.state.inputEmail,
                telefono: this.state.inputTelefono,
            });
        });
        this.setState({ realm });
        this.setState({ nameMenu: 'selecccionar' });
        this.refs['textInput1'].setNativeProps({ text: '' });
        this.refs['textInput2'].setNativeProps({ text: '' });
        this.refs['textInput3'].setNativeProps({ text: '' });
        this.refs['textInput5'].setNativeProps({ text: '' });
        this.refs['textInput6'].setNativeProps({ text: '' });
        console.log(realm.objects('Donacion'));
        //alert('donacion/ayuda en proceso nos contactaremos con usted...');
        this.setModalVisible(true);
    }
    render() {
        const { modalVisible } = this.state;
        const {shouldShow}=this.state;
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', fontFamily: 'Serif', backgroundColor: '#DC7633' }}>
                <Text style={{ fontFamily: 'Serif', fontSize: 30, top: -30 }}>Ayudar</Text>

                <View style={styles.dogBox}>
                    {/* <Menu
                                    ref={this.setMenuRef} 
                                    style={{width:300}}
                                    button={<Text style={styles.nameMenu } onPress={this.showMenu}>{this.state.nameMenu}</Text>}
                                >
                                    <MenuItem onPress={()=>{this.hideMenu();this.setState({nameMenu:'dinero'})}} >dinero</MenuItem>
                                    <MenuItem onPress={()=>{this.hideMenu();this.setState({nameMenu:'comida'})}}>comida</MenuItem>
                                    <MenuItem onPress={()=>{this.hideMenu();this.setState({nameMenu:'participacion'})}}>participacion</MenuItem>
                                    <MenuItem onPress={()=>{this.hideMenu();this.setState({nameMenu:'otros'})}}>otros</MenuItem>
                                </Menu> */}
                </View>

                <Text></Text>
                <View>
                    <Text></Text>
                    <Text style={{ color: 'white', width: 300 }}>Tipo de donacion</Text>
                    <Text style={{ fontSize: 20, color: 'white' }}>{this.state.inputTipo}</Text>
                    <Text></Text>
                    <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, }} />
                </View>
                    <View>

                        <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, }} />
                    </View>

                

                <TouchableOpacity
                    style={{}}
                    onPress={() => this.setState({ shouldShow: !shouldShow })}
                >
                    <Text>opciones</Text>
                </TouchableOpacity>
                {shouldShow ? (
                    <View>
                        {/* <Image
              source={{
                uri:
                  'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png',
              }}
              style={{width: 250, height: 250}}
            /> */}
                        <FlatList
                            data={['dinero', 'comida', 'participacion', 'otros']}
                            style={{ zIndex: 1, height: 60, backgroundColor: '#DC7633', width: 300, flexGrow: 0, position: 'absolute', left: -150 }}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => { this.setState({ inputTipo: item });}}>
                                    <View>
                                        <Text>{item}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item.toString()}
                        />
                    </View>
                ) : null}
                <View>
                    <Text></Text>
                    <TouchableOpacity onPress={() => this.agregarDonacion()}>
                        <View style={{ ...styles.openButton, backgroundColor: "grey", borderRadius: 10, width: 300 }} >
                            <Text style={styles.textButtonDonacion}>Donar</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => { Alert.alert("Modal fue cerrado."); }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Muchas gracias por su colaboracion.Nos contactaremos con usted...</Text>
                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: "#34495E" }}
                                onPress={() => { this.setModalVisible(!modalVisible); }}
                            >
                                <Text style={styles.textStyle}>continuar</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>

            </View>

        );
    }
};

const styles = StyleSheet.create({
    buttonBlue: { fontFamily: 'Serif', position: 'relative', width: 300, height: 70, backgroundColor: '#34495E', justifyContent: 'center', alignItems: 'center', borderRadius: 10 },
    textButtonDonacion: { fontFamily: 'Serif', fontSize: 20, color: 'white' },
    textAyudar: { fontFamily: 'Serif', fontSize: 20 },
    textInputAyudar: {
        textAlign: 'center', backgroundColor: 'white', width: 300, fontSize: 15
    },
    nameMenu: {
        backgroundColor: 'white', textAlign: 'center', justifyContent: 'center', fontSize: 20, alignItems: 'center', alignContent: 'center', backgroundColor: 'white', width: 300, height: 40
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    listDog: {
        alignItems: 'center',
        borderWidth: 2,
        borderStyle: 'solid',
        height: 200,
    },
    itemText: {
        fontSize: 20
    },
    inputText: {
        paddingBottom: 50,
        color: 'black',
    },
    dogBox: {
        flexDirection: 'row',
        height: 40,
    },
    buttonAdd: {
        backgroundColor: 'lightblue',
        borderRadius: 20,
        width: 100,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalView: {
        height: 550,
        top: 65,
        position: 'absolute',
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
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
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
});


export default ayudarScreen;

//onPress={() => this.props.navigation.navigate('home')}

// let exercise = realm.create('Exercise', {
//     id: 209,
//     name: 'Dumbbell Overhead Press',
//     category: 'Military Press',
//     bodyPart: 'Shoulder'
// }, true);
// exercise[0].levels.push({
//     level: 3,
//     equipments: 'DB'
// });