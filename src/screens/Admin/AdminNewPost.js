import React, { useState, useContext } from "react";
import MDEditor from "@uiw/react-md-editor";
import ImageUpload from "../../components/shared/ImageUpload";
import { useHttpClient } from "../../shared/hooks/http-hook";

import { AuthContext } from "../../shared/context/auth-context";

import { useNavigate } from "react-router-dom";

import "./AdminPost.css";
import Post from "../../components/shared/Post";
import MessageModal from "../../components/shared/MessageModal";
import ErrorModal from "../../components/shared/ErrorModal";

const mkdStr = `
## Markdown Editor

---

**Hello world!!!**

[![](https://avatars.githubusercontent.com/u/1680273?s=80&v=4)](https://avatars.githubusercontent.com/u/1680273?v=4)

\`\`\`javascript
import React from "react";
import ReactDOM from "react-dom";
import MEDitor from '@uiw/react-md-editor';

\`\`\`
`;

function NewPost() {
  const [isPreview, setIsPreview] = useState(false);
  const [markdown, setMarkdown] = useState(mkdStr);
  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState("");
  const [image, setImage] = useState();
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");
  const [isTech, setIsTech] = useState(true);

  const [confirmCreate, setConfirmCreate] = useState(false);

  const auth = useContext(AuthContext);

  const navigate = useNavigate();

  const { sendRequest, isLoading, error, clearError } = useHttpClient();

  const addTagHandler = (e) => {
    e.preventDefault();
    if (tag === "") return;
    setTags([...tags, tag]);
    setTag("");
  };

  const newPostHandler = () => {
    setIsPreview(true);
  };

  const imageSubmitHandler = (image) => {
    setImage(image);
  };

  const toggleConfirmCreate = () => {
    setConfirmCreate(!confirmCreate);
  };

  const publishHandler = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("intro", intro);
    formData.append("thumbnail", image);
    formData.append("tags", tags);
    formData.append("isTech", isTech);
    formData.append("markdown", markdown);

    const response = await sendRequest(
      process.env.REACT_APP_BACKEND_URL + "/posts/createPost",
      "POST",
      formData,
      {
        Authorization: "Bearer " + auth.token,
      }
    );

    toggleConfirmCreate();

    navigate(`/admin/managePosts`);
  };

  if (isPreview) {
    return (
      <>
        <MessageModal
          mes={"Are you sure to update this post?"}
          show={confirmCreate}
          onClear={toggleConfirmCreate}
          handler={publishHandler}
          isLoading={isLoading}
        />
        <ErrorModal error={error} onClear={clearError} />
        <div>
          <Post
            post={{
              title,
              intro,
              uploadImage: image,
              tags,
              markdown,
              isAdmin: true,
            }}
          />
          <div className="d-flex justify-content-evenly mt-5">
            <button className="btn" onClick={(e) => setIsPreview(false)}>
              Return
            </button>
            <button className="btn" onClick={toggleConfirmCreate}>
              Publish
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="container px-4 bg-body-tertiary py-5">
      <h1 className="mb-4">Title of Post</h1>
      <input
        type="text"
        placeholder="Title of Post"
        className="input-box mb-4"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <h1 className="mb-4">Introduction</h1>
      <textarea
        rows="5"
        placeholder="Introduction"
        className="border mb-4 introduction-textarea"
        onChange={(e) => setIntro(e.target.value)}
        value={intro}
      />
      <h1 className="mb-4">Post Type</h1>
      <div className="d-flex mb-4">
        <div
          className={`post-type mx-4 ${isTech && "post-type-active"}`}
          onClick={(e) => setIsTech(true)}
        >
          Tech
        </div>
        <div
          className={`post-type mx-4 ${!isTech && "post-type-active"}`}
          onClick={(e) => setIsTech(false)}
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
        <span onClick={addTagHandler} className="add-icon ">
          +
        </span>
      </div>
      <div className="d-flex mb-4 position-relative">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="post-tag m-1"
            onClick={(e) => {
              setTags(tags.filter((t) => t !== tag));
            }}
          >
            {tag}
          </div>
        ))}
      </div>
      <h1 className="mb-4">Thumbnail</h1>
      <ImageUpload imageSubmit={imageSubmitHandler} />

      <h1 className="mb-4">Content</h1>
      <div className="mb-5">
        <MDEditor height={500} value={markdown} onChange={setMarkdown} />
      </div>

      <div className="d-flex justify-content-center">
        <button className="btn" onClick={newPostHandler}>
          Preview
        </button>
      </div>
    </div>
  );
}

export default NewPost;
