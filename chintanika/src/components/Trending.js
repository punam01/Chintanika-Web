import React from "react";
import { IconContext } from "react-icons";

import { FaHotjar, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function Trending() {
  return (
    <>
      <section className="trending-section">
        <h4 className="mb-2 p-3">
          <IconContext.Provider value={{ className: "top-react-icons" }}>
            <FaHotjar />
          </IconContext.Provider>
          Trending on
          <span className="navbar-brand"> Chintanika</span>
        </h4>
        <div className="row ">
          <div className="col-sm-4 mb-3 mb-sm-0">
            <div className="card btn border">
              <div className="card-body ">
                <div className="row mb-4">
                  <div className="col-1">
                    <Link
                      className="nav-link"
                      to="/"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <IconContext.Provider
                        value={{ className: "top-react-icons" }}
                      >
                        <FaUserCircle />
                      </IconContext.Provider>
                    </Link>
                  </div>
                  <div className="col text-start">
                    <b>Punam Kumavat</b>
                  </div>
                </div>
                <p className="card-text text-start">
                  <span>The Meaning of Life:</span>
                  <br /> Exploring different philosophical perspectives on the
                  purpose and significance of human existence.
                </p>
                <p className="card-text text-start">May 5 . 5 min read</p>
              </div>
            </div>
          </div>

          <div className="col-sm-4 mb-3 mb-sm-0">
            <div className="card btn border">
              <div className="card-body ">
                <div className="row mb-4">
                  <div className="col-1">
                    <Link
                      className="nav-link"
                      to="/"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <IconContext.Provider
                        value={{ className: "top-react-icons" }}
                      >
                        <FaUserCircle />
                      </IconContext.Provider>
                    </Link>
                  </div>
                  <div className="col text-start">
                    <b>Utkrishta Bharat</b>
                  </div>
                </div>
                <p className="card-text text-start">
                  <span>Philosophy of Mind:</span>
                  <br /> Discussing theories of mind, such as dualism,
                  materialism,and their implications for understanding
                  consciousness.
                </p>
                <p className="card-text text-start">May 5 . 5 min read</p>
              </div>
            </div>
          </div>

          <div className="col-sm-4 mb-3 mb-sm-0">
            <div className="card btn border">
              <div className="card-body">
                <div className="row mb-4">
                  <div className="col-1">
                    <Link
                      className="nav-link"
                      to="/"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <IconContext.Provider
                        value={{ className: "top-react-icons" }}
                      >
                        <FaUserCircle />
                      </IconContext.Provider>
                    </Link>
                  </div>
                  <div className="col text-start">
                    <b>Punam Kumavat</b>
                  </div>
                </div>
                <p className="card-text text-start">
                  <span>The Meaning of Life:</span>
                  <br /> Exploring different philosophical perspectives on the
                  purpose and significance of human existence.
                </p>
                <p className="card-text text-start">May 5 . 5 min read</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Trending;
