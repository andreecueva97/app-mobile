import * as React from 'react';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import inicioSesionScreen from './component/screens/inicioSesionScreen.js';
import registroScreen from './component/screens/registroScreen.js';
import DrawerNavigator from './src/DrawerNavigator.js';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import MyTabs from './component/screens/myTabs.js';
let Stack = createStackNavigator();
let inicioSesion = inicioSesionScreen;
let registro = registroScreen;
// let drawer = DrawerNavigator;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() {
    // const Drawer = createDrawerNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="inicioSesion">
          <Stack.Screen name="inicioSesion" component={inicioSesion} options={{ header: () => null }} />
          <Stack.Screen name="dashboards" component={MyTabs} options={{ header: () => null }} />
          <Stack.Screen name="registro" component={registro} options={{ header: () => null }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default App;

///lo ultiom
// <NavigationContainer>
//       <Drawer.Navigator initialRouteName="Home">
//         <Drawer.Screen name="Home" component={MyTabs} />
//         {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> //PERFILLLL USUARIO
//         <Drawer.Screen name="Perfil" component={perfil} />*/}
//       </Drawer.Navigator>
//     </NavigationContainer>