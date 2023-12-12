import React, { useEffect, useState } from "react";

function ImageUpload(props) {
  const [selectedImage, setSelectedImage] = useState();

  useEffect(() => {
    if (props.image) {
      setSelectedImage(process.env.REACT_APP_ASSET_URL+`/${props.image}`);
    }
  }, [props.image]);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }
    props.imageSubmit(event.target.files[0]);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4"
      />
      {selectedImage && (
        <img src={selectedImage} alt="Selected" className="w-50" />
      )}
    </div>
  );
}

export default ImageUpload;
