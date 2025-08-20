import React from "react";
import { BrowserPDF417Reader } from "@zxing/browser";
import { useEffect, useRef, useState } from "react";
import { NotFoundException, ChecksumException, FormatException } from "@zxing/library";

export default function TestScanner() {
    const videoRef = useRef(null);
    const [scanning, setScanning] = useState(false);
    const [test, setText] = useState('');


    useEffect(() => {
        if (!scanning) return;

        const codeReader = new BrowserPDF417Reader();
        let controls;

        const startScanner = async () => {
            console.log("PDF417 Scanner Initiated");
            controls = await codeReader.decodeFromVideoDevice(null, videoRef.current, (result, err) => {
                try {
                    if (result) {
                        console.log('Found QR Code', result);
                        setText(result.getText());
                        if (controls) controls.stop();
                        setScanning(false);
                    }
                }   
                catch {
                    if (err instanceof NotFoundException) {
                        console.log('NO QR');
                    }
                    if (err instanceof ChecksumException) {
                        console.log('found but sucks');
                    }
                    if (err instanceof FormatException) {
                        console.log('Found but invalid format');
                    }
                }
            });
        }

        startScanner();

        return () => {
            if (controls) controls.stop();
        }
        
    }, [scanning]);

    return (
        <div>
            Video Feed
            <video
                ref={videoRef}
                style={{
                    width: "100%",
                    maxWidth: "400px",
                    border: "2px solid #333",
                    borderRadius: "8px",
                }}
            />
            <button 
                onClick={() => {
                    if (videoRef.current) {
                        videoRef.current.srcObject = null;
                        videoRef.current.load();
                    }
                    setScanning(true);
                    setText("");
                }
            }
                disabled={scanning}
            >
            Start Scanning
            </button>
        </div>
    );

};



