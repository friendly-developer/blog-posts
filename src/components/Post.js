import React, { useContext, useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";

import Loader from "./Loader";

import UserContext from "../contexts/UserContext";

const Post = ({ post }) => {
  const [user, setUser] = useState("Loading..");
  const [redirect, setRedirect] = useState(false);
  const userObj = useContext(UserContext);
  const { body, title, userId, id } = post || {};
  useEffect(() => {
    if (!userObj.userData[userId]) {
      userObj.setUserId(userId);
    } else {
      setUser(userObj.userData[userId].name);
    }
  }, [userObj.userData]);

  const redirectToPostDetail = (e) => {
    setRedirect(true);
  };
  if (!post) return <Loader />;

  if (redirect) return <Redirect to={"/post/" + id} />;
  return (
    <div className="card row one" onClick={redirectToPostDetail}>
      <div className="content">
        <div className="header">{title}</div>

        <div className="description">{body.substring(0, 100)}</div>
      </div>
      <div className="extra content">
        <div className="right floated author">
          <Link to={"/user/" + userId}>
            <div className="meta">{user}</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Post;
