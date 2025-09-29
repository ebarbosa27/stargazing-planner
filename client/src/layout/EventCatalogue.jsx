export default function EventCatalogue({ events, componentName }) {
  return (
    <ul className="catalogueRow">
      {events
        ? events.map((event) => {
            console.log(event);
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
