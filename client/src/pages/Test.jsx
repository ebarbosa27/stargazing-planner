import { useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import UploadWidget from "../components/UploadWidget";

export default function Test() {
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const uploadPreset = "ml_default";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <UploadWidget />
    </div>
  );
}
