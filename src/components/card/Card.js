import myphoto from "../../assets/images/myphoto.png"
import { Link } from "react-router-dom";
import { generateDate } from "../../shared/utils/getDate";

import "./Card.css";

export default function Card({
  thumbnail,
  title,
  intro,
  tags,
  date,
  viewCount,
  id,
}) {
  return (
    <>
      <div className="blog-card">
        <figure className="card-banner img-holder">
          <Link to={process.env.REACT_APP_FRONTEND_URL+`/post/${id}`}>
            <img
              src={process.env.REACT_APP_ASSET_URL+`/${thumbnail}`}
              loading="lazy"
              alt="thumbnail"
              className="thumbnail-cover"
            />
          </Link>

          <ul className="avatar-list absolute">
            <li className="avatar-item">
              <div className="avatar img-holder">
                <img
                  src={myphoto}
                  loading="lazy"
                  alt="Author"
                  className="img-cover"
                />
              </div>
            </li>
          </ul>
          <div href="#" className="view-tag">
            {viewCount || "100 views"}
          </div>
        </figure>

        <div className="card-content">
          <div className="mb-3">
            <span className="meta-item">{generateDate(date)}</span>
          </div>
          <ul className="card-meta-list">
            {tags.map((tag, index) => (
              <li key={index}>
                <div href="#" className="card-tag">
                  {tag}
                </div>
              </li>
            ))}
          </ul>

          <h3 className="h4">
            <Link
              to={process.env.REACT_APP_FRONTEND_URL+`/post/${id}`}
              className="card-title hover:underline"
            >
              {title}
            </Link>
          </h3>

          <p className="card-text">{intro}</p>
        </div>
      </div>
    </>
  );
}
