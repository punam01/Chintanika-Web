import { FaBars, FaSearch, FaUserCircle } from "react-icons/fa";
import { IconContext } from "react-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar(props) {
  let navigate = useNavigate();
  const [image, setImage] = useState("");
  //setImage(localStorage.getItem("image"));
  //useLocation to get current working component
  let location = useLocation();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  //get image of user

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand mx-2 btn" to="/">
            {props.heading}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar">
              <IconContext.Provider value={{ className: "top-react-icons" }}>
                <FaBars />
              </IconContext.Provider>
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2 border-0"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn" type="submit">
                <IconContext.Provider value={{ className: "top-react-icons" }}>
                  <FaSearch />
                </IconContext.Provider>
              </button>
            </form>
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item mx-2">
                <Link
                  className={`nav-link ${
                    location.pathname === "/texteditor" ? "active" : ""
                  }`}
                  to="/texteditor"
                >
                  Write
                  {/*<IconContext.Provider
                    value={{ className: "top-react-icons" }}
                  >
                    <FaPencilAlt />
                </IconContext.Provider>*/}
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/about"
                >
                  About
                  {/*<IconContext.Provider
                    value={{ className: "top-react-icons" }}
                  >
                    <FaReadme />
                </IconContext.Provider>*/}
                </Link>
              </li>
              <li className="nav-item dropstart mx-2">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  to="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {image === "" || image === null ? (
                    <IconContext.Provider
                      value={{ className: "top-react-icons" }}
                    >
                      <FaUserCircle />
                    </IconContext.Provider>
                  ) : (
                    <img alt="Profile"
                      src={image}
                      style={{ width: "100px", height: "100px" }}
                    />
                  )}
                </Link>
                <ul className="dropdown-menu border-0">
                  <li>
                    {localStorage.getItem("token") === 0 ? (
                      <Link className="dropdown-item" to="/">
                        Profile
                      </Link>
                    ) : (
                      <Link
                        onClick={handleLogout}
                        className="dropdown-item"
                        to="/login"
                      >
                        Logout
                      </Link>
                    )}
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/myarticles">
                      My Articles
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/read">
                      Read
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/">
                      Bookmarks
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <h3 className="head text-center fixed-top my-2">{props.title}</h3>
    </>
  );
}
export default Navbar;
