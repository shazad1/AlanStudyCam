import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [type, setType] = useState(CameraType.back);
  const [zoom, setZoom] = useState(0);
  const [permission, requestPermission] = Camera.useCameraPermissions();


  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button style={{backgroundColor: '#ffde59', color:'#000'}} onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function increaseZoom() {
    if (zoom <= 0.9) {
      setZoom(zoom + 0.1)
    }
  }
  function decreaseZoom() {
    if (zoom >= 0.1) {
      setZoom(zoom - 0.1)
    }
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} autoFocus = {true} zoom={zoom}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={increaseZoom}>
            <Text style={styles.text}>+</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={decreaseZoom}>
            <Text style={styles.text}>-</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
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
});
