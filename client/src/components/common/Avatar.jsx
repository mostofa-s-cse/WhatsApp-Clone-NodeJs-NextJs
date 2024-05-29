import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa6";
import ContextMenu from "./ContextMenu";
import PhotoPicker from "./PhotoPicker";
import PhotoLibrary from "./PhotoLibrary";
import CapturePhoto from "./CapturePhoto";

function Avatar({ type, image, setImage }) {
  // State hooks for various functionalities
  const [hover, setHover] = useState(false);
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const [contextMenuCordinates, setcontextMenuCordinates] = useState({ x: 0, y: 0 });
  const [grabPhoto, setGrabPhoto] = useState(false);
  const [showPhotoLibrary, setShowPhotoLibrary] = useState(false);
  const [showCapturePhoto, setShowCapturePhoto] = useState(false);

  // Function to show context menu
  const showContextMenu = (e) => {
    e.preventDefault();
    setcontextMenuCordinates({ x: e.pageX, y: e.pageY });
    setIsContextMenuVisible(true);
  };

  // Effect to handle file input click
  useEffect(() => {
    if (grabPhoto) {
      const data = document.getElementById("photo-picker");
      data.click();
      document.body.onfocus = (e) => {
        setTimeout(() => {
          setGrabPhoto(false);
        }, 1000);
      };
    }
  }, [grabPhoto]);

  // Context menu options
  const contextMenuOptions = [
    {
      name: "Take Photo",
      callback: () => {
        setShowCapturePhoto(true);
      },
    },
    {
      name: "Choose From Library",
      callback: () => {
        setShowPhotoLibrary(true);
      },
    },
    {
      name: "Uploads Photo",
      callback: () => {
        setGrabPhoto(true);
      },
    },
    {
      name: "Remove Photo",
      callback: () => {
        setImage("/default_avatar.png");
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
      setImage(data.src);
    }, 100);
  };

  return (
    <>
      <div className="flex items-center justify-center">
        {/* Render avatar based on size type */}
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
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            {/* Overlay for changing profile photo */}
            <div
              className={`z-10 bg-photopicker-overlay-background h-60 w-60 absolute top-0 left-0 flex items-center rounded-full justify-center flex-col text-center gap-2
            ${hover ? "visible" : "hidden"}
            `}
              id="context-opener"
              onClick={(e) => showContextMenu(e)}
            >
              <FaCamera
                className="text-2xl text-white"
                id="context-opener"
                onClick={(e) => showContextMenu(e)}
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
        {/* Render context menu if visible */}
        {isContextMenuVisible && (
          <ContextMenu
            options={contextMenuOptions}
            cordinates={contextMenuCordinates}
            contextMenu={isContextMenuVisible}
            setContextMenu={setIsContextMenuVisible}
          />
        )}
        {/* Render capture photo component if visible */}
        {showCapturePhoto && (
          <CapturePhoto
            setImage={setImage}
            hideCapturePhoto={setShowCapturePhoto}  // Fixed typo here
          />
        )}
        {/* Render photo library if visible */}
        {showPhotoLibrary && (
          <PhotoLibrary
            setImage={setImage}
            hidePhotoLibrary={setShowPhotoLibrary}  // Fixed typo here
          />
        )}
        {/* Render photo picker if grabPhoto is true */}
        {grabPhoto && <PhotoPicker onChange={photoPickerChange} />}
      </div>
    </>
  );
}

export default Avatar;
