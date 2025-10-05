import React, { useEffect, useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from "@cloudinary/react";

export default function UploadWidget() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);

  const cld = new Cloudinary({ cloud: { cloudName: "dvetua8fh" } });

  useEffect(() => {
    if (!selectedFile || true) return;
    console.log(selectedFile);
    const img = cld
      .image(`[Public ID Here]`)
      .format("auto")
      .quality("auto")
      .resize(auto().gravity(autoGravity()).width(500).height(500));
    setImageUpload(img);
  }, [selectedFile]);

  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          setSelectedFile(e.target.files[0]);
        }}
      />
      {imageUpload && <AdvancedImage cldImg={imageUpload} />}
    </>
  );
}
