import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useImageDatabase } from "@/database/useImageDatabase";

interface CameraProps {
  onClose: () => void;
  onTakeImage: (id_photo: number) => void;
}

export function Camera({ onTakeImage, onClose }: CameraProps) {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>();
  const [imageBase64, setImageBase64] = useState();
  
  const imageDatabase = useImageDatabase()

  if (!permission) {
    return <View />;
    // Permissões da câmera ainda estão sendo carregadas.
  }

  if (!permission.granted) {
    // As permissões da câmera ainda não foram concedidas.
    return (
      <View style={styles.container}>
        <Text>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { base64: true };
      const photo = await cameraRef.current.takePictureAsync(options);

      const base64Image = photo.base64 !== undefined ? photo.base64 : null;

      setImageBase64(photo);
      
      const base64Response = await fetch(`data:image/jpg;base64,${base64Image}`);
      const blob = await base64Response.blob();

      if (blob) {
        const arrayBuffer = await blob.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);

        const { insertedRowId } = await imageDatabase.createImage({ photo: uint8Array  });

        onTakeImage(insertedRowId);
      }

      setTimeout(() => {
        onClose();
      }, 1500);
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
        </CameraView>
      ) : (
        <Image source={{ uri: `data:image/jpg;base64,${imageBase64}` }} style={{ flex: 1 }} />
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
