import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resourcePath: {},
    };
  }

  selectImage() {
    let options = {
      title: 'You can choose one image',
      maxWidth: 256,
      maxHeight: 256,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, response => {
      console.log({ response });

      if (response.didCancel) {
        console.log('User cancelled photo picker');
        Alert.alert('You did not select any image');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = { uri: response.uri };
        console.log({ source });
      }
    });
  }
  
  render() {
    return (
      <View >
      		<Text>HOLA</Text>
      		  {/* <TouchableOpacity
      		onPress={this.selectImage()}>
         <Text>Pick an image</Text>
      </TouchableOpacity> */}
      </View>
    );
  }
}
// const App= () => { 

		
      //   <View >
      //   <Text >
      //   Simple Image Picker
      // </Text>
    
        // </View>
//   const [imageSource, setImageSource] = useState(null);

  // function selectImage() {
  //   let options = {
  //     title: 'You can choose one image',
  //     maxWidth: 256,
  //     maxHeight: 256,
  //     storageOptions: {
  //       skipBackup: true
  //     }
  //   };

  //   ImagePicker.showImagePicker(options, response => {
  //     console.log({ response });

  //     if (response.didCancel) {
  //       console.log('User cancelled photo picker');
  //       Alert.alert('You did not select any image');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else if (response.customButton) {
  //       console.log('User tapped custom button: ', response.customButton);
  //     } else {
  //       let source = { uri: response.uri };
  //       console.log({ source });
  //     }
  //   });
  // }
  
//   return (
//     <View
      
//     >
//       <Text >
//         Simple Image Picker
//       </Text>

//     </View>
// //   );
// // }

// export default App;