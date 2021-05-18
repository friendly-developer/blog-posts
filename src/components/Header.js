import { useState } from "react";
import { Link } from "react-router-dom";
const Header = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const onSearchHandler = (e) => {
    onSearch(e.target.value);
    setSearchTerm(e.target.value);
  };
  return (
    <header className="ui inverted menu">
      <div className="ui container">
        <Link to="/posts">
          <h1 className="header item">Blog posts</h1>
        </Link>
        <div className="ui item float right search">
          <input
            className="prompt"
            type="text"
            value={searchTerm}
            onChange={onSearchHandler}
            placeholder="Search Posts"
          />
          <div className="results"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
