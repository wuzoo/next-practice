"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import classes from "./image-picker.module.css";

const ImagePicker = ({ label, name }) => {
  const [pickedImage, setPickedImage] = useState();

  const inputRef = useRef();

  const handlePickClick = () => {
    inputRef.current.click();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.control}>
        <div className={classes.preview}>
          {pickedImage ? (
            <Image src={pickedImage} alt="picked image by user" fill />
          ) : (
            <p>No Image picked yet.</p>
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          name={name}
          accept="image/*"
          ref={inputRef}
          onChange={handleFileUpload}
          required
        />
      </div>
      <button
        className={classes.button}
        type="button"
        onClick={handlePickClick}
      >
        Pick an Image
      </button>
    </div>
  );
};

export default ImagePicker;
