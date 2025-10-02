import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";

export default function EventCatalogue({ events, componentName }) {
  const catalogueRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const el = catalogueRef.current;
    const handleWheelScroll = (e) => {
      e.preventDefault();
      if (e.deltaY === 0) return;

      const scrollDistance = el.children[0].clientWidth;

      let scrollDirection = 1;
      if (e.deltaY < 0) scrollDirection = -1;

      el.scrollTo({
        left: el.scrollLeft + scrollDistance * scrollDirection,
        behavior: "smooth",
      });
    };

    el.addEventListener("wheel", handleWheelScroll, { passive: false });

    return () => {
      el.removeEventListener("wheel", handleWheelScroll);
    };
  }, []);

  return (
    <div className="catalogueContainer">
      <div>
        <h3>{componentName}</h3>
      </div>
      <ul className="catalogueRow" ref={catalogueRef}>
        {events ? (
          events.map((event) => {
            return (
              <li key={event.id} onClick={() => navigate(`/events/${event.id}`)}>
                <div className="imageContainer">
                  <img src={event.image_urls[0]} alt="Event" />
                </div>
                <p>{event.name}</p>
              </li>
            );
          })
        ) : (
          <p>`No ${componentName} events found`</p>
        )}
      </ul>
    </div>
  );
}
