import React from "react";
import { IconContext } from "react-icons";
import { FaReadme, FaShareSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PublicArticleCard = (props) => {
  let navigate = useNavigate();
  const article = props.articleObj; // Create a navigate function

  const handleReadClick = () => {
    localStorage.setItem("article", JSON.stringify(article));
    navigate("/open");
  };
  return (
    <>
      <div className="container" data-bs-spy="scroll">
        <div className="card article-card mb-3 my-5">
          <div className="row">
            <div className="col">
              <img
                src="./images/p1.jpg"
                className="img-fluid rounded-start"
                alt="..."
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="title">{article.title}</h5>
                <p className="card-text content mb-0">{article.description}</p>
                <p className="card-text">
                  {/*set readinf time*/}
                  <small className="text-body-secondary">
                    {(
                      Math.round(
                        0.008 * article.content.split(" ").length * 100
                      ) / 100
                    ).toFixed(1)}{" "}
                    minutes read
                  </small>
                </p>
                <br />
              </div>

              <div className="d-flex mx-2">
                <small className="tag mx-2 p-2">{article.tag}</small>
                <button className="btn mx-2">
                  <IconContext.Provider
                    value={{ className: "top-react-icons" }}
                  >
                    <FaShareSquare />
                  </IconContext.Provider>
                </button>

                <button className="btn mx-2">
                  <IconContext.Provider
                    value={{ className: "top-react-icons" }}
                  >
                    <FaReadme onClick={handleReadClick} />
                  </IconContext.Provider>
                </button>

                <div
                  className="modal fade"
                  id="exampleModal"
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1
                          className="modal-title fs-5 hero-heading"
                          id="exampleModalLabel"
                        >
                          Edit Article
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn hero"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="button" className="btn hero">
                        Update Article
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublicArticleCard;
