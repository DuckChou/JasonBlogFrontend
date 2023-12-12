import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Preloader from "../../components/banner/Preloader";
import Post from "../../components/shared/Post";
import { useHttpClient } from "../../shared/hooks/http-hook";

export default function PostScreen() {
  const postId = useParams().id;
  const [post, setPost] = useState({});
  const { sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchPostById = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/posts/${postId}`
        );
        setPost(responseData.post);
      } catch (err) {}
    };
    fetchPostById();
    document.title = post.title;
  }, [postId, sendRequest, post.title]);

  return (
    <>
      <Preloader words={["Post"]} />
      <Post post={post} />
    </>
  );
}