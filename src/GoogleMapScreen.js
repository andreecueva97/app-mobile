// source={require('@img/andre.png')}
import React, { Component } from 'react';
import {
StyleSheet,
View,
Dimensions,
ScrollView,
Image
} from 'react-native';
import {Button,Container,Header,Left,Right,Icon,Text,Body } from 'native-base';
import MapView from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height; //,
const LATITUDE = 22.720555;
const LONGITUDE = 75.858633;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class GoogleMapScreen extends React.Component {
   static navigationOptions = {
     drawerLabel: 'Google Maps',
     drawerIcon: ({ tintColor }) => (
           <Image
           source={require('@img/andre.png')}
            />
     ),
};
constructor(props) {
  super(props);
  this.state = {
    region: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
  };
}
render() {
  return (
   <Container>
    <Header>
     <Left style={{ flexDirection: 'row' }}>
      <Icon onPress={() => this.props.navigation.openDrawer()} name="md-menu" style={{ color: 'white', marginRight: 15 }} />
     </Left>
     <View style={{alignItems:'center',justifyContent:'center'}}>
       <Text style={{ color: 'white' }} >Google Maps</Text>
     </View>
     <Right>
       <Icon name="md-cart" style={{ color: 'white' }} />
     </Right>
    </Header>
    <View >
     <MapView
        provider={this.props.provider}
        style={styles.map}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
        initialRegion={this.state.region}
     />
    </View>
  </Container>
  );
 }
}// End of MyHomeScreen class
export default GoogleMapScreen;

const styles = StyleSheet.create({
   map: {
    width: 400,
    height: 800,
   },
});