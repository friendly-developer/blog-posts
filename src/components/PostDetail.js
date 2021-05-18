import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { API_POSTS } from "../constants/APIConstants";
import Comments from "./Comments";
import Loader from "./Loader";
const PostDetail = () => {
  const [post, setPost] = useState({});
  const [user, setUser] = useState("");
  const userObj = useContext(UserContext);
  const { body = "", title, userId, id } = post;
  const { id: postId } = useParams();
  useEffect(() => {
    if (!userObj.userData[userId]) {
      userObj.setUserId(userId);
    } else {
      setUser(userObj.userData[userId].name);
    }
  }, [userObj.userData, user]);

  useEffect(() => {
    const fetchPost = async () => {
      const rawData = await fetch(API_POSTS + postId);
      const postData = await rawData.json();
      setPost(postData);
      setUser("Loading...");
    };
    if (!Object.keys(post).length) {
      fetchPost();
    }
  }, []);

  if (!Object.keys(post).length) return <Loader />;
  return (
    <div className="ui raised very padded text container segment">
      <h2 className="ui header">{title}</h2>
      <h4>By {user}</h4>
      <p>{body}</p>
      <p></p>

      <Comments id={id} />
    </div>
  );
};

export default PostDetail;
