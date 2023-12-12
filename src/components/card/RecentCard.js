import React from "react";
import authorImage from "../../assets/images/myphoto.png";

import { Link } from "react-router-dom";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function RecentCard(props) {
  return (
    <li>
      <div className="blog-card">
        <figure className="card-banner img-holder">
          <Link to={process.env.REACT_APP_FRONTEND_URL + `/post/${props.id}`}>
            <LazyLoadImage
              src={process.env.REACT_APP_ASSET_URL + `/${props.thumbnail}`}
              effect="blur"
              alt="thumbnail"
              className="img-cover"
              wrapperProps={{ style: { width: "100%" } }}
            />
          </Link>

          <ul className="avatar-list absolute">
            <li className="avatar-item">
              <div className="avatar img-holder">
                <img
                  src={authorImage}
                  width="100"
                  height="100"
                  loading="lazy"
                  alt="Author"
                  className="img-cover"
                />
              </div>
            </li>
          </ul>
        </figure>

        <div className="card-content">
          <h3 className="h5">
            <Link
              to={process.env.REACT_APP_FRONTEND_URL + `/post/${props.id}`}
              className="card-title hover:underline"
            >
              {props.title}
            </Link>
          </h3>
        </div>
      </div>
    </li>
  );
}
