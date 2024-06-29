// import React, {useEffect, useState} from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   PermissionsAndroid,
//   Platform,
// } from 'react-native';
// import {
//   Camera,
//   useCameraDevices,
//   useFrameProcessor,
// } from 'react-native-vision-camera';
// import {runOnJS} from 'react-native-reanimated';


// const App = () => {
//   const [hasPermission, setHasPermission] = useState(false);
//   const [qrCode, setQrCode] = useState<string | null>(null);
//   const devices = useCameraDevices();
//   const device = devices[0];

//   useEffect(() => {
//     const requestCameraPermission = async () => {
//       if (Platform.OS === 'android') {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.CAMERA,
//           {
//             title: 'Camera Permission',
//             message: 'App needs camera permission',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: 'Cancel',
//             buttonPositive: 'OK',
//           },
//         );
//         setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
//       } else {
//         const status = await Camera.requestCameraPermission();
//         setHasPermission(status === 'authorized');
//       }
//     };
//     ``;

//     requestCameraPermission();
//   }, []);

//   const frameProcessor = useFrameProcessor(frame => {
//     'worklet';
//     const barcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE]);
//     if (barcodes.length > 0) {
//       runOnJS(setQrCode)(barcodes[0].displayValue);
//     }
//   }, []);

//   if (device == null) return <Text>Loading...</Text>;
//   if (!hasPermission) return <Text>No access to camera</Text>;

//   return (
//     <View style={styles.container}>
//       <Camera
//         style={StyleSheet.absoluteFill}
//         device={device}
//         isActive={true}
//         frameProcessor={frameProcessor}
//         // frameProcessorFps={5}
//       />
//       {qrCode && (
//         <View style={styles.qrContainer}>
//           <Text style={styles.qrText}>QR Code: {qrCode}</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   qrContainer: {
//     position: 'absolute',
//     bottom: 40,
//     left: 0,
//     right: 0,
//     alignItems: 'center',
//   },
//   qrText: {
//     fontSize: 20,
//     color: 'white',
//     backgroundColor: 'rgba(0,0,0,0.7)',
//     padding: 10,
//     borderRadius: 5,
//   },
// });

// export default App;
