import * as React from 'react';
import { Alert, Image, ScrollView, Modal, FlatList, NativeModules, TouchableHighlight, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

import realm from '../../src/REALMDB';
import DogoGlobitosTransitar from '../../src/DogoGlobitosTransitar';
import { FloatingTitleTextInputField } from '../../src/floating_title_text_input_field';
var ImagePicker = NativeModules.ImageCropPicker;
//transitarScreen ==> agregarPerrosScreen
class agregarPerrosScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            realm: realm,//antes realm:null;
            inputName: '',
            inputColor: '',
            isFieldActive: false,
            inputRaza: '',
            inputEstado: '',
            inputImagen: [],
            inputInformacion: '',
            selectedDog: '',
            modalVisible2: false,
            shouldShow: false,
            shouldShowEstado: false,
            ListaDBDogs:['DESCONOCIDO', 'GALGO', 'BULLDOG', 'CHIHUAHUA', 'PASTOR ALEMAN', 'LABRADOR',' Alano ', ' Alaskan Malamute ', ' American Staffordshire Terrier ', ' American Water Spaniel ', ' Antiguo Pastor Inglés ', ' Basset Azul de Gaseogne ', ' Basset Hound ', ' Basset leonado de Bretaña ', ' Beagle ', ' Bearded Collie ', ' Bichón Maltés ', ' Bobtail ', ' Border Collie ', ' Boston Terrier ', ' Boxer ', ' Bull Terrier ', ' Bulldog Americano ', ' Bulldog Francés ', ' Bulldog Inglés ', ' Caniche ', ' Carlino ', ' Chihuahua ', ' Cirneco del Etna ', ' Chow Chow ', ' Cocker Spaniel Americano ', ' Cocker Spaniel Inglés ', ' Dálmata ', ' Dobermann ', ' Dogo Alemán ', ' Dogo Argentino ', ' Dogo de Burdeos ', ' Finlandés ', ' Fox Terrier de pelo liso ', ' Fox Terrier ', ' Foxhound Americano ', ' Foxhound Inglés ', ' Galgo Afgano ', ' Gigante de los Pirineos ', ' Golden Retriever ', ' Gos d`Atura ', ' Gran Danés ', ' Husky Siberiano ', ' Laika de Siberia Occidental ', ' Laika Ruso-europeo ', ' Labrador Retriever ', ' Mastín del Pirineo ', ' Mastin del Tibet ', ' Mastín Español ', ' Mastín Napolitano ', ' Pastor Alemán ', ' Pastor Australiano ', ' Pastor Belga ', ' Pastor de Brie ', ' Pastor de los Pirineos de Cara Rosa ', ' Pekinés ', ' Perdiguero Chesapeake Bay ', ' Perdiguero de Drentse ', ' Perdiguero de Pelo lido ', ' Perdiguero de pelo rizado ', ' Perdiguero Portugués ', ' Pitbull ', ' Podenco Ibicenco ', ' Podenco Portugués ', ' presa canario ', ' Presa Mallorquin ', ' Rottweiler ', ' Rough Collie ', ' Sabueso Español ', ' Sabueso Hélenico ', ' Sabueso Italiano ', ' Sabueso Suizo ', ' Samoyedo ', ' San Bernardo ', ' Scottish Terrier ', ' Setter Irlandés ', ' Shar Pei ', ' Shiba Inu ', ' Siberian Husky ', ' Staffordshire Bull Terrier ', ' Teckel ', ' Terranova ', ' Terrier Australiano ', ' Terrier Escocés ', ' Terrier Irlandés ', ' Terrier Japonés ', ' Terrier Negro Ruso ', ' Terrier Norfolk ', ' Terrier Norwich ', ' Yorkshire Terrier ']
        }
        Realm.open(
            // {schema:[Person,Dog],  
        ).then(realm => {
            this.setState({ realm });
            //realm.close();
        })
    }
    removeThisImage(e) {
        var array = [...this.state.inputImagen]; // make a separate copy of the array
        console.log('array', array);
        var index = array.indexOf(e);
        console.log('===>', array[0].uri);
        array.forEach(i => {
            if (i.uri == e) {
                index = array.indexOf(i);
            }
        });
        console.log('e==>', e);
        console.log('array element ==>', array.indexOf(e));
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({ inputImagen: array });
        }
    }
    pickSingleAddImages(cropit, circular = false, mediaType) {
        ImagePicker.openPicker({
            width: 500,
            height: 500,
            cropping: cropit,
            cropperCircleOverlay: circular,
            compressImageMaxWidth: 1000,
            compressImageMaxHeight: 1000,
            compressImageQuality: 1,
            compressVideoPreset: 'MediumQuality',
            includeExif: true,
        }).then(i => {
            console.log('received image==>', i);
            console.log('path ==>', i.path);
            if (this.state.inputImagen == null) {
                this.setState({
                    inputImagen: [].concat({ uri: i.path, width: i.width, height: i.height, mime: i.mime })
                })
            }
            else {
                this.setState({
                    inputImagen:
                        this.state.inputImagen.concat
                            ({ uri: i.path, width: i.width, height: i.height, mime: i.mime })

                });
            }

        }).catch(e => {
            console.log(e);
            Alert.alert(e.message ? e.message : e);
        });
    }
    pickSingleWithCamera(cropping, mediaType = 'photo') {
        ImagePicker.openCamera({
            cropping: cropping,
            width: 500,
            height: 500,
            includeExif: true,
            mediaType,
        }).then(image => {
            console.log('received image', image);
            if (this.state.inputImagen == null) {
                this.setState({
                    inputImagen: [].concat({ uri: image.path, width: image.width, height: image.height, mime: image.mime })
                })
            }
            else {
                this.setState({
                    // image: { uri: image.path, width: image.width, height: image.height, mime: image.mime },
                    inputImagen: this.state.inputImagen.concat
                        ({ uri: image.path, width: image.width, height: image.height, mime: image.mime })
                });
            }

        }).catch(e => alert(e));
    }
    pickMultipleAddImages() {
        ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd: false,
            includeExif: true,
            forceJpg: true,
        }).then(imagess => {
            if (this.state.inputImagen == null) {
                this.setState({ inputImagen: [] });

                imagess.map(i => {
                    // console.log('received image==>', i);
                    // console.log('path==>',i.path);
                    this.setState({
                        inputImagen: this.state.inputImagen.concat({ uri: i.path, width: i.width, height: i.height, mime: i.mime })
                    })

                })
            }
            else {
                imagess.map(i => {
                    // console.log('received image==>', i);
                    // console.log('path==>',i.path);
                    this.setState({
                        inputImagen: this.state.inputImagen.concat({ uri: i.path, width: i.width, height: i.height, mime: i.mime })
                    })

                })
            }



        }).catch(e => alert(e));
        console.log('imagessss', this.state.inputImagen);
    }
    scaledHeight(oldW, oldH, newW) {
        return (oldH / oldW) * newW;
    }
    renderImage(image) {
        return <Image style={{ width: 66, height: 58, resizeMode: 'contain' }} source={image} />///66,58
    }

    renderAsset(image) {
        if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
            return this.renderVideo(image);
        }

        return this.renderImage(image);
    }
    renderVideo(video) {
        console.log('rendering video');
        return (<View style={{ height: 300, width: 300 }}>
            <Video source={{ uri: video.uri, type: video.mime }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0
                }}
                rate={1}
                paused={false}
                volume={1}
                muted={false}
                resizeMode={'cover'}
                onError={e => console.log(e)}
                onLoad={load => console.log(load)}
                repeat={true} />
        </View>);
    }
    setModalVisible2 = (visible) => {
        this.setState({ modalVisible2: visible });
    }
    latitude = () => {
        return (((Math.floor(Math.random() * (10 - 0 + 1))) * 0.0000000000000001) + 37.421998333333335);

        //return Math.floor(Math.random() * 37.421998333333335) + 37.421998333333300;

    }
    longitude = () => {
        console.log((((Math.floor(Math.round() * 6)) * 1) - 122.084));
        return (((Math.floor(Math.random() * (10 - 0 + 1))) * 1) - 122.084);
        //return Math.floor(Math.random() * -122.099) + -122.075;
    }
    _updateMasterStateName = (attrName, value) => {
        this.setState({ inputName: value });
        this.setState({ [attrName]: value })
    }
    _updateMasterStateColor = (attrName, value) => {
        this.setState({ inputColor: value });
        this.setState({ [attrName]: value })
    }
    _updateMasterStateRaza = (attrName, value) => {
        this.setState({ inputRaza: value });
        this.setState({ [attrName]: value })
    }
    _updateMasterStateEstado = (attrName, value) => {
        this.setState({ inputEstado: value });
        this.setState({ [attrName]: value })
    }
    _updateMasterStateInformacion = (attrName, value) => {
        this.setState({ inputInformacion: value });
        this.setState({ [attrName]: value })
    }
    agregarDogs = () => {
        let realm = this.state.realm;
        let val= this.state.inputImagen;
        // realm.write(() => {
        //     realm.deleteAll();
        // });
        this.setState({ realm });
        let last = realm.objects('Dogo').length + 1;
        console.log(realm.objects('Dogo'));
        // if(val==null){
        //     this.setState({inputImagen:[]});
        // }
        // }else{
        //   
        // }
        realm.write(() => {
            realm.create('Dogo', {
                id: last,
                name: this.state.inputName,
                color: this.state.inputColor,
                raza: this.state.inputRaza,
                estado: this.state.inputEstado,
                listImagen: this.state.inputImagen,
                informacion: this.state.inputInformacion,
                latitude: String(this.latitude()),
                longitude: String(this.longitude()),
                solicitudes: 0,
                vistas: 0
            });
            // realm.objects('Dogo')[last].imagen.push(this.state.inputImagen);
        });
        this.setState({ realm });
        console.log(this.state.realm.objects('Dogo'));

        console.log('<<<<<<<perros>>>>>>');
        let perrosOwners = realm.objects('Dogo');
        for (let p of perrosOwners) {
            console.log(p);
        }
        this.setModalVisible2(true);
    }
    // renderDogItem = ({ item }) => {
    //     const bckColor = item.id == this.state.selectedDog ? 'lightgrey' : 'white';
    //     return (
    //         <Text onPress={() => this.setState({ selectedDog: item.id })} style={[styles.itemText, { backgroundColor: bckColor }]} >{item.name}</Text>
    //     )
    // }
    renderDogItem = ({ item }) => {
        const bckColor = item.id == this.state.selectedDog ? 'lightgrey' : 'white';
        //item.raza == 'desconocida'?require('@img/andre.png'):require('@img/galgo.jpg');
        return (
            <TouchableHighlight onPress={() => this.setState({ selectedDog: item.id })} >
                <View style={[{ backgroundColor: bckColor }, styles.itemText]}>
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <Image
                                style={{ width: 120, height: 120 }}
                                source={raza} />
                        </View>
                        <View style={{ width: 180, marginLeft: 10 }}>
                            <Text >nombre: {item.name}</Text>
                            <Text>color:{item.color}</Text>
                            <Text>raza:{item.raza}</Text>
                            <Text>estado:{item.estado}</Text>
                            <Text>imagen:{item.listImagen}</Text>
                            <Text>info:{item.informacion}</Text>
                            <Text>solicitudes:{item.solicitudes}</Text>
                        </View>
                        <View>
                            <DogoGlobitosTransitar color="#ff0404" style={{ indexZ: 10, top: 100 }} />
                        </View>
                        <View style={{ left: -40, top: 40 }}>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
    render() {
        const { shouldShow } = this.state;
        const { shouldShowEstado } = this.state;
        const { modalVisible2 } = this.state;
        let baseDogos = this.state.realm.objects('Dogo');
        //let dogData = this.state.realm ? baseDogos.filter(baseDogos => baseDogos.estado == "transitar") : "";
        return (
            <View style={styles.ViewAll}>

                <Text style={{ fontFamily: 'Serif', fontSize: 30 }}>Agregar Perro</Text>

                <View>
                    <Text></Text>
                    <Text style={{ color: 'white', width: 300 }}> Raza</Text>
                    <View style={{ height: 45, flexDirection: 'row' }}>
                        <View style={{ width: 240 }}>
                            <Text style={{ fontSize: 20, color: 'white' }}>{this.state.inputRaza}</Text>
                        </View>
                        <View style={{ width: 60, height: 58 }}>
                            <TouchableOpacity onPress={() => this.setState({ shouldShow: !shouldShow })}>
                                {/* <Text>opciones</Text> */}
                                <Image
                style={{ width: 25, height: 25, top:0,left:21}}
                source={require('@img/iconOptions.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, }} />
                </View>
                {shouldShow ? (
                    <View>
                        {/* <Image  source={{    uri:     'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png',  }}   style={{width: 250, height: 250}}   /> */}
                        <FlatList
                            data={this.state.ListaDBDogs}
                            style={{ zIndex: 1, height: 60, backgroundColor: '#17A589', width: 300, flexGrow: 0, position: 'absolute', left: -150 }}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => { this.setState({ inputRaza: item }); this.setState({ shouldShow: !shouldShow }) }}>
                                    <View>
                                        <Text>{item}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item.toString()}
                        />
                    </View>
                ) : null}
                {/* </View> */}
                {/* menu desplegable */}

                <View>
                    <Text style={{ color: 'white', width: 300 }}> Estado</Text>
                    <View style={{ height: 45, flexDirection: 'row' }}>
                        <View style={{ width: 240 }}>
                            <Text style={{ fontSize: 20, color: 'white' }}>{this.state.inputEstado}</Text>
                        </View>
                        <View style={{ width: 60, height: 58 }}>
                            <TouchableOpacity onPress={() => this.setState({ shouldShowEstado: !shouldShowEstado })}>
                                {/* <Text>opciones</Text> */}
                                <Image
                style={{ width: 25, height: 25, top:0,left:21}}
                source={require('@img/iconOptions.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, }} />
                </View>

                {shouldShowEstado ? (
                    <View>
                        <FlatList
                            data={['adoptar', 'transitar', 'perdido', 'encontrado',]}
                            style={{ zIndex: 1, height: 60, backgroundColor: '#17A589', width: 300, flexGrow: 0, position: 'absolute', left: -150 }}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => { this.setState({ inputEstado: item }); this.setState({ shouldShowEstado: !shouldShowEstado }) }}>
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
                    <Text style={{ color: 'white', width: 300 }}> Imagen</Text>

                    <View style={{ height: 58, flexDirection: 'row' }}>
                        <View style={{ width: 240 }}>
                            <ScrollView horizontal={true}  >
                                {/* {this.state.image ? this.renderAsset(this.state.image) : null} */}
                                {this.state.inputImagen ?
                                    this.state.inputImagen.map(i =>
                                        <View key={i.uri} >
                                            <TouchableOpacity onPress={() => this.removeThisImage(i.uri)} >
                                                <View style={{}}>
                                                    <View style={{ backgroundColor: 'grey', width: 10, height: 10, borderRadius: 10, left: 55 }}>
                                                        <Text style={{ color: 'white', textAlign: 'right', fontSize: 10, alignContent: 'center', top: -2, left: -2 }}>X</Text>
                                                    </View>
                                                </View>

                                            </TouchableOpacity>
                                            {this.renderAsset(i)}
                                        </View>
                                    )
                                    :
                                    []}
                            </ScrollView>
                        </View>
                        <View style={{ width: 60, height: 58 }}>
                            <TouchableOpacity onPress={this.pickMultipleAddImages.bind(this)} >
                            <Image
                style={{ width: 37, height: 28, top:0,left:13}}
                source={require('@img/iconGallery.png')} />
                                {/* <Text>Sel.Mult</Text> */}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.pickSingleWithCamera(false)} style={styles.button}>
                                {/* <Text style={styles.text}>Sel.Cam</Text> */}
                                <Image
                style={{ width: 32, height: 32, top: 0,left:15 }}
                source={require('@img/iconCamera.png')} />
                            </TouchableOpacity>
                        </View>


                    </View>
                    <Text></Text>
                    {/* <FloatingTitleTextInputField attrName='Imagen'
                        title='Imagen'
                        value={this.state.inputImagen}
                        updateMasterState={this._updateMasterStateImagen}
                        textInputStyles={{ // here you can add additional TextInput styles
                            color: 'white',
                        }}
                    /> */}
                    <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, }} />
                </View>

                <View>
                    <FloatingTitleTextInputField attrName='Nombre'
                        title='Nombre'
                        value={this.state.inputName}
                        updateMasterState={this._updateMasterStateName}
                        textInputStyles={{ // here you can add additional TextInput styles
                            color: 'white',
                        }}
                    />
                    <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, }} />
                </View>

                <View>
                    <FloatingTitleTextInputField attrName='Color'
                        title='Color'
                        value={this.state.inputColor}
                        updateMasterState={this._updateMasterStateColor}
                        textInputStyles={{ // here you can add additional TextInput styles
                            color: 'white',
                        }}
                    />
                    <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, }} />
                </View>

                <View>
                    <FloatingTitleTextInputField attrName='Informacion'
                        title='Informacion'
                        value={this.state.inputInformacion}
                        updateMasterState={this._updateMasterStateInformacion}
                        textInputStyles={{ // here you can add additional TextInput styles
                            color: 'white',
                        }}
                    />
                    <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, }} />
                </View>
                <Text> </Text>

                <View>
                    <TouchableOpacity onPress={() => { this.agregarDogs() }} style={{ ...styles.openButton, backgroundColor: "grey", borderRadius: 10, width: 300 }}>
                        <Text style={styles.textStyle}>agregar</Text>
                    </TouchableOpacity>
                </View>
                <Text> </Text>
                <Text> </Text>
                <Text> </Text>

                <Modal                                                                                //MODAL2 CON SOLO DESVANECE EL MODAL CUANDO SE AGREGO CORRECTAMENTE UN PERRITO
                    animationType="none"
                    transparent={true}
                    visible={modalVisible2}
                    onRequestClose={() => {
                        Alert.alert("Modal fue cerrado.");
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>perrito agregado sin problemas!</Text>
                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: "#34495E" }}
                                onPress={() => { this.setModalVisible2(!modalVisible2); }}
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
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        justifyContent: "center",
        alignItems: "center",
    },

    ViewAll: { flex: 2, alignItems: 'center', justifyContent: 'center', fontFamily: 'Serif', backgroundColor: '#17A589' },
    textInputTransitarSecond: { textAlign: 'center', backgroundColor: 'white', width: 300 },
    buttonBlueThird: { fontFamily: 'Serif', position: 'relative', width: 300, height: 70, backgroundColor: '#34495E', justifyContent: 'center', alignItems: 'center', borderRadius: 10 },
    buttonBlueSecond: { backgroundColor: "#34495E", fontFamily: 'Serif', position: 'relative', width: 365, height: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 10 },
    DatosPersonales: { fontFamily: 'Serif', fontSize: 30, width: 300, textAlign: 'center' },
    textForm: { fontFamily: 'Serif', fontSize: 20 },
    textInputTransitar: { textAlign: 'center', backgroundColor: 'white', width: 300, fontSize: 15 },
    buttonBlue: { backgroundColor: "#34495E", fontFamily: 'Serif', position: 'relative', width: 300, height: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 10 },
    textButton: { fontFamily: 'Serif', fontSize: 20, color: 'white' },
    textTitle: { fontFamily: 'Serif', fontSize: 30, alignContent: 'center', justifyContent: 'center', top: 8.5 },
    listDog: {
        flex: 1,
        alignItems: 'center',
        //borderWidth: 2,
        borderStyle: 'solid',
        height: 400,
        width: 400,
        backgroundColor: '#17A589',
    },
    itemText: {
        fontSize: 20,
        padding: 20,
        marginVertical: 8,
        borderRadius: 10,
        marginHorizontal: 16
    },
    inputText: {
        paddingBottom: 50,
        color: 'black',
    },
    dogBox: {
        flexDirection: 'row',
        height: 40,
        backgroundColor: 'black'
    },
    buttonAdd: {
        backgroundColor: 'lightblue',
        borderRadius: 20,
        width: 100,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'

    },
    titleStyles: {
        position: 'absolute',
        fontFamily: 'Avenir-Medium',
        left: 3,
        left: 4,
        color: 'white',
        fontSize: 30,
    },
    modalView: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        position: 'absolute',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#17A589',

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
    modalView2: {
        height: Dimensions.get('window').height + 110,
        top: -110,
        width: Dimensions.get('window').width,
        position: 'absolute',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#17A589',

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


export default agregarPerrosScreen;