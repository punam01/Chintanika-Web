import React from "react";
import { IconContext } from "react-icons";
import { FaBookReader, FaBookmark, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function InfScroll(props) {
  const article = props.articleObj;
  const navigate = useNavigate(); // Create a navigate function
  const handleDate = () => {
    const date = new Date(article.pub_date);
    const formattedDate = date.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
    });
    return formattedDate; // Output: July 23
  };
  const handleReadClick = () => {
    localStorage.setItem("article", JSON.stringify(article));
    navigate("/open");
  };
  return (
    <>
      <div className="col-sm-6 mb-3">
        <div className="card btn text-start border">
          <div className="card-body">
            <div className="row mb-4">
              <div className="col-1">
                <IconContext.Provider value={{ className: "top-react-icons" }}>
                  <FaUserCircle />
                </IconContext.Provider>
              </div>
              <div className="col text-start">
                <b>Punam Kumavat</b>
                <p>
                  {handleDate()} .{" "}
                  {(
                    Math.round(
                      0.008 * article.content.split(" ").length * 100
                    ) / 100
                  ).toFixed(1)}{" "}
                  minutes read
                </p>
              </div>
            </div>
            <span className="card-text">
              {article.title.charAt(0).toUpperCase() + article.title.slice(1)}:
            </span>
            <p className="card-text">{article.description}</p>
            <IconContext.Provider value={{ className: "top-react-icons m-2" }}>
              <FaBookmark />
            </IconContext.Provider>
            <IconContext.Provider value={{ className: "top-react-icons m-2" }}>
              <FaBookReader onClick={handleReadClick} />{" "}
            </IconContext.Provider>
          </div>
        </div>
      </div>
    </>
  );
}

export default InfScroll;
