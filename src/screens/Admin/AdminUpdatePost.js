import { useParams, useNavigate } from "react-router-dom";

import React, { useState, useEffect, useContext, useCallback } from "react";

import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import Post from "../../components/shared/Post";
import ImageUpload from "../../components/shared/ImageUpload";
import MDEditor from "@uiw/react-md-editor";
import MySpinner from "../../components/layout/MySpinner";

import "./AdminPost.css";
import MessageModal from "../../components/shared/MessageModal";
import ErrorModal from "../../components/shared/ErrorModal";

export default function PostScreen() {
  const { sendRequest, isLoading, error, clearError } = useHttpClient();
  const [post, setPost] = useState({});
  const postId = useParams().postId;
  const [isPreview, setIsPreview] = useState(false);
  const [image, setImage] = useState(null);

  const [confirmUpdate, setConfirmUpdate] = useState(false);

  const navigate = useNavigate();

  const auth = useContext(AuthContext);

  const [tag, setTag] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/posts/${postId}`
        );

        setPost(responseData.post);
      } catch (err) {}
    };
    fetchPost();
  }, [sendRequest, postId]);

  const updatePostHandler = () => {
    setIsPreview(true);
  };

  const toggleConfirmUpdate = () => {
    setConfirmUpdate(!confirmUpdate);
  };

  const publishHandler = async () => {
    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("intro", post.intro);
    if (image) {
      formData.append("thumbnail", image);
    }
    formData.append("tags", post.tags);
    formData.append("isTech", post.isTech);
    formData.append("markdown", post.markdown);

    const response = await sendRequest(
      process.env.REACT_APP_BACKEND_URL + "/posts/updatePost/" + postId,
      "PATCH",
      formData,
      {
        Authorization: "Bearer " + auth.token,
      }
    );

    navigate(`/admin/managePosts`);
  };

  const imageChangeHandler = useCallback((image) => {
    setImage(image);
  }, []);

  if (isPreview) {
    return (
      <>
        <MessageModal
          mes={"Are you sure to update this post?"}
          show={confirmUpdate}
          onClear={toggleConfirmUpdate}
          handler={() => {
            publishHandler();
            toggleConfirmUpdate();
          }}
          isLoading={isLoading}
        />
        <ErrorModal error={error} onClear={clearError} />
        <div>
          <Post
            post={{
              ...post,
              thumbnail: !image ? post.thumbnail : null,
              uploadImage: image ? image : null,

              isAdmin: true,
            }}
          />
          <div className="d-flex justify-content-evenly mt-5">
            <button className="btn" onClick={(e) => setIsPreview(false)}>
              Return
            </button>
            <button className="btn" onClick={toggleConfirmUpdate}>
              Publish
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="container px-4 bg-body-tertiary py-5">
      <h1 className="mb-5">Updated the Post</h1>
      {isLoading && <MySpinner />}
      {!isLoading && (
        <>
          <h1 className="mb-4">Title of Post</h1>
          <input
            type="text"
            placeholder="Title of Post"
            className="input-box mb-4"
            onChange={(e) => {
              setPost({ ...post, title: e.target.value });
            }}
            value={post.title || ""}
          />
          <h1 className="mb-4">Introduction</h1>
          <textarea
            rows="5"
            placeholder="Introduction"
            className="border mb-4 introduction-textarea"
            onChange={(e) => {
              setPost({ ...post, intro: e.target.value });
            }}
            value={post.intro || ""}
          />
          <h1 className="mb-4">Post Type</h1>
          <div className="d-flex mb-4">
            <div
              className={`post-type mx-4 ${post.isTech && "post-type-active"}`}
              onClick={(e) => {
                setPost({ ...post, isTech: true });
              }}
            >
              Tech
            </div>
            <div
              className={`post-type mx-4 ${!post.isTech && "post-type-active"}`}
              onClick={(e) => {
                setPost({ ...post, isTech: false });
              }}
            >
              Non-Tech
            </div>
          </div>

          <h1 className="mb-4">Tags</h1>
          <div className="position-relative">
            <input
              value={tag}
              type="text"
              placeholder="Tags"
              className="input-box mb-4"
              onChange={(e) => setTag(e.target.value)}
            />
            <span
              onClick={() => {
                if (tag === "") return;
                setPost({ ...post, tags: [...post.tags, tag] });
                setTag("");
              }}
              className="add-icon "
            >
              +
            </span>
          </div>
          <div className="d-flex mb-4 position-relative">
            {post.tags &&
              post.tags.map((tag, index) => (
                <div
                  key={index}
                  className="post-tag m-1"
                  onClick={(e) => {
                    setPost({
                      ...post,
                      tags: post.tags.filter((t) => t !== tag),
                    });
                  }}
                >
                  {tag}
                </div>
              ))}
          </div>
          <h1 className="mb-4">Thumbnail</h1>
          <ImageUpload
            imageSubmit={imageChangeHandler}
            image={post.thumbnail}
            uploadImage={image}
          />

          <h1 className="mb-4">Content</h1>
          <div className="mb-5">
            <MDEditor
              height={500}
              value={post.markdown || ""}
              onChange={(e) => {
                setPost({ ...post, markdown: e });
              }}
            />
          </div>

          <div className="d-flex justify-content-center">
            <button className="btn" onClick={updatePostHandler}>
              Preview
            </button>
          </div>
        </>
      )}
    </div>
  );
}
