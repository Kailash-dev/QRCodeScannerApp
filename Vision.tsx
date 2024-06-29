// import React, {useState, useRef} from 'react';
// import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
// import {Camera, useCameraDevices} from 'react-native-vision-camera';
// // import {BarcodeFormat, useScanBarcodes} from 'vision-camera-code-scanner';

// const Vision = () => {
//   const [scannedQRs, setScannedQRs] = useState<Set<string>>(new Set());
//   const [scanning, setScanning] = useState(false);
//   const cameraRef = useRef<Camera>(null);

//   const devices = useCameraDevices();
//   const device = devices[0];

// //   const [, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
// //     checkInverted: true,
// //   });

//   const handleBarCodeScanned = () => {
//     if (!scanning) return;

//     barcodes.forEach((barcode: any) => {
//       if (barcode.rawValue) {
//         setScannedQRs(prevScanned => {
//           const newSet = new Set(prevScanned);
//           newSet.add(barcode.rawValue);
//           return newSet;
//         });
//       }
//     });
//   };

//   const startScanning = () => {
//     setScanning(true);
//     setScannedQRs(new Set());
//   };

//   const handleOkPress = () => {
//     const scannedArray = Array.from(scannedQRs);
//     Alert.alert(
//       `Total Scanned QR Codes: ${scannedArray.length}`,
//       `Details: ${scannedArray.join(', ')}`,
//     );
//     setScanning(false);
//   };

//   const resetScanner = () => {
//     setScannedQRs(new Set());
//     setScanning(true);
//   };

//   handleBarCodeScanned();

//   return (
//     <View style={styles.container}>
//       {device && (
//         <Camera
//           ref={cameraRef}
//           style={styles.preview}
//           device={device}
//           isActive={scanning}
//           //   frameProcessor={frameProcessor}
//           //   frameProcessorFps={5} // Lower frame rate for better performance on mid-range devices
//           enableZoomGesture={false} // Disable zoom gesture for simplicity
//         />
//       )}
//       <TouchableOpacity
//         style={[
//           styles.button,
//           {backgroundColor: scanning ? '#FF5722' : '#4CAF50'},
//         ]}
//         onPress={scanning ? resetScanner : startScanning}>
//         <Text style={styles.buttonText}>
//           {scanning ? 'Reset Scanner' : 'Start Scanning'}
//         </Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={[
//           styles.button,
//           {backgroundColor: scannedQRs.size > 0 ? '#4CAF50' : '#666666'},
//         ]}
//         onPress={handleOkPress}
//         disabled={!scanning || scannedQRs.size === 0}>
//         <Text style={styles.buttonText}>OK</Text>
//       </TouchableOpacity>
//       {scannedQRs.size > 0 && (
//         <View style={styles.resultContainer}>
//           <Text style={styles.resultText}>Scanned QR Codes:</Text>
//           {Array.from(scannedQRs).map((qr, index) => (
//             <Text key={index} style={styles.resultText}>{`${qr}`}</Text>
//           ))}
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   preview: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     width: '100%',
//     height: '100%', // Adjust height to ensure the preview fits the screen
//   },
//   text: {
//     color: 'white',
//     fontSize: 18,
//     marginTop: 20,
//   },
//   button: {
//     backgroundColor: '#4CAF50',
//     padding: 10,
//     margin: 10,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     textAlign: 'center',
//   },
//   resultContainer: {
//     marginTop: 20,
//     padding: 10,
//     backgroundColor: '#f0f0f0',
//     width: '90%',
//     borderRadius: 10,
//   },
//   resultText: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
// });

// export default Vision;
