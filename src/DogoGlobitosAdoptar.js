import React, {Component} from "react";
import { StyleSheet,Easing,Animated,Text,View,Image, ViewPropTypes} from "react-native";

export default class DogoGlobitosAdoptar extends Component {
    constructor(props) {
        super(props);

    }
    render(){
        let rotateValueHolder = new Animated.Value(0);

  const startImageRotateFunction = () => {
    rotateValueHolder.setValue(0);
    Animated.timing(rotateValueHolder, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => startImageRotateFunction());
  };
    startImageRotateFunction();
    const RotateData = rotateValueHolder.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
        const color={backgroundColor:this.props.color};
        return (
            <View style={[color,styles.circle]}>
 <Animated.Image 
                    style={{width:30,height:30,transform: [{ rotate: RotateData }]}}
                    source={require('@img/andre.png')}
                     />
                <Text style={{fontFamily:'Serif',fontSize: 8}}>adoptar</Text>

            </View>
               
        )
    }    
}
const styles = StyleSheet.create({
    circle: {
        width: 30,
        height: 30,
        borderRadius: 52,        
    }
});