import { useEffect, useRef } from "react";

export default function GalleryCatalogue({ data }) {
  const galleryRef = useRef();

  useEffect(() => {
    const el = galleryRef.current;
    const handleGalleryScroll = (e) => {
      e.preventDefault();
      if (e.deltaY === 0) return;

      const el = galleryRef.current;
      let scrollDirection = 1;
      if (e.deltaY < 0) scrollDirection = -1;

      el.scrollTo({
        left: el.scrollLeft + e.target.width * scrollDirection,
        behavior: "smooth",
      });
    };

    el.addEventListener("wheel", handleGalleryScroll, { passive: false });

    return () => {
      el.removeEventListener("wheel", handleGalleryScroll);
    };
  }, []);

  return (
    <ul id="eventGallery" ref={galleryRef}>
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
