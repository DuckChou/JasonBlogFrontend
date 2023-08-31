import linkedInImage from "../assets/images/linkedin.png";
import githubImage from "../assets/images/github.png";
import Card from "../components/card/Card";
import recomImage from "../assets/images/recommended-1.jpg";
import authorImage from "../assets/images/author.jpg";
import Preloader from "../components/banner/Preloader";
const words = [
  "Hello",
  "Bonjour",
  "Ciao",
  "Olà",
  "やあ",
  "Hallå",
  "Guten tag",
  "你好",
];
export default function Home() {
  return (
    <>
      <Preloader words={words} />
      <section className="section hero">
        <div className="container">
          <div className="h2 hero-title t-center">
            <strong className="strong">Welcome to my blog 😊 </strong>
            I'm Jason Zhou, a software developer currently living in Canberra,
            Australia 🇦🇺.
          </div>
          <div className="h5 hero-title t-center">
            In this blog, I will share my experience and thoughts on software.
            And also share my life and job seeking journey in Canberra.
          </div>
          <div className="h5 t-center">
            Welcome to leave your comments and share your thoughts with me.
          </div>
          <div className="icon-container">
            <a href="https://www.linkedin.com/in/keren-zhou-040325267/">
              <img src={linkedInImage} alt="linkedIn img" className="icon" />
            </a>
            <a href="https://github.com/DuckChou?tab=repositories">
              <img src={githubImage} alt="github img" className="icon" />
            </a>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <p className="section-subtitle">
            Get started with my <strong className="strong">Tech Posts</strong>
          </p>
          <ul className="has-scrollbar">
            <li className="scrollbar-item">
              <Card />
            </li>
            <li className="scrollbar-item">
              <Card />
            </li>
            {/* <li className="scrollbar-item">
              <Card />
            </li>
            <li className="scrollbar-item">
              <Card />
            </li> */}
          </ul>
        </div>
        <div className="btn-container">
          <button className="btn">See more Tech Posts</button>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <p className="section-subtitle">
            <strong className="strong">Life Sharing Posts</strong>
          </p>
          <ul className="has-scrollbar">
            <li className="scrollbar-item">
              <Card />
            </li>
            <li className="scrollbar-item">
              <Card />
            </li>
            {/* <li className="scrollbar-item">
              <Card />
            </li>
            <li className="scrollbar-item">
              <Card />
            </li> */}
          </ul>
        </div>
        <div className="btn-container">
          <button className="btn">See more Life Sharing Posts</button>
        </div>
      </section>
      <section className="section recommended" aria-label="recommended post">
        <div className="container">
          <p className="section-subtitle">
            <strong className="strong">Recent & Hot</strong>
          </p>

          <ul className="grid-list">
            <li>
              <div className="blog-card">
                <figure className="card-banner img-holder">
                  <img
                    src={recomImage}
                    width="300"
                    height="360"
                    loading="lazy"
                    alt="The trick to getting more done is to have the freedom to roam around "
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
                  <h3 className="h5">
                    <a href="#" className="card-title hover:underline">
                      The trick to getting more done is to have the freedom to
                      roam around
                    </a>
                  </h3>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
