import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity, Text, Animated, Easing, Dimensions, SafeAreaView} from 'react-native';
import PropTypes from 'prop-types';

const SelectPicker = (props) => {
    const {
        isOpen,
        toggleFunc,
        title,
        titleStyle,
        titleComponent,
        selections,
        value,
        setValue,
        easing,
        animationTime,
        modalColor,
        backdropColor,
        modalRadius,
        modalStyle,
        isFullScreen,
        onShow,
        onClose,
        isShowCloseButton,
        closeButtonComponent,
        closeButtonText,
        unselectedItemStyle,
        selectedItemStyle,
        closeButtonStyle,
        closeButtonTextStyle,
    } = props;

    const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get("window").height;
    const [modalAnimatedValue, setModalAnimatedValue] = useState(new Animated.Value(0));
    const [outerAnimatedValue, setOuterAnimatedValue] = useState(new Animated.Value(0));

    const toValues = () => {
        if (isOpen){
            return 0;
        } else {
            return screenHeight;
        }
    };

    const runAnimation = () => {
        Animated.parallel([
            Animated.timing(modalAnimatedValue, {
                toValue: toValues(),
                duration: animationTime,
                easing: Easing[easing],
                useNativeDriver: true,
            }),
            Animated.timing(outerAnimatedValue, {
                toValue: toValues(),
                duration: 0,
                easing: Easing[easing],
                useNativeDriver: true,
            }),
        ]).start();
    };

    useEffect(() => {
        runAnimation();

        if (isOpen){
            onShow();
        }
    }, [isOpen]);

    const renderSelections = () => {
        const selectedValue = value;
        return (
            <SafeAreaView style={{height: screenWidth * 0.5,}}>
                <FlatList
                    data={selections}
                    renderItem={({item}) => {
                        const {id, value, text} = item;
                        return (
                            <TouchableOpacity
                                style={{
                                    marginBottom: 10,
                                }}
                                onPress={() => {
                                    setValue(value);
                                    toggleFunc();
                                }}
                            >
                                <Text style={[{fontSize: 16,}, value === selectedValue && [{fontSize: 18, fontWeight: 'bold',}, selectedItemStyle], unselectedItemStyle]}>{text}</Text>
                            </TouchableOpacity>
                        );
                    }}
                    keyExtractor={(item) => item.id.toString()}
                />
            </SafeAreaView>
        );
    };

    return (
        isOpen &&
        <Animated.View style={{
            width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
        }}>
            <TouchableOpacity
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    backgroundColor: backdropColor,
                    transform: [{translateY: outerAnimatedValue}]
                }}
                onPress={() => {
                    toggleFunc();
                    onClose();
                }}
            />

            <Animated.View
                style={[
                    {
                        width: isFullScreen ? '100%' : '80%',
                        position: 'absolute',
                        backgroundColor: modalColor,
                        borderRadius: modalRadius,
                        transform: [{translateY: modalAnimatedValue}],
                        padding: 30,
                    },
                isFullScreen && {height: '100%', borderRadius: 0,},
                modalStyle,
            ]}>
                {title !== null && titleComponent === null && <Text style={[{fontSize: 20, fontWeight: '500', marginBottom: 10,}, titleStyle]}>{title}</Text>}
                {titleComponent !== null && titleComponent}

                {renderSelections()}

                {isShowCloseButton && closeButtonComponent === null &&
                    <TouchableOpacity
                        style={[{alignSelf: 'center', backgroundColor: 'indigo', marginTop: 10, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 15,}, closeButtonStyle]}
                        onPress={() => {
                            toggleFunc();
                            onClose();
                        }}
                    >
                        <Text style={[{color: 'white',}, closeButtonTextStyle]}>{closeButtonText !== null ? closeButtonText : "Close"}</Text>
                    </TouchableOpacity>
                }

                {isShowCloseButton && closeButtonComponent !== null && closeButtonComponent}
            </Animated.View>
        </Animated.View>
    );
};

SelectPicker.defaultProps = {
    title: null,
    titleStyle: null,
    titleComponent: null,
    easing: 'linear',
    animationTime: 500,
    modalColor: 'white',
    backdropColor: 'rgba(0, 0, 0, 0.8)',
    modalRadius: 15,
    modalStyle: null,
    isFullScreen: false,
    onShow: () => {},
    onClose: () => {},
    isShowCloseButton: false,
    closeButtonText: null,
    closeButtonStyle: null,
    closeButtonTextStyle: null,
    closeButtonComponent: null,
    unselectedItemStyle: null,
    selectedItemStyle: null,
};

SelectPicker.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleFunc: PropTypes.func.isRequired,
    title: PropTypes.string,
    titleStyle: PropTypes.object,
    titleComponent: PropTypes.any,
    selections: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        value: PropTypes.any.isRequired,
        text: PropTypes.string.isRequired,
    })),
    value: PropTypes.any.isRequired,
    setValue: PropTypes.func.isRequired,
    easing: PropTypes.string,
    animationTime: PropTypes.number,
    modalColor: PropTypes.string,
    backdropColor: PropTypes.string,
    modalRadius: PropTypes.number,
    modalStyle: PropTypes.string,
    isFullScreen: PropTypes.bool,
    onShow: PropTypes.func,
    onClose: PropTypes.func,
    isShowCloseButton: PropTypes.bool,
    closeButtonText: PropTypes.string,
    closeButtonStyle: PropTypes.object,
    closeButtonTextStyle: PropTypes.object,
    closeButtonComponent: PropTypes.any,
    unselectedItemStyle: PropTypes.object,
    selectedItemStyle: PropTypes.object,
};

export default SelectPicker;
