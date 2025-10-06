import { useEffect, useState } from "react";

export default function UploadWidget({ selectedFiles, setSelectedFiles }) {
  const [uploadedImages, setUploadedImages] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const imageUrls = [];
      for (let i = 0; i < selectedFiles.length; i++) {
        if (selectedFiles[i].size > 10 ** 7) throw new Error("Image cannot be larger than 10MB");
        imageUrls.push(URL.createObjectURL(selectedFiles[i]));
      }
      setUploadedImages(imageUrls);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  }, [selectedFiles]);

  return (
    <div className="uploadWidget">
      <input
        name="image"
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => {
          setSelectedFiles(e.target.files);
        }}
      />
      {uploadedImages && (
        <ul className="selectedImages">
          {uploadedImages.map((image, idx) => (
            <li key={`upload-${idx}`}>
              <img src={image} alt="image" />
            </li>
          ))}
          <li /> {/* last item meant for styling  */}
        </ul>
      )}
      {error && <output>{error}</output>}
    </div>
  );
}
