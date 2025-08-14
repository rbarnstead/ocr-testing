import React from "react";
import { BrowserPDF417Reader } from "@zxing/browser";
import { useEffect, useRef } from "react";
import { NotFoundException, ChecksumException, FormatException } from "@zxing/library";

export default function TestScanner() {
    const videoRef = useRef(null);

    useEffect(() => {
        const codeReader = new BrowserPDF417Reader();
        console.log("sup");

        codeReader.decodeFromVideoDevice(null, videoRef.current, (result, err) => {
            if (result) {
                console.log('Found QR Code', result);
            }
            if (err instanceof NotFoundException) {
                console.log('NO QR');
            }
            if (err instanceof ChecksumException) {
                console.log('found but sucks')
            }
            if (err instanceof FormatException) {
                console.log('Found but invalide format')
            }
        });
        

    })

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
        </div>
    );

};



