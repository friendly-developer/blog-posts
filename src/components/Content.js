import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Posts from "./Posts";
import PostDetail from "./PostDetail";
import User from "./User";

import { UserProvider } from "../contexts/UserContext";

const Content = () => {
  const [search, setSearch] = useState("");
  return (
    <>
      <Header onSearch={setSearch} />
      <main className="ui container main text">
        <UserProvider value>
          <Switch>
            <Route path="/posts">
              <Posts search={search} />
            </Route>
            <Route path="/post/:id">
              <PostDetail />
            </Route>
            <Route path="/user/:id">
              <User />
            </Route>
            <Route path="/">
              <Redirect to="/posts" />
            </Route>
          </Switch>
        </UserProvider>
      </main>
      <Footer />
    </>
  );
};

export default Content;
