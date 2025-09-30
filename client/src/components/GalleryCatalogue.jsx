import { useRef } from "react";

export default function GalleryCatalogue({ data }) {
  const galleryRef = useRef();

  function handleGalleryScroll(e) {
    e.preventDefault();

    const el = galleryRef.current;
    if (e.deltaY === 0) return;

    let scrollDirection = 1;
    if (e.deltaY < 0) scrollDirection = -1;

    el.scrollTo({
      left: el.scrollLeft + e.target.width * scrollDirection,
      behavior: "smooth",
    });
  }
  return (
    <ul id="eventGallery" onWheel={handleGalleryScroll} ref={galleryRef}>
      {data.image_urls.map((eventImage, idx) => {
        return (
          <li key={data.event + "_" + idx}>
            <img src={eventImage} alt="eventImage" />
          </li>
        );
      })}
    </ul>
  );
}
