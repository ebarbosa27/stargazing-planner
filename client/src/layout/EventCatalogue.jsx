export default function EventCatalogue({ events, componentName }) {
  return (
    <ul>
      {events
        ? events.map((event) => {
            return <li key={event.id}></li>;
          })
        : `No ${componentName} events found`}
    </ul>
  );
}
