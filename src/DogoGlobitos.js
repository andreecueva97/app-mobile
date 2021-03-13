import React, {Component} from "react";
import { StyleSheet,Easing,PanResponder,Animated,Text,Image} from "react-native";

class DogoGlobitos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDraggable: true,
            pan: new Animated.ValueXY({x:0,y:-280}),
            opacity: new Animated.Value(1),
        }
        this._val = { x:0,y:0};
        this.state.pan.addListener((value) => this._val = value);
        this.PanResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gesture) => true,
            onPanResponderMove: (e, gesture) => {//se mueve y se queda donde lo deje
                    if(this.state.isDraggable) {
                        Animated.event([null, {
                            dx: this.state.pan.x, dy: this.state.pan.y}], 
                            {useNativeDriver: false})(e, gesture);
                    }
            },
            onPanResponderRelease: () => {/// le saque el (e,gesture)=>{}
                Animated.sequence([
                    Animated.spring(this.state.pan, {//vuelve a su lugar las cosas
                        toValue: {x: 10, y:110},
                        friction: 40,
                        useNativeDriver: false
                    }),
                    Animated.timing(this.state.opacity, {
                        toValue: 0,
                        duration: 1000,
                        useNativeDriver: false,
                    })

                ]).start();
             },
        })
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
                <Text style={{fontFamily:'Serif',fontSize: 10}}>ADOPTAR</Text>
            </Animated.View>
        )
    }    
}
const mapStateToProps = state =>({
    DogoGlobitos:state.DogoGlobitos
})
  
const mapDispatchToProps = dispatch =>({ //funciones que  se convierten por propiedades
    
})
  
export default DogoGlobitos;

const styles = StyleSheet.create({
    circle: {
        width: 50,
        height: 50,
        borderRadius: 52,        
    }
});