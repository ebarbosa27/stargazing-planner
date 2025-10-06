import { useState } from "react";
import UploadWidget from "./UploadWidget";
import SelectLocation from "./SelectLocation";
import "./createEvent.css";

export default function CreateEventDisplay({ setShowEvent }) {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`;
  async function uploadImages() {
    try {
      selectedFiles.forEach(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "limited-file");
        formData.append("api_key", import.meta.env.VITE_CLOUD_APIKEY);

        const response = await fetch(url, {
          method: "POST",
          body: formData,
        });
        const responseJSON = await response.json();
        if (responseJSON.error) throw new Error(responseJSON.error.message);
        const imageUrl = responseJSON.url;
        return imageUrl;
      });
    } catch (err) {
      console.error(err);
    }
  }

  async function handleCreateEvent(formData) {
    const event = {
      name: formData.get("name"),
      date: formData.get("date"),
      description: formData.get("description"),
    };
    console.log(event);

    try {
      // await fetch();
      // await uploadImages();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div id="createEventDisplay">
      <div className="createContainer">
        <button className="closeDisplay" onClick={() => setShowEvent(false)}>
          <img src={"close-icon.svg"} />
        </button>
        <h3>Create Event</h3>
        <form action={handleCreateEvent}>
          <label>
            <span>Name</span>
            <input type="text" name="name" />
          </label>
          <label>
            <span>Date</span>
            <input type="datetime-local" name="date" />
          </label>
          <label>
            <span>Description</span>
            <textarea name="description"></textarea>
          </label>
          <label>
            <span>Location</span>
            <SelectLocation />
          </label>
          <label>
            <span>Images</span>
            <UploadWidget selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
