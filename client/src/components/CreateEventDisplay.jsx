import "./createEvent.css";

export default function CreateEventDisplay({ setShowEvent }) {
  return (
    <div id="createEventDisplay">
      <button className="closeDisplay" onClick={() => setShowEvent(false)}>
        X
      </button>
      <div className="createContainer">
        <form action="">
          <label htmlFor="">
            <p>Name</p>
            <input type="text" />
          </label>
          <label htmlFor="">
            <p>Date</p>
            <input type="text" />
          </label>
          <label htmlFor="">
            <p>Description</p>
            <input type="text" />
          </label>
          <label htmlFor="">
            <p>Images</p>
            <input type="file" />
          </label>
        </form>
      </div>
      <p>EVENT DISPLAY</p>
    </div>
  );
}
