import * as React from 'react';

//todo lo encerrado componentes etc que esten encerrados en el provider
//van a poder leer lo que esta en el store.
// import realm from './dataBase';
// import { StyleSheet, View, Dimensions,Image,Text,TouchableOpacity } from 'react-native';
// import MapView,{ PROVIDER_GOOGLE,Marker, Callout } from 'react-native-maps';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Geolocation from '@react-native-community/geolocation';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import PlacesInput from 'react-native-places-input';
// import MapViewDirections from 'react-native-maps-directions';
// Geolocation.getCurrentPosition(
//   (position) => {
//     console.log(position);
//   },
//   (error) => {
//     // See error code charts below.
//     console.log(error.code, error.message);
//   },
//   { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
// );


// class MapaMarker extends React.Component {
//   constructor(props) {  
//     super(props);

//     this.state = {
//       realm:realm,
//       region:null,
//       latitudee:0,
//       longitudee:0,
//       latitudeeDelta:0.0143,
//       longitudeeDelta:0.0134,
//       lastPosition:null,
//       markers: [
//         {
//             coordinate: {
//                 latitude: 37.421999,
//                 longitude: -122.3
//             },
//             title: "Best Place",
//             description: "Description1",
//             id: 1
//         },
//         {
//             coordinate: {
//                 latitude: 37.421998333333335,
//                 longitude: -122.084
//             },
//             title: "Best Place2",
//             description: "Description 2",
//             id: 2
//         }
//     ]
//     }
//   }
//   volverAMiPosicion = () => {
//     Geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>{
//       this.setState({
//         region:{
//           latitude,
//           longitude,
//           latitudeDelta:0.0143,
//           longitudeDelta:0.0134,
//         }
//       })
//       this.setState({latitudee:latitude})
//       this.setState({longitudee:longitude})
//     },
//     (error) => {
//       // See error code charts below.
//       console.log(error.code, error.message);
//     },
//     { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//     )
//   }
//   zoomPosicionIn = () =>{
//     this.setState({latitudeeDelta:this.state.latitudeeDelta*0.5})
//     this.setState({longitudeeDelta:this.state.longitudeeDelta*0.5})
//     this.setState({
//       region:{
//         latitude:this.state.region.latitude,
//         longitude:this.state.region.longitude,
//         latitudeDelta:this.state.latitudeeDelta,
//         longitudeDelta:this.state.longitudeeDelta,
//       }
//     })
//     Geolocation.watchPosition(({coords:{latitude,longitude}})=>{
//       console.log('latitude==>'+latitude);
//       console.log('longitude==>'+longitude);
//     },
//     (error) => {
//       // See error code charts below.
//       console.log(error.code, error.message);
//     },
//     { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//     )
//     Geolocation.clearWatch();
//   }
//   zoomPosicionOut = () =>{
//     this.setState({latitudeeDelta:this.state.latitudeeDelta*1.5})
//     this.setState({longitudeeDelta:this.state.longitudeeDelta*1.5})
//     this.setState({
//       region:{
//         latitude:this.state.region.latitude,
//         longitude:this.state.region.longitude,
//         latitudeDelta:this.state.latitudeeDelta,
//         longitudeDelta:this.state.longitudeeDelta,
//       }
//     })
    
//   }
//   componentDidMount(){
//     // Geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>{
//     //   this.setState({
//     //     region:{
//     //       latitude,
//     //       longitude,
//     //       latitudeDelta:this.state.latitudeeDelta,
//     //       longitudeDelta:this.state.longitudeeDelta,
//     //     }
//     //   })
//     //   this.setState({latitudee:latitude})
//     //   this.setState({longitudee:longitude})
//     // },
//     // (error) => {
//     //   // See error code charts below.
//     //   console.log(error.code, error.message);
//     // },
//     // { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//     // )
//   }
  
 
//   render(){
//     const palette = {
//       primary: {
//           main: '#FF5A5F',
//           contrastText: '#ffffff'
//       },
//       secondary: {
//           main: '#006c70',
//           contrastText: '#ffffff'
         
//       },
  
//       dark:{
//           main:'#000000',
//           contrastText: '#ffffff',
//           lightDark: "#353535",
//           metalblue:"#3E4A63"
//       },
//       grayScale:{
//           gray100:"#FAFAFA",
//           gray200:"#F5F5F5",
//           gray300:"#ECECEC",
         
//       }
//   };
//     const originn = {latitude:6.23,longitud:-75.6045382};
//     const destinationn ={latitude:6.0, longitud:-75.0};
//     let baseDogos = this.state.realm.objects('Dogo');
//     return (
      
        
//       <View style={{flex:1}}>
//         <MapView
//           zoomControlEnabled={true}
//           showsCompass={true}
//           showsTraffic={true}
//           zoomTapEnabled={true}
//           showsScale={true}
//           style = {{flex:1}}
//           provider={PROVIDER_GOOGLE}          
//           region= {this.state.region}
//           onRegionChangeComplete={region => {
//             this.setState({region});
//         }}
//           mapType="standard"
//           showsUserLocation={true}  // MUESTRA LA LOCALIZACION DEL MOVIL EN VIVO
//           zoomEnabled={true}
//         >
//           {baseDogos.map((marker)  => (  
//               <Marker
//                 draggable={true}
                
//                 key={marker.id}
//                 coordinate={{latitude:Number(marker.latitude),longitude:Number(marker.longitude)}}
//                 title={marker.name}
//                 // onDragEnd={console.log(coordinate)}
//                 description={marker.informacion}>
//                 <Image source={require('@img/marker.png')} style={{height: 60, width:60 }} />
//               </Marker>
//            )) }
//           {/* <MapViewDirections
//             origin={originn}
//             destination={destinationn}
//             // apikey={'AIzaSyBhZzFJJJ7jb5SNdlzUB47Ud2Y8gsD5SAg'}
//             // strokeWidth={3}
//             // strokeColor="hotpink"
//           /> */}
//             {/* <Marker
//               title={'holaaaaaaa'}
//               description={'hola soy un marker ajajaj'}
//               pinColor={'blue'}
//               coordinate={
//                           { 
//                                   latitude:this.state.latitudee,
//                                   longitude:this.state.longitudee
//                           }              
//               }
//             >
//             <Image source={require('@img/marker.png')} style={{height: 60, width:60 }} />
//             </Marker> */}
          
//         </MapView>
        
    
//         {/* <GooglePlacesAutocomplete
//                 placeholder="Buscar en google places"
//                 minLength={6}
//                 placeholderTextColor="#333"
//                 query={{
//                     key: "AIzaSyBhZzFJJJ7jb5SNdlzUB47Ud2Y8gsD5SAg",
//                     language: 'es',
                    
//                 }}
//                 textInputProps={{
//                     autoCapitalize: 'none',
//                     autoCorrect: false
//                 }}
//                 nearbyPlacesAPI='GooglePlacesSearch'
//                 fetchDetails={true}
//                 // styles={{
//                 //     container: {
//                 //         position: 'absolute',
//                 //         top: 40,
//                 //         width: '100%'
//                 //     },
//                 //     textInputContainer: {
//                 //         marginHorizontal: 10,
//                 //         flex: 1,
//                 //         backgroundColor: 'transparent',
//                 //         height: 54,
//                 //         borderTopWidth: 0,
//                 //         borderBottomWidth: 0

//                 //     },
//                 //     textInput: {
//                 //         height: 54,
//                 //         margin: 0,
//                 //         padding: 0,
//                 //         borderRadius: 9,
//                 //         elevation: 5, // Shadow android
//                 //         shadowColor: palette.dark.main, // Shadow ios
//                 //         shadowOpacity: 0.1, // Shadow ios
//                 //         shadowOffset: { x: 0, y: 0 }, // Shadow ios
//                 //         shadowRadius: 15,  // Shadow ios
//                 //         borderWidth: 1,
//                 //         borderColor: palette.grayScale.gray100,
//                 //         fontSize: 18
//                 //     },
//                 //     listView: {
//                 //         marginHorizontal: 20,
//                 //         borderWidth: 1,
//                 //         borderColor: palette.grayScale.gray100,
//                 //         backgroundColor: palette.primary.contrastText,
//                 //         elevation: 5,
//                 //         shadowColor: palette.dark.main, // Shadow ios
//                 //         shadowOpacity: 0.1, // Shadow ios
//                 //         shadowOffset: { x: 0, y: 0 }, // Shadow ios
//                 //         shadowRadius: 15,  // Shadow ios
//                 //         marginTop: 15
//                 //     },
//                 //     description: {
//                 //         fontSize: 15
//                 //     },
//                 //     row: {
//                 //         padding: 18,
//                 //         height: 58
//                 //     }
//                 // }}

//             /> */}


//         <Callout style={{flex:1,position:'absolute',top:300,left:350}}> 
//                 <TouchableOpacity onPress={() => this.volverAMiPosicion()}>             
        
//                     <Image source={require('@img/centerrMap.png')} style={{height: 40, width:40 }} />
//                 </TouchableOpacity>      
//         </Callout>
//         <Callout style={{flex:1,position:'absolute',top:340,left:345}}>
//                 <TouchableOpacity onPress={() => this.zoomPosicionIn()}>             
//                 <MaterialCommunityIcons name="plus" color={'black'} size={50} />
//                 </TouchableOpacity>      
//           </Callout>
//           <Callout style={{flex:1,position:'absolute',top:380,left:345}}>
//                 <TouchableOpacity onPress={() => this.zoomPosicionOut()}>             
        
//                 <MaterialCommunityIcons name="minus" color={'black'} size={50} />
//                 </TouchableOpacity>      
//           </Callout>
//       </View>
//     )
//   } 
// };
// const mapStateToProps = state =>({
//   MapaMarker:state.MapaMarker
// })

// const mapDispatchToProps = dispatch =>({ //funciones que  se convierten por propiedades
  
// })
// export default connect(mapStateToProps, mapDispatchToProps)(MapaMarker);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   mapStyle: {
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height,
//   },
// });


































// import React,{Component} from 'react';
// import {StyleSheet,Text,View} from 'react-native';
// import MapView from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// export default class App extends Component{
//   constructor(){
//     super()

//     this.state={
//       region:{
//           latitude:null,
//           longitude:null,
//           latitudeDelta:null,
//           longitudeDelta:null,
//       }
//     }
//   }

//   calcDelta(lat,lon,accuracy){
//     const oneDegreeOfLongitudMeters=111.32;
//     const circumference=(40075)/360;

//     const latDelta=accuracy*(1/(Math.cos(lat)*circumference));
//     const lonDelta=accuracy/oneDegreeOfLongitudMeters;

//     this.setState({
//         region:{
//           latitude:lat,
//           longitude:lon,
//           latitudeDelta:latDelta,
//           longitudeDelta:lonDelta,
//         }
//     })
//   }

//   componentDidMount(){
//     Geolocation.getCurrentPosition(
//       (position)=>{
//         const lat= position.coords.latitude
//         const lon= position.coords.longitude
//         const accuracy = position.coords.accuracy
//         this.calcDelta(lat,lon,accuracy)
//       }
//     )
//   }
//   render(){
//     return(
//       <View style={styles.container}>
//         {this.state.region.latitude ?<MapView>
//           style={{flex:1}}
//           initialRegion={this.state.region}
//         </MapView>:null}

//       </View>
//     );
//   }
// }
// const styles= StyleSheet.create({
//   container:{
//     flex:1,
//     justifyContent:'center',
//     alignItems:'center',
//   }
// });