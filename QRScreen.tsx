import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {
  Camera,
  useCameraDevice,
  //   useCameraDevices,
  //   useFrameProcessor,
} from 'react-native-vision-camera';

const QRScannerScreen = () => {
  const [scannedQR, setScannedQR] = useState<string | null>(null);
  //   const [isProcessing, setIsProcessing] = useState(false);
  const device = useCameraDevice('back');

  // QR code frame processor
  //   const {frameProcessor} = useFrameProcessor({
  //     // Adjust QR code detection settings if needed
  //     frameProcessor: async frame => {
  //       if (!isProcessing) {
  //         setIsProcessing(true);
  //         try {
  //           const qrCodes = await Camera.scanQRCodes(frame);
  //           if (qrCodes.length > 0) {
  //             setScannedQR(qrCodes[0].data);
  //             setIsProcessing(false);
  //           }
  //         } catch (error) {
  //           console.error('Failed to scan QR code:', error);
  //           setIsProcessing(false);
  //         }
  //       }
  //     },
  //   });

  useEffect(() => {
    // Clean up any ongoing processing on component unmount
    // return () => setIsProcessing(false);
  }, []);

  const handleClearQR = () => {
    setScannedQR(null);
  };

  if (device == null) {
    return <Text>alskjdf</Text>;
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {scannedQR ? (
        <>
          <Text>Scanned QR Code:</Text>
          <Text>{scannedQR}</Text>
          <Button title="Clear QR Code" onPress={handleClearQR} />
        </>
      ) : (
        <Camera
          style={{width: '100%', height: '100%'}}
          device={device}
          isActive={true}
          //   frameProcessor={frameProcessor}
        />
        // <Camera
        //   style={StyleSheet.absoluteFill}
        //   device={device}
        //   isActive={true}
        //   //   onBarCodeScanned={handleBarCodeScanned} // Add this prop for QR code scanning
        // />
      )}
    </View>
  );
};

export default QRScannerScreen;
