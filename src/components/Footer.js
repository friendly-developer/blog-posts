const Footer = () => {
  return (
    <footer className="ui inverted footer vertically segment">
      <div className="ui center aligned container">
        <div className="ui horizontal inverted large divided link list">
          <a
            className="item float left"
            href="https://www.linkedin.com/in/gvsvarun/"
            target="_blank"
            rel="noreferrer"
          >
            <i className="linkedin icon" />
            LinkedIn
          </a>
          <a className="item" href="#">
            Varun G
          </a>
          <a
            className="item float right"
            href="https://github.com/friendly-developer"
            target="_blank"
            rel="noreferrer"
          >
            <i class="github icon" />
            Github
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
