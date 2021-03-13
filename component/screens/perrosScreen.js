import * as React from 'react';
import { View, Text, Alert, Modal, TouchableHighlight, TextInput, ScrollView, Dimensions, TouchableOpacity, FlatList, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import realm from '../../src/REALMDB';
import DogoGlobitosAdoptar from '../../src/DogoGlobitosAdoptar';
import Burger from '../../src/Burger';

// adoptarScreen ==> perrosScreen
class perrosScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      realm: realm,//antes realm:null;
      inputDog: '',
      inputPerson: '',
      selectedDog: '',
      selectedPerson: '',
      counter: 0,
      modalVisible4: false,
      inputPersonsName: '',
      inputPersonsApellido: '',
      inputPersonsDireccion: '',
      inputPersonsTelefono: 'int',
      inputPersonsEmail: '',
      active2: false,
    }
    //this.persona=realm.objects('Person').sorted('id');
    //this.personList= realm.objects('Person').sorted('');
    Realm.open(
      // {schema:[Person,Dog],
    ).then(realm => {
      this.setState({ realm });
    })
  }
  renderImage(image) {
    return <Image style={{ width: 120, height: 120, resizeMode: 'contain' }} source={image} />///66,58
  }
  renderAsset(image) {
    if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
      return this.renderVideo(image);
    }

    return this.renderImage(image);
  }

  //PERRO CON IMAGEN PARA HACER CLICK
  renderDogItem = ({ item }) => {
    const bckColor = item.id == this.state.selectedDog ? 'lightgrey' : 'lightgreen';
      return (
        <View style={[{ backgroundColor: bckColor }, styles.itemText2]}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: 120 }}>
              <ScrollView horizontal={true}  >
                {/* {this.state.image ? this.renderAsset(this.state.image) : null} */}
                {(item.listImagen==0) ?
                                      <Image
                                             style={{ width: 120, height: 120 }}
                                             source={require('@img/andre.png')} />
                    :
                  (item.listImagen)?
                                      item.listImagen.map(i =>
                                             <View key={i.uri} >
                                                  {this.renderAsset(i)}
                                             </View>
                                      )
                      :[]
                }
              </ScrollView>
            </View>
            <TouchableWithoutFeedback onPress={() => this.setState({ selectedDog: item.id })} >
            <View style={{ width: 180, marginLeft: 10 }}>
              <Text >nombre: {item.name}</Text>
              <Text>color:{item.color}</Text>
              <Text>raza:{item.raza}</Text>
              <Text>estado:{item.estado}</Text>
              <Text>info:{item.informacion}</Text>
              <Text>solicitudes:{item.solicitudes}</Text>
            </View>
            </TouchableWithoutFeedback>
            <View>
              <DogoGlobitosAdoptar color="#ff0404" style={{ indexZ: 10, top: 100 }} />
            </View>
            <View style={{ left: -40, top: 40 }}>
            </View>
          </View>
        </View>
      )
  }/////////////////////////////
  // componentDidMount() {
  //   //const a = this.state.realm;
  //   //const b = realm;
  //   setInterval(() => {
  //     this.setState(prevState => ({ counter: prevState.counter + 1 }));
  //   }, 1000);
  //   // setInterval(() => {
  //   //   if (a != b) {
  //   //     this.setState(prevState => ({ realm: prevState.realm }));
  //   //   }

  //   // }, 1000);
  //   // this.setState({ realm: !this.state.realm });
  // }////////////////////////////
  setModalVisible4 = (visible) => {
    this.setState({ modalVisible4: visible });
  }////////////////////////
  // componentWillUnmount() {
  //   clearInterval(this.timerID);
  //   this.setState = (state, callback) => {
  //     return;
  //   };
  // }/////////////////////////////////
  asociar = () => {
    let realm = this.state.realm;
    let sDog = realm.objects('Dogo').filtered('id=' + this.state.selectedDog)[0];//let sDog2 = realm.objects('Dogo').filtered('id=2')[0];
    let personaInicia= realm.objects('PersonsLogin').filtered('id=1')[0];
    console.log('<<<<<<<perro elegido>>>>>>');
    console.log(sDog.name);
    console.log('email loggeado',realm.objects('PersonsLogin')[0].email);
    console.log('persona loggeada',personaInicia);
    // let last = realm.objects('Persons').length + 1;
    realm.write(() => {
      
      sDog.solicitudes = sDog.solicitudes + 1;    //update realm
      personaInicia.listDogs.push(sDog);
    });

    this.setState({ realm });
  
  
    // let sPerson = realm.objects('Persons').filtered('id=' + last)[0];
    // console.log('<<<<<<<nombre perrito>>>>>>');
    console.log('perro agregado a persona',personaInicia.listDogs);
  }
  render() {
    const { modalVisible4 } = this.state;
    let dogData = this.state.realm ? this.state.realm.objects('Dogo').filter(baseDogos => baseDogos.estado == "adoptar") : "";
    return (
      <View style={styles.adoptarScreen}>
        <View style={{ flex: 0.15, flexDirection: 'row', backgroundColor: "white", fontFamily: 'Serif', position: 'relative', width: Dimensions.get('window').width, height: 70, justifyContent: 'center', alignItems: 'center' }}>

          <View style={{ left: 20 }}>
            <Text style={styles.buttonTextsTitulo}>Perros</Text>
          </View>
          <View style={{ left: 130 }}>
            <Burger
              active={this.state.active2}
              type="spinCross"
              onPress={() => { this.setState({ active2: !this.state.active2 }) }}
            />
          </View>

        </View>

        <Text style={{ color: '#7F8C8D' }}>{this.state.counter}</Text>
        <View style={styles.listDog}>
          <FlatList //lista de perrros en vista con sus nombres y ids
            data={dogData}
            width='100%'
            keyExtractor={(item) => item.id + "_" + item.name}
            renderItem={({ item }) =>
              this.renderDogItem({ item })
            }
          />
        </View>
        <Text></Text>
        <View>
          <TouchableOpacity onPress={() => { this.setModalVisible4(true); this.asociar()}}>
            <View style={{...styles.openButton,  backgroundColor: "grey", borderRadius: 10, width: 300}} >
              <Text  style={styles.textStyle}>adoptar</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text></Text>

        <Modal                                                                                       ///MODAL AGRADECIMIENTO
          animationType="none"
          transparent={true}
          visible={modalVisible4}
          onRequestClose={() => { Alert.alert("Modal fue cerrado."); }}
        >
          <View>
            <View style={styles.modalView}>
              <View style={{ flexDirection: 'row-reverse', top: 250 }}>
                <DogoGlobitosAdoptar color="#990c0f" style={{ indexZ: 40, top: 20 }} />
              </View>
              <Text style={styles.modalText}>Muchas gracias Nos contactaremos con usted</Text>
              <TouchableHighlight
                style={{ ...styles.openButton,  backgroundColor: "grey", borderRadius: 10, width: 300}}
                onPress={() => { this.setModalVisible4(!modalVisible4); }}>
                <Text >continuar</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  buttonTexts: { fontFamily: 'Serif', fontSize: 20, color: 'white' },
  buttonTextsTitulo: { fontFamily: 'Serif', fontSize: 30, color: 'black' },
  datosPersonales: { fontFamily: 'Serif', fontSize: 30, width: 300, textAlign: 'center' },
  buttonLong: { fontFamily: 'Serif', position: 'relative', width: 365, height: 70, backgroundColor: '#34495E', justifyContent: 'center', alignItems: 'center', borderRadius: 10 },
  texts: {
    fontFamily: 'Serif', fontSize: 20
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
},
  textInputtt: { backgroundColor: 'white', textAlign: 'center', width: 300, fontSize: 15 },
  buttonBlueClassic: {
    backgroundColor: "#34495E", fontFamily: 'Serif', position: 'relative', width: 300, height: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 10
  },
  adoptarScreenText: {
    fontFamily: 'Serif', fontSize: 30, alignContent: 'center', justifyContent: 'center', top: 8.5

  },
  adoptarScreen: {
    flex: 1, alignItems: 'center', justifyContent: 'center', fontFamily: 'Serif', backgroundColor: '#7F8C8D'
  },
  posicionesDogitos: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  Dogitos: {
    height: 300,
  },
  listDog: {
    flex: 1,
    alignItems: 'center',
    //borderWidth: 2,
    borderStyle: 'solid',
    height: 400,
    width: 400,

  },
  itemText2: {
    fontSize: 30,
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
    marginHorizontal: 16
  },
  itemText: {
    fontSize: 30,
    backgroundColor: 'green',
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
    height: Dimensions.get('window').height + 110,
    width: Dimensions.get('window').width,
    position: 'absolute',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#7F8C8D',

    borderRadius: 20,
    padding: 100,
    top: -110,
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
    height: 300,
    top: 150,
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

export default perrosScreen;