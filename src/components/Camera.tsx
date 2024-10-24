import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';


interface CameraProps {
  onClose: () => void;
}

export function Camera({ onClose }: CameraProps) {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null); // Referência para a câmera
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  // const [photoUri, setPhotoUri] = useState<string | null>(null); // Armazenar a URI da foto

  if (!permission) {
    // Permissões da câmera ainda estão sendo carregadas.
    return <View />;
  }

  if (!permission.granted) {
    // As permissões da câmera ainda não foram concedidas.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { base64: true };  // A opção base64
      const photo = await cameraRef.current.takePictureAsync(options);
      
      onClose();
      // Armazena a imagem em base64 no estado
      setImageBase64(photo.base64);
      console.log(photo.base64);  // Base64 da imagem capturada
    }
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Take Picture</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
      {imageBase64 && (
        <Text>Base64 da imagem capturada: {imageBase64}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    borderRadius: 9,
    overflow: 'hidden'
  },
  camera: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 9,
    overflow: 'hidden'
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  preview: {
    position: 'absolute',
    bottom: 10,
    alignItems: 'center',
    width: '100%',
  },
  photo: {
    width: 300,
    height: 400,
    borderRadius: 9,
    marginTop: 10,
  },
});
