import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

function CapturePhoto({ setImage, hideCapturePhoto }) {
  // Reference to the video element
  const videoRef = useRef(null);

  useEffect(() => {
    let stream;
    
    // Function to start the camera and get the video stream
    const startCamera = async () => {
      try {
        // Request access to the user's camera
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        // If the video element is mounted, set the video source to the stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing the camera", error);
      }
    };

    startCamera();

    // Cleanup function to stop the camera stream when the component unmounts
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Function to capture the photo from the video stream
  const capturePhoto = () => {
    const canvas = document.createElement("canvas");
    // Set the canvas dimensions to match the video dimensions
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    // Draw the current video frame onto the canvas
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    // Convert the canvas content to a data URL (base64-encoded image)
    setImage(canvas.toDataURL("image/jpeg"));
    // Hide the capture photo component
    hideCapturePhoto(false);
  };

  return (
    <div className="absolute h-4/6 w-2/6 top-1/4 left-1/3 bg-gray-900 gap-3 rounded-lg pt-2 flex items-center justify-center">
      <div className="flex flex-col gap-4 w-full items-center justify-center">
        <div
          className="pt-2 pr-2 cursor-pointer flex items-end justify-end"
          onClick={() => hideCapturePhoto(false)}
        >
          <IoClose className="h-8 w-8 cursor-pointer" />
        </div>
        <div className="flex justify-center">
          <video id="video" width="400" autoPlay ref={videoRef}></video>
        </div>
        <button
          className="h-16 w-16 bg-white rounded-full cursor-pointer border-8 border-teal-light p-2 mb-10"
          onClick={capturePhoto}
        ></button>
      </div>
    </div>
  );
}

export default CapturePhoto;
