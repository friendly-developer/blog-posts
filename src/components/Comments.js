import { useState, useEffect } from "react";

import Loader from "./Loader";

import { API_POSTS } from "../constants/APIConstants";

const Comments = ({ id }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const rawComments = await fetch(API_POSTS + id + "/comments");
        const commentsData = await rawComments.json();
        setComments(commentsData);
      } catch (error) {
        setComments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [id]);
  const deleteComment = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };
  const addComment = () => {
    setComments([
      {
        id: comments.length,
        body: newComment,
        name: "You",
        email: "you@domain.com",
      },
      ...comments,
    ]);
    setNewComment("");
  };
  return (
    <div className="ui comments">
      <h3 className="ui dividing header">Comments</h3>
      {loading ? (
        <Loader />
      ) : (
        comments.map((comment) => (
          <div key={comment.id} className="ui segment padding comment">
            <div className="content">
              <div className="author">{comment.name}</div>
              <div className="meta">{comment.email}</div>

              <div className="text">{comment.body}</div>
              <div className="actions">
                <a className="reply" onClick={() => deleteComment(comment.id)}>
                  Delete
                </a>
              </div>
            </div>
          </div>
        ))
      )}
      <form className="ui reply form">
        <div className="field">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
        </div>
        <div
          className="ui blue labeled submit icon button"
          onClick={addComment}
        >
          <i className="icon edit"></i> Add Comment
        </div>
      </form>
    </div>
  );
};

export default Comments;
