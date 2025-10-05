import React, { useEffect, useRef } from "react";

const UploadWidget = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "YOUR_CLOUD_NAME", // Replace with your Cloudinary cloud name
        uploadPreset: "YOUR_UPLOAD_PRESET", // Replace with your unsigned upload preset name
        // Add other widget options as needed (e.g., cropping, sources)
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          // Handle successful upload (e.g., save secure_url to your database, display image)
        }
      }
    );
  }, []);

  const openWidget = () => {
    widgetRef.current.open();
  };

  return <button onClick={openWidget}>Upload Image</button>;
};

export default UploadWidget;
