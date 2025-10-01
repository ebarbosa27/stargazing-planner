import { useEffect, useRef } from "react";

export default function EventCatalogue({ events, componentName }) {
  const catalogueRef = useRef();

  useEffect(() => {
    const el = catalogueRef.current;
    const handleWheelScroll = (e) => {
      e.preventDefault();
      if (e.deltaY === 0) return;

      let scrollDirection = 1;
      if (e.deltaY < 0) scrollDirection = -1;

      el.scrollTo({
        left: el.scrollLeft + e.target.width * scrollDirection,
        behavior: "smooth",
      });
    };

    el.addEventListener("wheel", handleWheelScroll, { passive: false });

    return () => {
      el.removeEventListener("wheel", handleWheelScroll);
    };
  }, []);

  return (
    <ul className="catalogueRow" ref={catalogueRef}>
      {events
        ? events.map((event) => {
            return (
              <li key={event.id}>
                <div className="imageContainer">
                  <img src={event.image_urls[0]} alt="Event" />
                </div>
                <p>{event.name}</p>
              </li>
            );
          })
        : `No ${componentName} events found`}
    </ul>
  );
}
