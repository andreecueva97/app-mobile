import * as React from 'react';
import { Alert, Modal, TouchableHighlight, View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList } from 'react-native';
import realm from '../../src/REALMDB';
import { FloatingTitleTextInputField } from '../../src/floating_title_text_input_field';

class ayudarScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            realm: realm,//antes realm:null;
            inputName: '',
            inputApellido: '',
            inputDireccion: '',
            inputTipo: '',
            inputTipoMetodo: '',
            inputEmail: '',
            inputTelefono: 'int',
            modalVisible: false,
            shouldShow: false,
            shouldShowMetodo: false,
            inputMonto: 'int',
            inputTarjeta: '',
            inputNroTarjeta: '',
            inputCodigoTarjeta: '',
            inputCuentaCorriente: 'int',
            inputCBU: 'int',
            inputCUIT: 'int',
            inputOtros: '',
        }
        //this.persona=realm.objects('Person').sorted('id');
        //this.personList= realm.objects('Person').sorted('');
        Realm.open(
            // {schema:[Person,Dog],  
        ).then(realm => {
            this.setState({ realm });
        })
    }
    _updateMasterStateName = (attrName, value) => {
        this.setState({ inputName: value });
        this.setState({ [attrName]: value })
    }
    _updateMasterStateOtros = (attrName, value) => {
        this.setState({ inputOtros: value });
        this.setState({ [attrName]: value });
    }
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
                tipo: this.state.inputTipo,
                email: this.state.inputEmail,
                telefono: this.state.inputTelefono,
            });
        });
        this.setState({ realm });
        console.log(realm.objects('Donacion'));
        //alert('donacion/ayuda en proceso nos contactaremos con usted...');
        this.setModalVisible(true);
    }
    render() {
        const { modalVisible } = this.state;
        const { shouldShow } = this.state;
        const { shouldShowMetodo } = this.state;
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', fontFamily: 'Serif', backgroundColor: '#DC7633' }}>
                <Text style={{ fontFamily: 'Serif', fontSize: 30, top: -30 }}>Ayudar</Text>
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
                        <FlatList
                            data={['dinero', 'comida', 'voluntario', 'otros']}
                            style={{ zIndex: 1, height: 60, backgroundColor: '#DC7633', width: 300, flexGrow: 0, position: 'absolute', left: -150 }}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => { this.setState({ inputTipo: item }); this.setState({ shouldShow: !shouldShow }) }}>
                                    <View>
                                        <Text>{item}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item.toString()}
                        />
                    </View>
                ) : null}
                {this.state.inputTipo == 'dinero' ? (
                    <View>
                        <View>
                            <Text></Text>
                            <Text style={{ color: 'white', width: 300 }}>Tipo de Metodo</Text>
                            <Text style={{ fontSize: 20, color: 'white' }}>{this.state.inputTipoMetodo}</Text>
                            <Text></Text>
                            <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, }} />
                        </View>
                        <View>

                            <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, }} />
                        </View>
                        <TouchableOpacity
                            style={{left:100}}
                            onPress={() => this.setState({ shouldShowMetodo: !shouldShowMetodo })}
                        >
                            <Text>opciones Metodo</Text>
                        </TouchableOpacity>
                        {shouldShowMetodo ? (
                            <View>
                                <FlatList
                                    data={['efectivo', 'tarjeta', 'deposito']}
                                    style={{ zIndex: 2, height: 60, backgroundColor: '#DC7633', width: 300, flexGrow: 0, position: 'relative', left: 0 }}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => { this.setState({ inputTipoMetodo: item });this.setState({ shouldShowMetodo: !shouldShowMetodo }) }}>
                                            <View>
                                                <Text>{item}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                    keyExtractor={(item) => item.toString()}
                                />
                            </View>)
                            : null}
                    </View>)
                    : null}
                {this.state.inputTipo == 'comida' ?
                    <View><Text>comidaaaaaa</Text></View>
                    : null}
                {this.state.inputTipo == 'voluntario' ?
                    <View><Text>voluntario</Text></View>
                    : null}
                {this.state.inputTipo == 'otros' ?
                    <View>

                        <View>
                            <FloatingTitleTextInputField attrName='Ingrese objeto'
                                title='Ingrese objeto'
                                value={this.state.inputOtros}
                                updateMasterState={this._updateMasterStateOtros}
                                textInputStyles={{ // here you can add additional TextInput styles
                                    color: 'white',
                                }}
                            />
                            <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, }} />
                        </View>
                    </View>
                    : null}

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