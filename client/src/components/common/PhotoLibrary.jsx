import Image from "next/image";
import React from "react";
import { IoClose } from "react-icons/io5";

function PhotoLibrary({ setImage, hidePhotoLibrary }) {  // Fixed typo here
  // List of image paths
  const images = [
    "/avatars/1.png",
    "/avatars/2.png",
    "/avatars/3.png",
    "/avatars/4.png",
    "/avatars/5.png",
    "/avatars/6.png",
    "/avatars/7.png",
    "/avatars/8.png",
    "/avatars/9.png",
  ];

  return (
    <div className="fixed top-0 left-0 max-h-[100vh] max-w-[100vw] h-full w-full flex justify-center items-center">
      {/* Container for photo library */}
      <div className="h-max w-max bg-gray-900 gap-6 rounded-lg p-4">
        {/* Close button */}
        <div
          className="pt-2 pe-2 cursor-pointer flex items-end justify-end"
          onClick={() => hidePhotoLibrary(false)}  // Fixed typo here
        >
          <IoClose className="h-8 w-8 cursor-pointer" />
        </div>
        {/* Grid layout for displaying images */}
        <div className="grid grid-cols-3 justify-center items-center gap-16 p-20 w-full">
          {images.map((image, index) => (
            <div
              key={index}  // Added key for list item
              onClick={() => {
                setImage(images[index]);
                hidePhotoLibrary(false);  // Fixed typo here
              }}
            >
              <div className="h-24 w-24 cursor-pointer relative">
                <Image src={image} alt="avatar" fill />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PhotoLibrary;
