import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import ContextMenu from "./ContextMenu";
import PhotoPicker from "./PhotoPicker";
import PhotoLibrary from "./PhotoLibrary";
import CapturePhoto from "./CapturePhoto";

function Avatar({ type, image, setImage }) {
  const [hover, setHover] = useState(false); // State for hover effect
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false); // State for context menu visibility
  const [contextMenuCordinates, setcontextMenuCordinates] = useState({ x: 0, y: 0 }); // State for context menu coordinates
  const [grabPhoto, setGrabPhoto] = useState(false); // State for grabbing photo
  const [showPhotoLibrary, setShowPhotoLibrary] = useState(false); // State for showing photo library
  const [showCapturePhoto, setShowCapturePhoto] = useState(false); // State for capturing photo

  // Function to show context menu
  const showContextMenu = (e) => {
    e.preventDefault();
    setcontextMenuCordinates({ x: e.pageX, y: e.pageY }); // Set context menu coordinates
    setIsContextMenuVisible(true); // Show context menu
  };

  // Effect to handle file input click
  useEffect(() => {
    if (grabPhoto) {
      const data = document.getElementById("photo-picker");
      data.click();
      document.body.onfocus = (e) => {
        setTimeout(() => {
          setGrabPhoto(false); // Reset grabPhoto state
        }, 1000);
      };
    }
  }, [grabPhoto]);

  // Context menu options
  const contextMenuOptions = [
    {
      name: "Take Photo",
      callback: () => {
        setShowCapturePhoto(true); // Show capture photo component
      },
    },
    {
      name: "Choose From Library",
      callback: () => {
        setShowPhotoLibrary(true); // Show photo library component
      },
    },
    {
      name: "Uploads Photo",
      callback: () => {
        setGrabPhoto(true); // Trigger file input click
      },
    },
    {
      name: "Remove Photo",
      callback: () => {
        setImage("/default_avatar.png"); // Set default avatar image
      },
    },
  ];

  // Function to handle photo picker change
  const photoPickerChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const data = document.createElement("img");
    reader.onload = function (event) {
      data.src = event.target.result;
      data.setAttribute("data-src", event.target.result);
    };
    reader.readAsDataURL(file);
    setTimeout(() => {
      setImage(data.src); // Set selected image
    }, 100);
  };

  return (
    <>
      <div className="flex items-center justify-center">
        {type === "sm" && (
          <div className="relative h-10 w-10">
            <Image
              src={image}
              alt="avatar"
              className="rounded-full"
              width={40}
              height={40}
            />
          </div>
        )}
        {type === "lg" && (
          <div className="relative h-14 w-14">
            <Image
              src={image}
              alt="avatar"
              className="rounded-full"
              width={56}
              height={56}
            />
          </div>
        )}
        {type === "xl" && (
          <div
            className="relative cursor-pointer z-0"
            onMouseEnter={() => setHover(true)} // Show overlay on hover
            onMouseLeave={() => setHover(false)} // Hide overlay on leave
          >
            <div
              className={`z-10 bg-photopicker-overlay-background h-60 w-60 absolute top-0 left-0 flex items-center rounded-full justify-center flex-col text-center gap-2
            ${hover ? "visible" : "hidden"}
            `}
              id="context-opener"
              onClick={(e) => showContextMenu(e)} // Show context menu on click
            >
              <FaCamera
                className="text-2xl text-white"
                id="context-opener"
                onClick={(e) => showContextMenu(e)} // Show context menu on click
              />
              <span onClick={(e) => showContextMenu(e)}>
                Change <br /> Profile Photo
              </span>
            </div>
            <div className="flex items-center justify-center h-60 w-60">
              <Image
                src={image}
                alt="avatar"
                className="rounded-full"
                width={240}
                height={240}
              />
            </div>
          </div>
        )}
        {isContextMenuVisible && (
          <ContextMenu
            options={contextMenuOptions} // Pass context menu options
            cordinates={contextMenuCordinates} // Pass context menu coordinates
            contextMenu={isContextMenuVisible} // Pass context menu visibility state
            setContextMenu={setIsContextMenuVisible} // Function to set context menu visibility
          />
        )}
        {showCapturePhoto && (
          <CapturePhoto
            setImage={setImage} // Function to set image
            hideCapturePhoto={setShowCapturePhoto} // Function to hide capture photo component
          />
        )}
        {showPhotoLibrary && (
          <PhotoLibrary
            setImage={setImage} // Function to set image
            hidePhotoLibrary={setShowPhotoLibrary} // Function to hide photo library component
          />
        )}
        {grabPhoto && <PhotoPicker onChange={photoPickerChange} />} {/* Photo picker component */}
      </div>
    </>
  );
}

export default Avatar;
