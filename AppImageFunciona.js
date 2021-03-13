import React, {Component} from 'react';
import {
  View, Text, StyleSheet, ScrollView, Alert,
  Image, TouchableOpacity, NativeModules, Dimensions
} from 'react-native';

import Video from 'react-native-video';

var ImagePicker = NativeModules.ImageCropPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: 'blue',
    marginBottom: 10
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  }
});

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      image: null,
      images: null
    };
  }

  pickSingleWithCamera(cropping, mediaType='photo') {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
      includeExif: true,
      mediaType,
    }).then(image => {
      console.log('received image', image);
      this.setState({
        image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
        images: null
      });
    }).catch(e => alert(e));
  }

  pickSingleBase64(cropit) {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: cropit,
      includeBase64: true,
      includeExif: true,
    }).then(image => {
      console.log('received base64 image');
      this.setState({
        image: {uri: `data:${image.mime};base64,`+ image.data, width: image.width, height: image.height},
        images: null
      });
    }).catch(e => alert(e));
  }

  cleanupImages() {
    ImagePicker.clean().then(() => {
      console.log('removed tmp images from tmp directory');
    }).catch(e => {
      alert(e);
    });
  }

  cleanupSingleImage() {
    let image = this.state.image || (this.state.images && this.state.images.length ? this.state.images[0] : null);
    console.log('will cleanup image', image);

    ImagePicker.cleanSingle(image ? image.uri : null).then(() => {
      console.log(`removed tmp image ${image.uri} from tmp directory`);
    }).catch(e => {
      alert(e);
    })
  }

  cropLast() {
    if (!this.state.image) {
      return Alert.alert('No image', 'Before open cropping only, please select image');
    }

    ImagePicker.openCropper({
      path: this.state.image.uri,
      width: 200,
      height: 200
    }).then(image => {
      console.log('received cropped image', image);
      this.setState({
        image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
        images: null
      });
    }).catch(e => {
      console.log(e);
      Alert.alert(e.message ? e.message : e);
    });
  }

  pickSingle(cropit, circular=false, mediaType) {
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
    }).then(image => {
      console.log('received image', image);
      this.setState({
        image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
        images: null
      });
    }).catch(e => {
      console.log(e);
      Alert.alert(e.message ? e.message : e);
    });
  }

  pickMultiple() {
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
    }).then(images => {
      this.setState({
        image: null,
        images: images.map(i => {
          console.log('received image', i);
          return {uri: i.path, width: i.width, height: i.height, mime: i.mime};
        })
      });
    }).catch(e => alert(e));
  }

  scaledHeight(oldW, oldH, newW) {
    return (oldH / oldW) * newW;
  }

  renderVideo(video) {
    console.log('rendering video');
    return (<View style={{height: 300, width: 300}}>
      <Video source={{uri: video.uri, type: video.mime}}
         style={{position: 'absolute',
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

  renderImage(image) {
    return <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={image} />
  }

  renderAsset(image) {
    if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
      return this.renderVideo(image);
    }

    return this.renderImage(image);
  }

  render() {
    return (<View style={styles.container}>
      <ScrollView>
        {this.state.image ? this.renderAsset(this.state.image) : null}
        {this.state.images ? this.state.images.map(i => <View key={i.uri}>{this.renderAsset(i)}</View>) : null}
      </ScrollView>

      <TouchableOpacity onPress={() => this.pickSingleWithCamera(false)} style={styles.button}>
        <Text style={styles.text}>Select Single Image With Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.pickSingleWithCamera(false, mediaType='video')} style={styles.button}>
        <Text style={styles.text}>Select Single Video With Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.pickSingleWithCamera(true)} style={styles.button}>
        <Text style={styles.text}>Select Single With Camera With Cropping</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.pickSingle(false)} style={styles.button}>
        <Text style={styles.text}>Select Single</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.cropLast()} style={styles.button}>
        <Text style={styles.text}>Crop Last Selected Image</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.pickSingleBase64(false)} style={styles.button}>
        <Text style={styles.text}>Select Single Returning Base64</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.pickSingle(true)} style={styles.button}>
        <Text style={styles.text}>Select Single With Cropping</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.pickSingle(true, true)} style={styles.button}>
        <Text style={styles.text}>Select Single With Circular Cropping</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={this.pickMultiple.bind(this)} style={styles.button}>
        <Text style={styles.text}>Select Multiple</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={this.cleanupImages.bind(this)} style={styles.button}>
        <Text style={styles.text}>Cleanup All Images</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={this.cleanupSingleImage.bind(this)} style={styles.button}>
        <Text style={styles.text}>Cleanup Single Image</Text>
      </TouchableOpacity>
    </View>);
  }
}



//------------------------------------------------------------------------------------------------


// import * as React from 'react';
// import { NavigationContainer, CommonActions } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import homeScreen from './src/homeScreen.js';
// import adoptarScreen from './src/adoptarScreen.js';
// import transitarScreen from './src/transitarScreen.js';
// import ayudarScreen from './src/ayudarScreen.js';
// import perdidosScreen from './src/perdidosScreen.js';
// import inicioSesionScreen from './src/inicioSesionScreen.js';
// import registroScreen from './src/registroScreen.js';

// import realm from './src/dataBase';
// import DrawerNavigator from './src/DrawerNavigator.js';
// // import { createDrawerNavigator } from '@react-navigation/drawer';
// import perfil from './src/perfil.js';
// let Stack = createStackNavigator();

// let home = homeScreen;
// let adoptar = adoptarScreen;
// let transitar = transitarScreen;
// let perfill = perfil;
// let ayudar = ayudarScreen;
// let perdidos = perdidosScreen;
// let inicioSesion = inicioSesionScreen;
// let registro = registroScreen;
// // let drawer = DrawerNavigator;
// const Tab = createBottomTabNavigator();

// export function MyTabs() {
//   return (
//     <Tab.Navigator initialRouteName="Expolre"
//       tabBarOptions={{
//         activeTintColor: 'green',
//         activeBackgroundColor: 'lightblue',
//         inactiveTintColor: 'black',
//       }}>
//       <Tab.Screen name="home" component={home} options={{
//         tabBarIcon: ({ color, size }) => (
//           <MaterialCommunityIcons name="home" color={color} size={size} />
//         ),
//       }} />
//       <Tab.Screen name="perros" component={adoptar} options={{
//         tabBarIcon: ({ color, size }) => (
//           <MaterialCommunityIcons name="dog" color={color} size={size} />
//         ),
//       }} />
//       <Tab.Screen name="agregar" component={transitar} options={{
//         tabBarIcon: ({ color, size }) => (
//           <MaterialCommunityIcons name="dog-side" color={color} size={size} />
//         ),
//       }} />
//       <Tab.Screen name="ayudar" component={ayudar} options={{
//         tabBarIcon: ({ color, size }) => (
//           <MaterialCommunityIcons name="clipboard-list" color={color} size={size} />
//         ),
//       }} />
//       <Tab.Screen name="perdidos" component={perdidos} options={{
//         tabBarIcon: ({ color, size }) => (
//           <MaterialCommunityIcons name="home-account" color={color} size={size} />
//         ),
//       }} />
//     </Tab.Navigator>
//   );
// }
// class App extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       realm: realm,
//     }
//   }
//   render() {
//     // const Drawer = createDrawerNavigator();
//     return (
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName="inicioSesion">
//         <Stack.Screen name="perfil" component={perfill} options={{ header: () => null }} />
//           <Stack.Screen name="inicioSesion" component={inicioSesion} options={{ header: () => null }} />
//           <Stack.Screen name="dashboards" component={MyTabs} options={{ header: () => null }} />
//           <Stack.Screen name="registro" component={registro} options={{ header: () => null }} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     )
//   }
// }

// export default App;

//---------------------------------------------------------------------------------------------------







///lo ultiom
// <NavigationContainer>
//       <Drawer.Navigator initialRouteName="Home">
//         <Drawer.Screen name="Home" component={MyTabs} />
//         {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> //PERFILLLL USUARIO
//         <Drawer.Screen name="Perfil" component={perfil} />*/}
//       </Drawer.Navigator>
//     </NavigationContainer>