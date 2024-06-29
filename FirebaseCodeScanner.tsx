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
  const [analyzedResult, setAnalyzedResult] = useState<string>('');
  const [scannedCount, setScannedCount] = useState<number>(0);

  const handleBarCodeRead = (event: BarCodeReadEvent) => {
    const {data} = event;
    if (!scannedCodes.includes(data)) {
      setScannedCodes(prev => [...prev, data]);
      setScannedCount(prev => prev + 1);
    }
  };

  const handleProcess = () => {
    const result = scannedCodes.join('\n');
    setAnalyzedResult(result);
  };

  const handleReset = () => {
    setScannedCodes([]);
    setAnalyzedResult('');
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
        <View style={styles.barcodeContainer}>
          {scannedCodes.map((code, index) => (
            <Text key={index} style={styles.barcodeText}>
              {code}
            </Text>
          ))}
        </View>
      </RNCamera>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.processButton]}
          onPress={handleProcess}>
          <Text style={styles.buttonText}>Process</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={handleReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.resultContainer}>
        {analyzedResult ? (
          <Text style={styles.resultText}>{analyzedResult}</Text>
        ) : (
          <Text style={styles.resultText}>Scan QR codes to see results...</Text>
        )}
      </View>
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
  barcodeContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    margin: 20,
    maxHeight: 200,
    overflow: 'scroll',
  },
  barcodeText: {
    fontSize: 20,
    color: '#000000',
    marginBottom: 5,
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
  resultContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  resultText: {
    fontSize: 18,
    color: '#333333',
  },
});

export default App;
