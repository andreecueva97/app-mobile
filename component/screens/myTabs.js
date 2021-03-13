import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import homeScreen from './homeScreen';
import perrosScreen from './perrosScreen';
import agregarPerrosScreen from './agregarPerrosScreen';
import ayudarScreen from './ayudarScreen';
import perfilLoginScreen from './perfilLoginScreen';

const Tab = createBottomTabNavigator();


export default function MyTabs(){
  
      return (
        <Tab.Navigator initialRouteName="Expolre"
          tabBarOptions={{
            activeTintColor: 'green',
            activeBackgroundColor: 'lightblue',
            inactiveTintColor: 'black',
          }}>
          <Tab.Screen name="home" component={homeScreen} options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }} />
          <Tab.Screen name="perros" component={perrosScreen} options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="dog" color={color} size={size} />
            ),
          }} />
          <Tab.Screen name="agregar" component={agregarPerrosScreen} options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="dog-side" color={color} size={size} />
            ),
          }} />
          <Tab.Screen name="ayudar" component={ayudarScreen} options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="clipboard-list" color={color} size={size} />
            ),
          }} />
          <Tab.Screen name="perfil" component={perfilLoginScreen} options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home-account" color={color} size={size} />
            ),
          }} />
        </Tab.Navigator>
      );
  }