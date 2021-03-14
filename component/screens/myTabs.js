
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import homeScreen from './homeScreen';
import perrosScreen from './perrosScreen';
import agregarPerrosScreen from './agregarPerrosScreen';
import ayudarScreen from './ayudarScreen';
import perfilLoginScreen from './perfilLoginScreen';
import {Icon} from 'react-native-elements';
const Tab = createBottomTabNavigator();


export default function MyTabs(){
      // const screenOptions  = (route,color)=>{
      //   let iconName
      //   switch (route.name) {
      //     case "home":
      //       iconName="radio"
      //       break;
          
      //   }
      //   return(
      //     <Icon
      //         type = "material-community"
      //         name = {iconName}
      //         size = {22}
      //         color ={color}
      //     />
      //   )
      // }
      return (
        <Tab.Navigator initialRouteName="Expolre"
          // tabBarOptions={{
          //   activeTintColor: 'green',
          //   inactiveTintColor: 'black',
          // }}
          
          >
          <Tab.Screen name="home" component={homeScreen} options={{
           tabBarIcon: ({ color, size }) => (
            <Icon type='simple-icon-line' name='home' color={color} size={size} />
          ),
          }} />
          <Tab.Screen name="perros" component={perrosScreen} options={{
           tabBarIcon: ({ color, size }) => (
            <Icon type='material-community' name='dog' color={color} size={size} />
          ),
          }} />
          <Tab.Screen name="agregar" component={agregarPerrosScreen} options={{
            tabBarIcon: ({ color, size }) => (
              <Icon type='simple-icon-line' name='add' color={color} size={size} />
            ),
          }} />
          <Tab.Screen name="ayudar" component={ayudarScreen} options={{
            tabBarIcon: ({ color, size }) => (
              <Icon type='simple-icon-line' name='edit' color={color} size={size} />
            ),
          }} />
          <Tab.Screen name="perfil" component={perfilLoginScreen} options={{
          tabBarIcon: ({ color, size }) => (
            <Icon type='simple-icon-line' name='account-circle' color={color} size={size} />
          ),
          }} />
        </Tab.Navigator>
      );
  }