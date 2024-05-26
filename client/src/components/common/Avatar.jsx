import Image from "next/image";
import React, { useState } from "react";
import { FaCamera } from "react-icons/fa6";

function Avatar({ type, image, setImage }) {
  const [hover, setHover] = useState(false);
  const [isContextMenuVisible , setIsContextMenuVisible ] = useState(false)
  const [contextMenuCordinates, setcontextMenuCordinates] = useState({
    x:0,
    y:0,
  })
  const showContextMenu = (e) => {
    e.preventDefault();
    setcontextMenuCordinates({x: e.pageX, Y: e.pageY});
    setIsContextMenuVisible(true);
  }
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
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <div className={`z-10 bg-photopicker-overlay-background h-60 w-60 absolute top-0 left-0 flex items-center rounded-full justify-center flex-col text-center gap-2
            ${hover?"visible":"hidden"}
            `}
            id="context-opener"
            onClick={(e)=> showContextMenu(e)}
            >
              <FaCamera className="text-2xl text-white" id="context-opener" 
              onClick={(e)=>showContextMenu(e)}
              />
              <span onClick={(e)=>showContextMenu(e)}>Change <br/> Profile Photo</span>
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
      </div>
    </>
  );
}

export default Avatar;
