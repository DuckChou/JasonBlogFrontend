import Preloader from "../components/banner/Preloader";
import { useParams } from "react-router-dom";
import featuredImage from "../assets/images/featured.jpg";
import authorImage from "../assets/images/author.jpg";

function PostGalleryScreen() {
  const { classId } = useParams();

  return (
    <>
      <Preloader
        words={classId === "1" ? ["Tech Posts"] : ["Life Sharing Posts"]}
      />
      <section className="section recent" aria-label="recent post">
        <div className="container">
          <div className="title-wrapper">
            <h2 className="h2 section-title mb-5">
              See posts about{" "}
              <strong className="strong">
                {classId === "1" ? "tech lately" : "life sharing"}
              </strong>
            </h2>
          </div>

          <ul className="grid-list">
            <li>
              <div className="blog-card">
                <figure className="card-banner img-holder">
                  <img
                    src={featuredImage}
                    width="550"
                    height="660"
                    loading="lazy"
                    alt="Creating is a privilege but it’s also a gift"
                    className="img-cover"
                  />

                  <ul className="avatar-list absolute">
                    <li className="avatar-item">
                      <a href="#" className="avatar img-holder">
                        <img
                          src={authorImage}
                          width="100"
                          height="100"
                          loading="lazy"
                          alt="Author"
                          className="img-cover"
                        />
                      </a>
                    </li>
                  </ul>
                </figure>

                <div className="card-content">
                  <ul className="card-meta-list">
                    <li>
                      <a href="#" className="card-tag">
                        Lifestyle
                      </a>
                    </li>

                    <li>
                      <a href="#" className="card-tag">
                        People
                      </a>
                    </li>

                    <li>
                      <a href="#" className="card-tag">
                        Review
                      </a>
                    </li>
                  </ul>

                  <h3 className="h4">
                    <a href="#" className="card-title hover:underline">
                      Creating is a privilege but it’s also a gift
                    </a>
                  </h3>

                  <p className="card-text">
                    Nullam vel lectus vel velit pellentesque dignissim nec id
                    magna. Cras molestie ornare quam at semper. Proin a ipsum
                    ex. Curabitur eu venenatis justo. Nullam felis augue,
                    imperdiet at sodales a, sollicitudin nec risus.
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="blog-card">
                <figure className="card-banner img-holder">
                  <img
                    src={featuredImage}
                    width="550"
                    height="660"
                    loading="lazy"
                    alt="Creating is a privilege but it’s also a gift"
                    className="img-cover"
                  />

                  <ul className="avatar-list absolute">
                    <li className="avatar-item">
                      <a href="#" className="avatar img-holder">
                        <img
                          src={authorImage}
                          width="100"
                          height="100"
                          loading="lazy"
                          alt="Author"
                          className="img-cover"
                        />
                      </a>
                    </li>
                  </ul>
                </figure>

                <div className="card-content">
                  <ul className="card-meta-list">
                    <li>
                      <a href="#" className="card-tag">
                        Lifestyle
                      </a>
                    </li>

                    <li>
                      <a href="#" className="card-tag">
                        People
                      </a>
                    </li>

                    <li>
                      <a href="#" className="card-tag">
                        Review
                      </a>
                    </li>
                  </ul>

                  <h3 className="h4">
                    <a href="#" className="card-title hover:underline">
                      Creating is a privilege but it’s also a gift
                    </a>
                  </h3>

                  <p className="card-text">
                    Nullam vel lectus vel velit pellentesque dignissim nec id
                    magna. Cras molestie ornare quam at semper. Proin a ipsum
                    ex. Curabitur eu venenatis justo. Nullam felis augue,
                    imperdiet at sodales a, sollicitudin nec risus.
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="blog-card">
                <figure className="card-banner img-holder">
                  <img
                    src={featuredImage}
                    width="550"
                    height="660"
                    loading="lazy"
                    alt="Creating is a privilege but it’s also a gift"
                    className="img-cover"
                  />

                  <ul className="avatar-list absolute">
                    <li className="avatar-item">
                      <a href="#" className="avatar img-holder">
                        <img
                          src={authorImage}
                          width="100"
                          height="100"
                          loading="lazy"
                          alt="Author"
                          className="img-cover"
                        />
                      </a>
                    </li>
                  </ul>
                </figure>

                <div className="card-content">
                  <ul className="card-meta-list">
                    <li>
                      <a href="#" className="card-tag">
                        Lifestyle
                      </a>
                    </li>

                    <li>
                      <a href="#" className="card-tag">
                        People
                      </a>
                    </li>

                    <li>
                      <a href="#" className="card-tag">
                        Review
                      </a>
                    </li>
                  </ul>

                  <h3 className="h4">
                    <a href="#" className="card-title hover:underline">
                      Creating is a privilege but it’s also a gift
                    </a>
                  </h3>

                  <p className="card-text">
                    Nullam vel lectus vel velit pellentesque dignissim nec id
                    magna. Cras molestie ornare quam at semper. Proin a ipsum
                    ex. Curabitur eu venenatis justo. Nullam felis augue,
                    imperdiet at sodales a, sollicitudin nec risus.
                  </p>
                </div>
              </div>
            </li>
          </ul>
          <div className="d-flex justify-content-center my-5">
            <button className="btn">Load more</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default PostGalleryScreen;
