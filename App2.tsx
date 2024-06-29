// // import React, {useState, useRef} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   PermissionsAndroid,
//   Platform,
// } from 'react-native';

// import {Camera, useCameraDevice} from 'react-native-vision-camera';

// import React, {useEffect} from 'react';

// const requestCameraPermission = async () => {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.CAMERA,
//       {
//         title: 'Permission to use camera',
//         message: 'We need your permission to use your camera',
//         buttonPositive: 'OK',
//         buttonNegative: 'Cancel',
//       },
//     );
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log('Camera permission granted');
//     } else {
//       console.log('Camera permission denied');
//     }
//   } catch (err) {
//     console.warn(err);
//   }
// };

// const App2 = () => {
//   useEffect(() => {
//     if (Platform.OS === 'android') {
//       requestCameraPermission();
//     } else if (Platform.OS === 'ios') {
//       // Handle permissions for iOS if needed
//     }
//   }, []);

//   const handleBarCodeScanned = ({data}) => {
//     console.log(`QR code scanned: ${data}`);
//     // Process the scanned QR code data here (e.g., store it in state, show in UI, etc.)
//     // Example: setScannedData(data);
//   };

//   const device = useCameraDevice('back');

//   if (device == null) {
//     return <Text>alskjdf</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <Camera
//         style={StyleSheet.absoluteFill}
//         device={device}
//         isActive={true}
//         onBarCodeScanned={handleBarCodeScanned}
//       />
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
//     color: 'green',
//   },
// });

// export default App2;

import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import QRScannerScreen from './QRScreen';

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Permission to use camera',
        message: 'We need your permission to use your camera',
        buttonPositive: 'OK',
        buttonNegative: 'Cancel',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Camera permission granted');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const App2 = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      requestCameraPermission();
    } else if (Platform.OS === 'ios') {
      // Handle permissions for iOS if needed
    }
  }, []);

  const device = useCameraDevice('back');

  const handleBarCodeScanned = ({data}: any) => {
    console.log(`QR code scanned: ${data}`);
    // Process the scanned QR code data here (e.g., store it in state, show in UI, etc.)
    // Example: setScannedData(data);
  };

  if (device == null) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}

        // onBarCodeScanned={handleBarCodeScanned} // Add this prop for QR code scanning
      />
      <QRScannerScreen></QRScannerScreen>
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
});

export default App2;
