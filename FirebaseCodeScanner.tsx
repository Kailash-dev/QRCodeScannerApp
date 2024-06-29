import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {RNCamera, BarCodeReadEvent} from 'react-native-camera';

const App = () => {
  const [scannedCodes, setScannedCodes] = useState<string[]>([]);
  const [scannedCount, setScannedCount] = useState<number>(0);
  const [processing, setProcessing] = useState<boolean>(false);

  const handleBarCodeRead = (event: BarCodeReadEvent) => {
    const {data} = event;
    if (!scannedCodes.includes(data)) {
      setScannedCodes(prev => [...prev, data]);
      setScannedCount(prev => prev + 1);
    }
  };

  const handleProcess = () => {
    setProcessing(true);
    setTimeout(() => {
      const result = scannedCodes.join('\n');
      setProcessing(false);
      alert(result); // Replace with your processing logic
    }, 2000); // Simulating processing delay with setTimeout
  };

  const handleReset = () => {
    setScannedCodes([]);
    setScannedCount(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Scanned Count: {scannedCount}</Text>
      </View>
      <RNCamera
        style={styles.camera}
        onBarCodeRead={handleBarCodeRead}
        captureAudio={false}
        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}>
        <View style={styles.overlay}>
          {scannedCodes.map((code, index) => (
            <Text key={index} style={styles.overlayText}>
              {code}
            </Text>
          ))}
        </View>
      </RNCamera>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.processButton]}
          onPress={handleProcess}
          disabled={processing || scannedCodes.length === 0}>
          <Text style={styles.buttonText}>
            {processing ? 'Processing...' : 'Process'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={handleReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
      {processing && (
        <View style={styles.processingContainer}>
          <Text style={styles.processingText}>
            Processing {scannedCount} QR codes...
          </Text>
        </View>
      )}
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
  header: {
    alignSelf: 'flex-start',
    margin: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    fontSize: 20,
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    width: 120,
    alignItems: 'center',
  },
  processButton: {
    backgroundColor: 'blue',
  },
  resetButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  processingContainer: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 10,
  },
  processingText: {
    fontSize: 18,
    color: 'white',
  },
});

export default App;
