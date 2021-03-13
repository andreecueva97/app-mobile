'use strict';

import Realm from 'realm';


export class Imagee extends Realm.Object {}//DOG
Imagee.schema = {
    name: 'Imagee',
    properties: {
      height: 'int', 
      mime: 'string', 
      uri: 'string', 
      width:'int'
    },
};
export class Donacion extends Realm.Object {}//DONACION
Donacion.schema = {
    name: 'Donacion',
    properties: {
      id: 'int',
      tipo:'string[]',
      persona:'Persons'
    },
};
export class Dogo extends Realm.Object {}//DONACION
Dogo.schema = {
    name: 'Dogo',
    properties: {
      id: 'int',
      name: 'string',
      color:'string',
      raza:'string',
      estado:'string',
      listImagen: {type: 'list', objectType: 'Imagee'},//string?[]
      informacion:'string',
      latitude:'string',
      longitude:'string',
      solicitudes:'int',
      vistas:'int',
      humano:'Persons'  //un perro tiene un humano asociado
    },
};
//---------------------------------
export class Dogos extends Realm.Object {}//DONACION
Dogos.schema = {
    name: 'Dogos',
    properties: {
      id: 'int',
      name: 'string',
      color:'string',
      raza:'string',
      estado:'string',
      listImagen: {type: 'list', objectType: 'Imagee'},//string?[]
      informacion:'string',
      latitude:'string',
      longitude:'string',
      solicitudes:'int'
    },
};
//---------------------------------
export class Persons extends Realm.Object {}//PERSONS
Persons.schema = {
    name: 'Persons',
    properties: {
      id: 'int',
      name: 'string',
      apellido:'string',
      direccion:'string',
      telefono:'int',
      email:'string',
      contrasena:'string',
      //listDogs:'string[]',
      listDogs:{type: 'list', objectType: 'Dogo'},
      imagen:'Imagee'       // una persona loggeada debe tener una foto
    },
};
export class PersonsLogin extends Realm.Object {}//PERSONS
PersonsLogin.schema = {
    name: 'PersonsLogin',
    properties: {
      id: 'int',
      name: 'string',
      apellido:'string',
      direccion:'string',
      telefono:'int',
      email:'string',
      contrasena:'string',
      //listDogs:'string[]',
      listDogs:{type: 'list', objectType: 'Dogo'},
      imagen:'Imagee'       // una persona loggeada debe tener una foto
    },
};
// export const Schemaa = [Person, Dog];
// export const databaseOptions = {
//   path:'UserDataba232s2e22.realm',
//   schema: Schemaa,
//   //
// };

export const heheh=[Dogo,Persons,Donacion,PersonsLogin,Imagee,Dogos];
export const heeeqSchema ={
  path:'ezewweresafdawewfsadfafadfewrfdsfasdfawe12134dfdsD123213FSADSFADSwe.realm',
  schema: heheh,
  schemaVersion:222,
};

//export default new Realm(heeeqSchema);
//export default new Realm({schema: [AppSetting, Gps, ...], schemaVersion: 0});
export default new Realm({schema:[PersonsLogin,Persons,Dogos,Donacion,Dogo,Imagee],schemaVersion:4});    