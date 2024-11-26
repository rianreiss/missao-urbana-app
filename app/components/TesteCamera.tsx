import React, { useRef } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { CameraView } from 'expo-camera';

export default function TesteCamera() {
    const cameraRef = useRef<CameraView>(null);
    
    const takePhoto = async () => {
        if (cameraRef.current) {
        const photo = await cameraRef.current.takePictureAsync();
        console.log(photo.uri);
        }
    };
    
    return (
        <View style={{ flex: 1 }}>
        <CameraView 
            ref={cameraRef} 
            style={{ flex: 1 }} 
            type="back" // ou "front" para câmera frontal
        />
        <Button title="Capture Photo" onPress={takePhoto} />
        </View>
    );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
})