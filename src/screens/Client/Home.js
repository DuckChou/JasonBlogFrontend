import React, { useEffect, useState } from "react";

import { useHttpClient } from "../../shared/hooks/http-hook";

import linkedInImage from "../../assets/images/linkedin.png";
import githubImage from "../../assets/images/github.png";
import Card from "../../components/card/Card";
import RecentCard from "../../components/card/RecentCard";

import MySpinner from "../../components/layout/MySpinner";

import Preloader from "../../components/banner/Preloader";
import { Link } from "react-router-dom";
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
  const [techPosts, setTechPosts] = useState([]);
  const [lifePosts, setLifePosts] = useState([]);
  const [posts, setPosts] = useState([]);

  const { sendRequest, isLoading, error, clearError } = useHttpClient();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/posts/"
        );
        setTechPosts(
          responseData.posts.filter((post) => post.isTech).slice(0, 4)
        );
        setLifePosts(
          responseData.posts.filter((post) => !post.isTech).slice(0, 3)
        );
        setPosts(responseData.posts.slice(0, 6));
      } catch (err) {}
    };
    fetchPosts();
  }, [sendRequest]);

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
          <div className="h4 hero-title t-center">
            <p>
              In this blog, I will share my experience and thoughts on software.
              And also share my life and job seeking journey in Canberra.
            </p>
          </div>
          <div className="h4 t-center">
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
          {isLoading && <MySpinner />}
          {!isLoading && (
            <ul className="has-scrollbar pt-5">
              {techPosts.length > 0 &&
                techPosts.map((post) => (
                  <li className="scrollbar-item" key={post.id}>
                    <Card
                      thumbnail={post.thumbnail}
                      title={post.title}
                      intro={post.intro}
                      tags={post.tags}
                      date={post.date}
                      viewCount={post.views}
                      id={post.id}
                    />
                  </li>
                ))}
            </ul>
          )}
        </div>
        <div className="btn-container">
          <Link to="/postGallery/tech">
            <button className="btn">See more Tech Posts</button>
          </Link>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <p className="section-subtitle">
            <strong className="strong">Life Sharing Posts</strong>
          </p>
          {isLoading && <MySpinner />}
          {!isLoading && (
            <ul className="has-scrollbar pt-5">
              {lifePosts.length > 0 &&
                lifePosts.map((post) => (
                  <li className="scrollbar-item" key={post.id}>
                    <Card
                      thumbnail={post.thumbnail}
                      title={post.title}
                      intro={post.intro}
                      tags={post.tags}
                      date={post.date}
                      viewCount={post.views}
                      id={post.id}
                    />
                  </li>
                ))}
            </ul>
          )}
        </div>
        <div className="btn-container">
          <Link to="/postGallery/life">
            <button className="btn">See more Life Sharing Posts</button>
          </Link>
        </div>
      </section>
      <section className="section recommended" aria-label="recommended post">
        <div className="container">
          <p className="section-subtitle">
            <strong className="strong">Recent & Hot</strong>
          </p>
          {isLoading && <MySpinner />}
          {!isLoading && (
            <ul className="grid-list">
              {posts.length > 0 &&
                posts.map((post) => (
                  <RecentCard
                    key={post.id}
                    thumbnail={post.thumbnail}
                    title={post.title}
                    id={post.id}
                  />
                ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
