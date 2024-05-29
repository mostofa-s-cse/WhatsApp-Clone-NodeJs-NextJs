import React, { useEffect, useRef } from "react";

function ContextMenu({ options, cordinates, ContextMenu, setContextMenu }) {
  const ContextMenuRef = useRef(null);

  // Effect to handle clicks outside the context menu
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.id !== "context-opener") {
        if (ContextMenuRef.current && !ContextMenuRef.current.contains(event.target)) {
          setContextMenu(false); // Close the context menu if click is outside
        }
      }
    };

    // Add event listener for clicks
    document.addEventListener("click", handleOutsideClick);
    return () => {
      // Cleanup event listener on component unmount
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [setContextMenu]);

  // Handle click on context menu item
  const handleClick = (e, callback) => {
    e.stopPropagation(); // Prevent click event from propagating
    setContextMenu(false); // Close the context menu
    callback(); // Execute the callback function for the menu item
  };

  return (
    <div
      className={`bg-dropdown-background fixed py-2 z-[100] shadow-xl`}
      ref={ContextMenuRef}
      style={{
        top: cordinates.y, // Set position based on coordinates
        left: cordinates.x,
      }}
    >
      <ul>
        {options.map(({ name, callback }) => (
          <li
            key={name}
            onClick={(e) => handleClick(e, callback)} // Handle click on menu item
            className="px-5 py-2 cursor-pointer hover:bg-background-default-hover"
          >
            <span className="text-white">{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContextMenu;
