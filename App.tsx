import React, {useState, useRef} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {RNCamera, BarCodeReadEvent} from 'react-native-camera';

const App = () => {
  const [scannedQRs, setScannedQRs] = useState<Set<string>>(new Set());
  const [scanning, setScanning] = useState(false);
  const cameraRef = useRef<RNCamera>(null);

  const handleBarCodeScanned = ({data}: BarCodeReadEvent) => {
    if (!scanning) return;
    setScannedQRs(prevScanned => {
      const newSet = new Set(prevScanned);
      newSet.add(data);
      return newSet;
    });
  };

  const startScanning = () => {
    setScanning(true);
    setScannedQRs(new Set());
  };

  const handleOkPress = () => {
    const scannedArray = Array.from(scannedQRs);
    alert(
      `Total Scanned QR Codes: ${
        scannedArray.length
      }\nDetails: ${scannedArray.join(', ')}`,
    );
    setScanning(false);
  };

  const resetScanner = () => {
    setScannedQRs(new Set());
    setScanning(true);
    if (cameraRef.current) {
      cameraRef.current.resumePreview();
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.auto}
        captureAudio={false} // Disable audio capture if not needed
        autoFocus={RNCamera.Constants.AutoFocus.on} // Ensure autofocus is on
        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        }}
        onBarCodeRead={handleBarCodeScanned}
        ratio="16:9" // Optimize for common aspect ratios
        zoom={0} // Start with no zoom for better performance
      >
        <Text style={styles.text}>Scan QR Code</Text>
      </RNCamera>
      <TouchableOpacity
        style={[
          styles.button,
          {backgroundColor: scanning ? '#FF5722' : '#4CAF50'},
        ]}
        onPress={scanning ? resetScanner : startScanning}>
        <Text style={styles.buttonText}>
          {scanning ? 'Reset Scanner' : 'Start Scanning'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          {backgroundColor: scannedQRs.size > 0 ? '#4CAF50' : '#666666'},
        ]}
        onPress={handleOkPress}
        disabled={!scanning || scannedQRs.size === 0}>
        <Text style={styles.buttonText}>OK</Text>
      </TouchableOpacity>
      {scannedQRs.size > 0 && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Scanned QR Codes:</Text>
          {Array.from(scannedQRs).map((qr, index) => (
            <Text key={index} style={styles.resultText}>{`${qr}`}</Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: '100%', // Adjust height to ensure the preview fits the screen
  },
  text: {
    color: 'white',
    fontSize: 18,
    marginTop: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  resultContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    width: '90%',
    borderRadius: 10,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default App;
