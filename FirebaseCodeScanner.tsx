import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RNCamera, BarCodeReadEvent } from 'react-native-camera';

const App = () => {
  const [scannedCodes, setScannedCodes] = useState<Set<string>>(new Set());
  const [analyzedResult, setAnalyzedResult] = useState<string>('');

  const handleBarCodeRead = (event: BarCodeReadEvent) => {
    const { data } = event;
    setScannedCodes(prev => new Set([...prev, data]));
  };

  const handleProcess = () => {
    // Example: Concatenate all scanned QR codes into a single result string
    const result = Array.from(scannedCodes).join('\n');
    setAnalyzedResult(result);
  };

  return (
    <SafeAreaView style={styles.container}>
      <RNCamera
        style={styles.camera}
        onBarCodeRead={handleBarCodeRead}
        captureAudio={false}
        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
      >
        <View style={styles.barcodeContainer}>
          {analyzedResult ? (
            <Text style={styles.barcodeText}>{analyzedResult}</Text>
          ) : (
            <Text style={styles.barcodeText}>Scan QR codes...</Text>
          )}
        </View>
      </RNCamera>
      <TouchableOpacity style={styles.button} onPress={handleProcess}>
        <Text style={styles.buttonText}>Process</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  barcodeContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    margin: 20,
  },
  barcodeText: {
    fontSize: 20,
    color: '#000000',
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
