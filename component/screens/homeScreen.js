import * as React from 'react';
import { ImageBackground, View, Text,TouchableWithoutFeedback, Image, StyleSheet, Animated, Dimensions } from 'react-native';
import realm from '../../src/REALMDB';
import DogoGlobitosHome from '../../src/DogoGlobitosHome';

class homeScreen extends React.Component {

  marginTop = new Animated.Value(1);
  margin = new Animated.Value(-200);

  constructor(props) {
    super(props);

    this.state = {
      realm: realm,
    }
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
  }

  render() {
    return (
      <View style={{ flex: 1, position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
        <View>
          <Animated.View style={[styles.Box, { alignItems: 'center', justifyContent: 'center', position: 'absolute', height: Dimensions.get('window').height, width: Dimensions.get('window').width, zIndex: 30, opacity: this.marginTop, left: this.margin }]}>
            <View>
              <Image style={{ width: 160, height: 160, top: -70 }} source={require('@img/casaRoja.png')} />
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
       
        <View style={{ justifyContent: 'center', fontFamily: 'Serif',top:-170}}>
        
        <Image
                      style={{ width: 350, height: 350,top:570,left:18}}
                      source={require('@img/patitaPerro.png')} />
            <Text style={{ justifyContent: 'center', alignContent: 'center', top: 470, fontSize: 40, color: 'grey', left: 105, fontFamily: 'Serif' }}>Dog.S.O.S.</Text>
            <View style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', width: Dimensions.get('window').width, height: Dimensions.get('window').height }}>

              <View style={{  transform: [{ scaleY: 2 }, { rotate: '-14deg' }], width: 98, height: 80, top: 90, left: -142, borderRadius: 43 }}>
                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('perros')}>
                  <View style={{ fontFamily: 'Serif', position: 'relative', borderRadius: 40, width: 101, height: 80, transform: [{ scaleY: 1 }, { rotate: '-14deg' }], left: 0, backgroundColor: '#7F8C8D', justifyContent: 'center', alignItems: 'center', }}>
                    <Image
                      style={{ width: 40, height: 40 }}
                      source={require('@img/andre.png')} />
                    <Text style={{ fontFamily: 'Serif', fontSize: 10 }}>PERFIL</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View style={{  transform: [{ scaleY: 2 }, { rotate: '-7deg' }], top: -100, borderRadius: 43, width: 101, height: 80, left: -65, }}>
                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('agregar')}>
                  <View style={{ fontFamily: 'Serif', position: 'relative', top: 0, left: 1, borderRadius: 40, width: 101, height: 80, transform: [{ scaleY: 1 }, { rotate: '-1deg' }], bottom: 5, backgroundColor: '#17A589', justifyContent: 'center', alignItems: 'center', }}>
                    <Image
                      style={{ width: 40, height: 40 }}
                      source={require('@img/huellitas.png')} />
                    <Text style={{ fontFamily: 'Serif', fontSize: 9 }}>Agregar Perro</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>


              <View style={{  transform: [{ scaleY: 2 }, { rotate: '7deg' }], top: -180, borderRadius: 43, width: 101, height: 80, left: 57, }}>
                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('ayudar')}>
                  <View style={{ fontFamily: 'Serif', position: 'relative', top: 0, borderRadius: 40, width: 101, height: 80, transform: [{ scaleY: 1 }, { rotate: '7deg' }], backgroundColor: '#DC7633', justifyContent: 'center', alignItems: 'center', }}>
                    <Image
                      style={{ width: 40, height: 40 }}
                      source={require('@img/corazon3.png')} />
                    <Text style={{ fontFamily: 'Serif', fontSize: 10 }}>AYUDAR</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View style={{  transform: [{ scaleY: 2 }, { rotate: '14deg' }], width: 98, height: 80, top: -160, left: 135, borderRadius: 43 }}>
                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('perfil')}>
                  <View style={{ fontFamily: 'Serif', position: 'relative', borderRadius: 40, width: 101, height: 80, transform: [{ scaleY: 1 }, { rotate: '14deg' }], left: 0, backgroundColor: '#F1C40F', justifyContent: 'center', alignItems: 'center', }}>
                    <Image
                      style={{ width: 40, height: 40 }}
                      source={require('@img/perdidos.png')} />
                    <Text style={{ fontFamily: 'Serif', fontSize: 10 }}>PERFIL</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
           
        </View>
  
      </View >

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
    height: 380,
    width: Dimensions.get('window').width,
    position: 'absolute',
    justifyContent: "center",
    alignItems: "center",


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

export default homeScreen;