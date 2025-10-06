import { useState } from "react";
import useMutation from "../api/useMutation";
import UploadWidget from "./UploadWidget";
import SelectLocation from "./SelectLocation";
import "./createEvent.css";

export default function CreateEventDisplay({ setShowEvent }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [error, setError] = useState(null);

  const createEvent = useMutation("POST", "/events/", ["events"]);
  const updateImages = useMutation("PATCH", "/events/images", ["events"]);

  const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`;
  async function uploadImages(eventId) {
    try {
      const fileArray = Array.from(selectedFiles);
      const results = fileArray.map(async (file) => {
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
      const imageUrls = await Promise.all(results);
      await updateImages.mutate({ imageUrls, eventId });
      updateImages.data && console.log("Event Created Succesfully");
    } catch (err) {
      console.error(err);
    }
  }

  async function handleCreateEvent(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const event = {
      name: formData.get("name"),
      date: formData.get("date"),
      description: formData.get("description"),
      location: selectedLocation,
    };
    try {
      setError(null);

      for (const key in event) {
        if (!event[key]) throw new Error(`The ${key} is missing from the event details.`);
      }
      await createEvent.mutate(event);
      console.log(createEvent.data);
      await uploadImages(createEvent.data.id);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  }

  return (
    <div id="createEventDisplay">
      <div className="createContainer">
        <button className="closeDisplay" onClick={() => setShowEvent(false)}>
          <img src={"close-icon.svg"} />
        </button>
        <h3>Create Event</h3>
        <form onSubmit={handleCreateEvent}>
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
            <SelectLocation
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
            />
          </label>
          <label>
            <span>Images</span>
            <UploadWidget selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />
          </label>
          <button type="submit">Submit</button>
          {error && <output>{error}</output>}
        </form>
      </div>
    </div>
  );
}
