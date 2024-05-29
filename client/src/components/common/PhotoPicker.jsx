import React from "react";
import ReactDOM from "react-dom";

// PhotoPicker component definition
function PhotoPicker({ onChange }) {
  // Define the file input element
  const component = (
    <input type="file" hidden id="photo-picker" onChange={onChange} />
  );

  // Use React Portal to render the input element into the specified DOM node
  return ReactDOM.createPortal(
    component,
    document.getElementById("photo-picker-element")
  );
}

export default PhotoPicker;
