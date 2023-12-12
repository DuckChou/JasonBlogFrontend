import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { generateDate } from "../../shared/utils/getDate";

import { AuthContext } from "../../shared/context/auth-context";

import { useHttpClient } from "../../shared/hooks/http-hook";

import MessageModal from "../../components/shared/MessageModal";
import Table from "react-bootstrap/Table";
import ErrorModal from "../../components/shared/ErrorModal";
import MySpinner from "../../components/layout/MySpinner";
import "./AdminTable.css";

export default function AdminManagePosts() {
  const [LifePosts, setLifePosts] = useState([]);
  const [TechPosts, setTechPosts] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [deletePostId, setDeletePostId] = useState();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const auth = useContext(AuthContext);

  const navigate = useNavigate();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/posts"
        );

        setTechPosts(responseData.posts.filter((post) => post.isTech));
        setLifePosts(responseData.posts.filter((post) => !post.isTech));
      } catch (err) {}
    };
    fetchPosts();
  }, [sendRequest, trigger]);

  const deletePostHandler = async (postId) => {
    console.log(postId);

    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/posts/${postId}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      setTrigger(!trigger);
    } catch (err) {}
  };

  const toggleConfirmDelete = () => {
    setConfirmDelete(!confirmDelete);
  };

  const updatePostHandler = (postId) => {
    navigate(`/admin/updatePost/${postId}`);
  };

  return (
    <>
      <div className="container">
        <h1>Tech Posts</h1>
        {isLoading && <MySpinner />}
        {!isLoading && (
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Create Time</th>
                <th>Reviews</th>
                <th>Modify</th>
              </tr>
            </thead>
            <tbody>
              {TechPosts.map((post, index) => (
                <tr key={post.id}>
                  <td className="align-middle">{index}</td>
                  <td className="align-middle">{post.title}</td>
                  <td className="align-middle">{generateDate(post.date)}</td>
                  <td className="align-middle">{post.reviews.length}</td>
                  <td className="align-middle">
                    <div className="d-flex flex-wrap">
                      <button
                        className="post-btn"
                        onClick={() => {
                          updatePostHandler(post.id);
                        }}
                      >
                        Modify
                      </button>
                      <button
                        className="post-delete-btn"
                        onClick={() => {
                          setDeletePostId(post.id);
                          setConfirmDelete(true);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        <h1 className="mt-5">Life Posts</h1>
        {isLoading && <MySpinner />}
        {!isLoading && (
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Create Time</th>
                <th>Reviews</th>
                <th>Modify</th>
              </tr>
            </thead>
            <tbody>
              {LifePosts.map((post, index) => (
                <tr key={post.id}>
                  <td className="align-middle">{index}</td>
                  <td className="align-middle">{post.title}</td>
                  <td className="align-middle">{generateDate(post.date)}</td>
                  <td className="align-middle">{post.reviews.length}</td>
                  <td className="align-middle">
                    <div className="d-flex flex-wrap">
                      <button
                        className="post-btn"
                        onClick={() => {
                          updatePostHandler(post.id);
                        }}
                      >
                        Modify
                      </button>
                      <button
                        className="post-delete-btn"
                        onClick={() => {
                          setDeletePostId(post.id);
                          setConfirmDelete(true);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
      <MessageModal
        mes={"Are you sure to delete this post?"}
        show={confirmDelete}
        onClear={toggleConfirmDelete}
        handler={() => {
          deletePostHandler(deletePostId);
          toggleConfirmDelete();
        }}
        isLoading={isLoading}
      />
      <ErrorModal error={error} onClear={clearError} />
    </>
  );
}
