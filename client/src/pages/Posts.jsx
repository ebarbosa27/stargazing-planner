import useQuery from "../api/useQuery";
import "./posts.css";

export default function Posts() {
  const { data, loading, error } = useQuery("/news", "news");

  if (loading) return <div>Loading. . . </div>;
  if (error) return <div>Error Occured </div>;

  return (
    <div id="postsPage">
      <h2>News </h2>
      <ol>
        {data?.results
          ? data?.results.map((newsEvent) => {
              const publishDate = new Date(newsEvent.published_at);
              return (
                <li
                  key={newsEvent.id}
                  onClick={() => {
                    window.location.href = newsEvent.url;
                  }}
                >
                  <div className="articleImage">
                    <img src={newsEvent.image_url} alt="article image" />
                  </div>
                  <div className="articleDetails">
                    <div className="articleTitle">
                      <h3>{newsEvent.title}</h3>
                      <div>{publishDate.toLocaleDateString()}</div>
                      <div>
                        By:
                        {newsEvent.authors.map((author, idx) => (
                          <span key={"author-" + idx}>{author.name}</span>
                        ))}
                      </div>
                    </div>
                    <p>{newsEvent.summary}</p>
                  </div>
                </li>
              );
            })
          : ""}
      </ol>
    </div>
  );
}
