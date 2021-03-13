import React, { Component } from 'react';
import { View, Animated, StyleSheet, TextInput,Text,TouchableOpacity } from 'react-native';
import { string, func, object, number } from 'prop-types';

export class FloatingTitleTextInputFieldMenu extends Component {
    static propTypes = {
        attrName: string.isRequired,
        title: string.isRequired,
        value: string.isRequired,
        updateMasterState: func.isRequired,
        keyboardType: string,
        titleActiveSize: number, // to control size of title when field is active
        titleInActiveSize: number, // to control size of title when field is inactive
        titleActiveColor: string, // to control color of title when field is active
        titleInactiveColor: string, // to control color of title when field is active
        textInputStyles: object,
        otherTextInputProps: object,
    }


    static defaultProps = {
        keyboardType: 'default',
        titleActiveSize: 15,//11.5
        titleInActiveSize: 20,
        titleActiveColor: 'white',//dimgrey
        titleInactiveColor: 'white',//dimgrey
        textInputStyles: {},
        otherTextInputAttributes: {},
    }

    constructor(props) {
        super(props);
        const { value } = this.props;
        this.position = new Animated.Value(value ? 1 : 0);
        this.state = {
            isFieldActive: false,
            shouldShow: false,
        }
    }

    _handleFocus = () => {
        if (!this.state.isFieldActive) {
            this.setState({ isFieldActive: true });
            Animated.timing(this.position, {
                toValue: 1,
                duration: 150,
                useNativeDriver: false,
            }).start();
        }
    }

    _handleBlur = () => {
        if (this.state.isFieldActive && !this.props.value) {
            this.setState({ isFieldActive: false });
            Animated.timing(this.position, {
                toValue: 0,
                duration: 150,
                useNativeDriver: false,
            }).start();
        }
    }

    _onChangeText = (updatedValue) => {
        const { attrName, updateMasterState } = this.props;
        updateMasterState(attrName, updatedValue);
    }

    _returnAnimatedTitleStyles = () => {
        const { isFieldActive } = this.state;
        const {
            titleActiveColor, titleInactiveColor, titleActiveSize, titleInActiveSize
        } = this.props;

        return {
            top: this.position.interpolate({
                inputRange: [0, 1],
                outputRange: [14, 0],
            }),
            fontSize: isFieldActive ? titleActiveSize : titleInActiveSize,
            color: isFieldActive ? titleActiveColor : titleInactiveColor,
        }
    }

    render() {
        const { shouldShow } = this.state;
        return (
            <View style={Styles.container}>
                <TouchableOpacity onPress={() => this.setState({ shouldShow: !shouldShow })}>
                    <Animated.Text
                        style={[Styles.titleStyles, this._returnAnimatedTitleStyles()]}
                    >
                        {this.props.title}
                    </Animated.Text>
                </TouchableOpacity>
                <Text>{this.props.value}</Text>
                {shouldShow ? (
                    <View>
                        {/* <Image
              source={{
                uri:
                  'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png',
              }}
              style={{width: 250, height: 250}}
            /> */}
                        <FlatList
                            data={['DESCONOCIDO', 'GALGO', 'BULLDOG', 'CHIHUAHUA', 'PASTOR ALEMAN', 'LABRADOR']}
                            style={{ height: 40, backgroundColor: 'yellow', width: 300, flexGrow: 0, position: 'absolute', left: -150 }}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => {this.setState({ inputRaza: item });this._updateMasterStateColor}}>
                                    <View>
                                        <Text>{item}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item.toString()}
                        />
                    </View>
                ) : null}
                {/* <TextInput
          value = {this.props.value}
          style = {[Styles.textInput, this.props.textInputStyles]}
          underlineColorAndroid = 'transparent'
          onFocus = {this._handleFocus}
          onBlur = {this._handleBlur}
          onChangeText = {this._onChangeText}
          keyboardType = {this.props.keyboardType}
          {...this.props.otherTextInputProps}
        /> */}

            </View>
        )
    }
}

const Styles = StyleSheet.create({
    container: {
        width: '100%',
        fontSize: 30,
        color: 'red',
        height: 60,
        marginVertical: 4,
    },
    textInput: {
        fontSize: 20,
        marginTop: 10,
        fontFamily: 'Avenir-Medium',
        color: 'white',
        width: 300,
    },
    titleStyles: {
        position: 'absolute',
        fontFamily: 'Avenir-Medium',
        left: 3,
        left: 4,
        color: 'white',
        fontSize: 30,
    }
})