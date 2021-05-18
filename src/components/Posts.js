import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import Post from "./Post";

import { API_POSTS } from "../constants/APIConstants";
import Loader from "./Loader";
let orginalPosts = [];
const Posts = ({ search }) => {
  const [posts, setPosts] = useState([]);
  const [loadMore, setLoadMore] = useState(true);

  useEffect(() => {
    const fetchInitialPosts = async () => {
      try {
        console.log("test");
        const data = await fetch(API_POSTS);
        const initialPosts = await data.json();
        const nextPosts = initialPosts.slice(posts.length, posts.length + 10);
        initialPosts.length = 10;
        orginalPosts = [...orginalPosts, ...nextPosts];

        setPosts(orginalPosts);
        setLoadMore(false);
      } catch (err) {
        console.error(err);
      }
    };
    if (loadMore) fetchInitialPosts();
  }, [loadMore]);
  useEffect(() => {
    setPosts(orginalPosts.filter((post) => post.title.includes(search)));
  }, [search]);

  return (
    <div
      id="scrollableDiv"
      style={{
        overflowX: "hidden",
      }}
    >
      <h1 className="ui header">Posts</h1>
      <InfiniteScroll
        dataLength={posts.length}
        next={() => {
          setLoadMore(true);
        }}
        hasMore={posts.length < 20 && !search} // showing only 20 posts at max
        loader={<Loader />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="ui cards grid push-20">
          {posts.map((post) => (
            <Post post={post} key={post.id} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Posts;
