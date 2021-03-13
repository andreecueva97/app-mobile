'use strict';

import Realm from 'realm';

export class Person extends Realm.Object {}//PERSON
Person.schema = {
    name: 'Person',
    properties : {
      id: 'int',
      name: 'string',
      dog: 'Dog',
    },
};

export class Dog extends Realm.Object {}//DOG
Dog.schema = {
    name: 'Dog',
    properties: {
      id: 'int',
      name: 'string',
    },
};
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
      name: 'string',
      apellido:'string',
      direccion:'string',
      tipo:'string',
      email:'string',
      telefono:'int',
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
      solicitudes:'int'
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
    },
};
export const Schemaa = [Person, Dog];
export const databaseOptions = {
  path:'UserDatabas2e22.realm',
  schema: Schemaa,
  //
};

export const heh=[Persons,Dogo,Donacion,PersonsLogin,Imagee];
export const heSchema ={
  path:'ez.realm',
  schema: heh,
  schemaVersion:2,
};


export default new Realm({schema:[PersonsLogin,Persons,Dogos,Donacion,Imagee]});      //estuve usando este
//export default new Realm(heSchema);
//dinero puede ser un tipo de schema para que sea mas flexible la inserccion de donacion
// import Realm from 'realm';
// export const UserSchema = {
//   name: 'User',
//   primaryKey: 'userId',
//   properties: {
//       userId: 'int',
//       userName: 'string',
//   }
// }
// //(Acá otro Schema definido igual pero de mascotas)

// const Schema = [UserSchema];

// export const databaseOptions = {
//   path:'andre.realm',
//   schema: Schema,
//   deleteRealmIfMigrationNeeded: true,
// }





// export function initiDatabase(){
//   let realm=this.state.realm;
//           realm.write(() => {
//               realm.deleteAll();
//               realm.create('User', {
//                 userId: 1,
//                 userName: 'andre',
//               })
//           });
//           this.setState({realm});
      
// }
// export default new Realm(databaseOptions);



