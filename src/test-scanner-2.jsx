// PDF417Scanner.jsx
import React, { useEffect, useRef, useState } from "react";
import { BrowserPDF417Reader } from "@zxing/browser";
import {
  NotFoundException,
  ChecksumException,
  FormatException,
} from "@zxing/library";

export default function TestScanner2() {
  const videoRef = useRef(null);
  const [resultText, setResultText] = useState("");
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    if (!scanning) return;

    const reader = new BrowserPDF417Reader();
    let controls;

    const start = async () => {
      controls = await reader.decodeFromVideoDevice(
        null, // auto-select camera
        videoRef.current,
        (result, err) => {
          if (result) {
            setResultText(result.getText());
            if (controls) controls.stop(); // stop after first valid read
            setScanning(false);
          } else if (err) {
            if (err instanceof NotFoundException) {
              // no code in this frame – keep scanning
            } else if (err instanceof ChecksumException) {
              console.log("Checksum failed – keep scanning");
            } else if (err instanceof FormatException) {
              console.log("Format error – keep scanning");
            } else {
              console.error("Unexpected error", err);
            }
          }
        }
      );
    };

    start();

    return () => {
      if (controls) controls.stop();
    };
  }, [scanning]);

  return (
    <div style={{ maxWidth: 420 }}>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{
          width: "100%",
          border: "2px solid #333",
          borderRadius: 8,
        }}
      />
      <div style={{ marginTop: 12 }}>
        <strong>Result:</strong>
        <pre style={{ whiteSpace: "pre-wrap" }}>{resultText || "—"}</pre>
      </div>
      <button
        onClick={() => {
          if (scanning) {
            setScanning(false); // stop
            if (videoRef.current) {
              videoRef.current.srcObject = null; // release camera
            }
          } else {
            setResultText(""); // clear old result
            setScanning(true); // start
          }
        }}
        style={{
          marginTop: 12,
          padding: "8px 16px",
          fontSize: "16px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        {scanning ? "Stop Scanning" : "Start Scanning"}
      </button>
    </div>
  );
}
