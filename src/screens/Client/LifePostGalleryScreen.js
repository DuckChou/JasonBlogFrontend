import React, { useState, useEffect } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";

import MySpinner from "../../components/layout/MySpinner";

import Preloader from "../../components/banner/Preloader";
import Card from "../../components/card/Card";

function LifePostGalleryScreen() {
  const [posts, setPosts] = useState([]);
  const [postNumber, setPostNumber] = useState(3);

  const { sendRequest, isLoading, error, clearError } = useHttpClient();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/posts/"
        );
        setPosts(responseData.posts.filter((post) => !post.isTech));
      } catch (err) {}
    };
    fetchPosts();
  }, [sendRequest]);

  // rebounce function
  let timer;
  const loadMoreHandler = () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      if (postNumber >= posts.length) return;
      setPostNumber(postNumber + 3);
    }, 500);
  };

  return (
    <>
      <Preloader words={["Life Sharing Posts"]} />
      <section className="section recent" aria-label="recent post">
        <div className="container">
          <div className="title-wrapper">
            <h2 className="h2 section-title mb-5">
              See posts about <strong className="strong">life sharing</strong>
            </h2>
          </div>
          {isLoading && <MySpinner />}
          {!isLoading && (
            <ul className="grid-list">
              {posts.map((post, index) => {
                if (index < postNumber) {
                  return (
                    <li key={post.id}>
                      <Card
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        intro={post.intro}
                        thumbnail={post.thumbnail}
                        date={post.date}
                        tags={post.tags}
                        viewCount={post.views}
                      />
                    </li>
                  );
                }
                return null;
              })}
            </ul>
          )}
          <div className="d-flex justify-content-center my-5">
            <button className="btn" onClick={loadMoreHandler}>
              {postNumber < posts.length ? "Load more" : "No more posts"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default LifePostGalleryScreen;
