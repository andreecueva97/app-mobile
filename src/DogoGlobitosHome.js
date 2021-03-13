import React, {Component} from "react";
import { StyleSheet,Easing,PanResponder,Animated,Text,Image} from "react-native";

export default class DogoGlobitosHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDraggable: true,
            pan: new Animated.ValueXY(),
            opacity: new Animated.Value(1),
        }
        this._val = { x:0,y:0};
        this.state.pan.addListener((value) => this._val = value);
        this.PanResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gesture) => true,
            onPanResponderMove: (e, gesture) => {
                if(this.state.isDraggable) {
                    Animated.event([null, {
                        dx: this.state.pan.x, dy: this.state.pan.y}], 
                        {useNativeDriver: false})(e, gesture);
                }
            },
            onPanResponderGrant: (e, gesture) => {                
                this.state.pan.setOffset({x: this._val.x, y:this._val.y})
                this.state.pan.setValue({x:0, y:0})                                
            },
            onPanResponderRelease: (e,gesture) => {/// le saque el (e,gesture)=>{}
                if(this.isDropArea(gesture)){
                    Animated.timing(this.state.opacity, {
                        toValue: 0,
                        duration: 1000,
                        useNativeDriver: false,
                    }).start(() => this.setState({isDraggable: false}));
                 } else{
                    Animated.spring(this.state.pan, {//vuelve a su lugar las cosas
                        toValue: {x: 0, y:0},
                        friction: 10,
                        useNativeDriver: false
                    }).start();
                }
             },
        })
    }
    isDropArea(gesture) {
        return gesture.moveY > 50 & gesture.moveY<100 & gesture.moveX>100 & gesture.moveX<300;
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
        const panStyle = {
            transform: this.state.pan.getTranslateTransform(),            
            opacity: this.state.opacity,
            backgroundColor: this.props.color,
            sourcee:this.props.color
        }
        return (
            <Animated.View 
                {...this.PanResponder.panHandlers}
                 style={[panStyle, styles.circle]}>
                <Animated.Image 
                    style={{width:50,height:50,transform: [{ rotate: RotateData }]}}
                    source={require('@img/andre.png')}
                     /> 
                
            </Animated.View>
        )
    }    
}
const styles = StyleSheet.create({
    circle: {
        width: 50,
        height: 50,
        borderRadius: 52,        
    }
});