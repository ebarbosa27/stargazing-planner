import useQuery from "../api/useQuery";

export default function Posts() {
  const { data, loading, error } = useQuery("/news", "news");

  if (loading) return <div>Loading. . . </div>;
  if (error) return <div>Error Occured </div>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2>News Page</h2>
      <ol>
        {data?.results
          ? data?.results.map((newsEvent) => {
              return (
                <li key={newsEvent.id}>
                  <div style={{ width: "300px", aspectRatio: "1" }}>
                    <img
                      src={newsEvent.image_url}
                      alt=""
                      style={{ width: "300px", aspectRatio: "1" }}
                    />
                  </div>
                  <h3>{newsEvent.title}</h3>
                  <p>{newsEvent.summary}</p>
                </li>
              );
            })
          : ""}
      </ol>
    </div>
  );
}
