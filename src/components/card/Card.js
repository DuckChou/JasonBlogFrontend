import feature1 from "../../assets/images/featured.jpg";
import author1 from "../../assets/images/author.jpg";

export default function Card({
  thumbnail,
  title,
  description,
  category,
  date,
  author,
  viewCount,
}) {
  return (
    <>
      <div className="blog-card">
        <figure className="card-banner img-holder">
          <img
            src={feature1}
            width="500px"
            height="600px"
            loading="lazy"
            alt="New technology is not good or evil in and of itself"
            className="img-cover"
          />

          <ul className="avatar-list absolute">
            <li className="avatar-item">
              <div className="avatar img-holder">
                <img
                  src={author1}
                  width="100px"
                  height="100px"
                  loading="lazy"
                  alt="Author"
                  className="img-cover"
                />
              </div>
            </li>
          </ul>
          <div href="#" className="view-tag">
            100 views
          </div>
        </figure>

        <div className="card-content">
          <ul className="card-meta-list">
            <li>
              <div href="#" className="card-tag">
                Design
              </div>
            </li>

            <li>
              <div href="#" className="card-tag">
                Idea
              </div>
            </li>

            <li>
              <div href="#" className="card-tag">
                Review
              </div>
            </li>
          </ul>

          <h3 className="h4">
            <a href="#" className="card-title hover:underline">
              New technology is not good or evil in and of itself
            </a>
          </h3>

          <p className="card-text">
            Vestibulum vehicula dui venenatis neque tempor, accumsan iaculis
            sapien ornare. Sed at ante porta, ullamcorper massa eu, ullamcorper
            sapien. Donec pretium tortor augue. Integer egestas ut tellus sed
            pretium. Nullam tristique augue ut mattis vulputate. Duis et lorem
            in odio ultricies porttitor.
          </p>
        </div>
      </div>
    </>
  );
}
