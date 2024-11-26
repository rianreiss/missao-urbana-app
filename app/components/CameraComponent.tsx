import { CameraView, useCameraPermissions, PermissionStatus } from 'expo-camera';
import React, { useState, useRef, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useImageDatabase } from "../database/useImageDatabase";
import { CameraType } from 'expo-image-picker';

interface CameraProps {
  onClose: () => void;
  onTakeImage: (id_photo: number) => void;
}

export function CameraComponent({ onTakeImage, onClose }: CameraProps) {
  const [facing, setFacing] = useState<CameraType>(CameraType.back);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<Camera>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const imageDatabase = useImageDatabase();

  useEffect(() => {
    (async () => {
      if (permission?.status !== PermissionStatus.GRANTED) {
        await requestPermission();
      }
    })();
  }, [permission]);
  // Verificando permissões.

  if (!permission) {
    return <View />;
  }
  // Verificando permissões.

  if (permission.status !== PermissionStatus.GRANTED) {
    return (
      <View style={styles.container}>
        <Text>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }
  // Verificando permissões.

  function toggleCameraFacing() {
    setFacing(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }
  // Manipulando camera frontal/traseira.

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { base64: true };
      const photo = await cameraRef.current.takePictureAsync(options);

      if (photo.base64) {
        setImageBase64(photo.base64);

        // const base64 = await fetch(`data:image/jpg;base64,${photo.base64}`);
        // console.log(base64)
        // const blob = await base64.blob();
        // console.log(blob)

        const byteCharacters = atob(photo.base64);
        console.log(byteCharacters.length)
        const byteArrays = [];
        for (let i = 0; i < byteCharacters.length; i++) {
          byteArrays.push(byteCharacters.charCodeAt(i));
        }

        const uint8Array = new Uint8Array(byteArrays);
        // console.log(uint8Array)
        
        const { insertedRowId } = await imageDatabase.createImage({ photo: uint8Array });
        console.log(insertedRowId)
        onTakeImage(insertedRowId);

        // if (blob) {
        //   const arrayBuffer = await blob.arrayBuffer();
        //   const uint8Array = new Uint8Array(arrayBuffer);

        //   const { insertedRowId } = await imageDatabase.createImage({ photo: uint8Array });
        //   console.log(insertedRowId)
        //   onTakeImage(insertedRowId);
        // }
      }
      // console.log(imageBase64);
      setTimeout(() => {
        onClose();
      }, 500);
    }
  };

  return (
    <View style={styles.container}>
      {!imageBase64 ? (
        <CameraView style={styles.camera} facing={facing} ref={cameraRef}>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <Text style={styles.text}>Take Picture</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </CameraView>
      ) : (
        <View style={styles.containerImage}>
          <Image source={{ uri: `data:image/jpg;base64,${imageBase64}` }} style={{ flex: 1 }} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    borderRadius: 9,
    overflow: 'hidden',
    elevation: 2,                // sombra para Android
    shadowColor: '#fff',         // sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    height: '100%',
    width: '100%',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9,
    overflow: 'hidden'
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: "#999",
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonText: {
    color: 'black', // Cor do texto
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    width: 'auto',
    backgroundColor: '#fcbc24',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,                // sombra para Android
    shadowColor: '#fff',         // sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2 ,
    shadowRadius: 8,
  },
  containerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 9, 
  }
});

export default CameraComponent;