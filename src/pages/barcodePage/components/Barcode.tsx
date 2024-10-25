import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode, Html5QrcodeScanType, Html5QrcodeSupportedFormats } from 'html5-qrcode'; // Import necessary classes
import barcodeSound from "../../../assets/sound/barcode.mp3"; // Your barcode sound
import Button from '../../../components/common/button/Index';

const Barcode = () => {
  const scannerRef = useRef<Html5Qrcode | null>(null); // To store the scanner instance
  const audioRef = useRef<HTMLAudioElement>(new Audio(barcodeSound)); // Preload audio
  const [isScanning, setIsScanning] = useState(false); // Scanning state

  // Function to start the scanner
  const startScanner = () => {
    const qrcodeRegionId = "barcode-reader";
    const qrScanner = new Html5Qrcode(qrcodeRegionId);
    scannerRef.current = qrScanner;

    // Scanner configuration, ensuring barcodes and QR codes are supported
    const config = {
      fps: 10, // Frames per second for scanning
      qrbox: {width: 200, height: 200},
      //   supportedScanTypes: [
    //     Html5QrcodeSupportedFormats.QR_CODE,
    //     Html5QrcodeSupportedFormats.CODE_128, // Barcode format (CODE_128)
    //     Html5QrcodeSupportedFormats.CODE_39,  // Barcode format (CODE_39)
    //     Html5QrcodeSupportedFormats.EAN_13,   // Barcode format (EAN_13) for retail barcodes
    //   ],
    supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],

      aspectRatio: 1.33333, // Set aspect ratio for better detection (4:3 camera aspect)
    };

    // Start scanning for barcodes and QR codes
    qrScanner
      .start(
        { facingMode: "environment" }, // Use the rear camera
        config,
        (decodedText, decodedResult) => {
          console.log(`Code detected: ${decodedText}`);
          
          // Play sound when a code is detected
          if (audioRef.current) {
            audioRef.current.currentTime = 0; // Reset sound to start
            audioRef.current.play().catch((err) => {
              console.warn("Error playing sound:", err);
            });
          }
        },
        (error) => {
          console.warn(`Scanning error: ${error}`);
        }
      )
      .then(() => setIsScanning(true))
      .catch((err) => console.error(`Error starting scanner: ${err}`));
  };

  // Cleanup scanner when the component unmounts
  useEffect(() => {
    return () => {
      if (scannerRef.current && isScanning) {
        scannerRef.current.stop()
          .then(() => scannerRef.current?.clear())
          .then(() => setIsScanning(false))
          .catch((err) => console.warn("Error stopping scanner:", err));
      }
    };
  }, [isScanning]);

  return (
    <div className='barcode_scanner_container'>
      <div id="barcode-reader" style={{ width: "100vw"}}></div>

      {/* Button to start the scanner, ensures user interaction */}
      <Button variant='contained' onClick={startScanner}>Start Scanner</Button>
    </div>
  );
};

export default Barcode;