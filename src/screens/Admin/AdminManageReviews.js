import React, { useState, useEffect, useContext } from "react";

import { generateDate } from "../../shared/utils/getDate";

import { AuthContext } from "../../shared/context/auth-context";

import { useHttpClient } from "../../shared/hooks/http-hook";

import MessageModal from "../../components/shared/MessageModal";
import Table from "react-bootstrap/Table";
import MySpinner from "../../components/layout/MySpinner";
import "./AdminTable.css";

export default function AdminManagePosts() {
  const [reviews, setReviews] = useState([]);

  const auth = useContext(AuthContext);

  const [deleteReviewId, setDeleteReviewId] = useState();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/reviews/",
          "GET"
        );

        setReviews(responseData.reviews);
      } catch (err) {}
    };
    fetchReviews();
  }, [sendRequest, trigger]);

  const toggleConfirmDelete = () => {
    setConfirmDelete(!confirmDelete);
  };

  const deleteReviewHandler = async (reviewId) => {
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/reviews/${reviewId}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      setTrigger(!trigger);
    } catch (err) {}
  };

  return (
    <div className="container">
      <h1>Manage Reviews</h1>
      {isLoading && <MySpinner />}
      {!isLoading && (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Review Content</th>
              <th>Date</th>
              <th>Post title</th>
              <th>creator username</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, index) => (
              <tr key={review.id}>
                <td>{index}</td>
                <td>{generateDate(review.date)}</td>
                <td>{review.content}</td>
                <td>{review.postTitle}</td>
                <td>{review.creatorUserName}</td>
                <td>
                  <button
                    className="post-delete-btn"
                    onClick={() => {
                      setDeleteReviewId(review.id);
                      toggleConfirmDelete();
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <MessageModal
        mes={"Are you sure to delete this post?"}
        show={confirmDelete}
        onClear={toggleConfirmDelete}
        handler={() => {
          deleteReviewHandler(deleteReviewId);
          toggleConfirmDelete();
        }}
      />
    </div>
  );
}
