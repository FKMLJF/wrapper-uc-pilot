/**
 * Copyright (c) 2023 Jozsef Vincze
 */

import React, { useRef } from 'react';

import {
    Linking,
    StyleSheet,
    View,
} from 'react-native';
import { WebView } from 'react-native-webview';

import { RNCamera } from 'react-native-camera';

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function App(): JSX.Element {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Uril Card Page">
                    {(props) => <UrilCardPage {...props} />}
                </Stack.Screen>
                <Stack.Screen name="CodeReader" component={QRCodeReader} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

function UrilCardPage(props: any): JSX.Element {
    const URL = 'https://uc.procats.hu';
    const webView = useRef<WebView>(null);

    const readQrCode = () => {
        props.navigation.navigate('CodeReader')
    }

    const readNFCTag = () => {
        // do something
    }

    return (
        <View style={styles.body}>
            <WebView
                source={{uri: URL}}
                ref={ webView }
                onLoadEnd={ () => webView.current?.postMessage("webViewLoaded") }
                onMessage={ (event) => {
                    switch (event.nativeEvent.data) {
                        case "read-qr-code" :
                            readQrCode();
                            break;
                        case "read-nfc-tag" :
                            readNFCTag();
                            break;
                        default:
                            break;
                    }
                }}
            ></WebView>
        </View>
    )
}

function QRCodeReader(): JSX.Element {
    const onSuccess = (e: any) => {
        Linking.openURL(e.data).catch(err =>
            console.error('An error occured', err)
        );
    };

    return (
        <RNCamera
            onBarCodeRead={(event) => onSuccess.bind(event)}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
            }}
            androidRecordAudioPermissionOptions={{
                title: 'Permission to use audio recording',
                message: 'We need your permission to use your audio',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
            }}>
        </RNCamera>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'black',
        color: 'white',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    }
});

export default App;
