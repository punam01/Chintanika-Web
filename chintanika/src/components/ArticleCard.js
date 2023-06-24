import React, { useContext, useRef, useState } from "react";
import { IconContext } from "react-icons";
import { FaEdit, FaShareSquare, FaTrash, FaBookReader } from "react-icons/fa";
import articleContext from "../context/articles/ArticleContext";
import JoditEditor from "jodit-react";
import { useNavigate } from "react-router-dom";

function ArticleCard(props) {
  const context = useContext(articleContext);
  const { delArticle, editArticle } = context;
  const ref = useRef(null);
  const refClose = useRef(null);
  const editor = useRef(null);

  const navigate = useNavigate(); // Create a navigate function

  const handleReadClick = () => {
    localStorage.setItem("article", JSON.stringify(article));
    navigate("/open");
  };

  const [earticle, setArticle] = useState({
    eid: "",
    etitle: "",
    edescription: "",
    econtent: "",
    etag: "",
  });

  const updateArticle = (currentArticle) => {
    ref.current.click();
    setArticle({
      eid: currentArticle._id,
      etitle: currentArticle.title,
      edescription: currentArticle.description,
      econtent: currentArticle.content,
      etag: currentArticle.tag,
    });
  };

  const handleClick = (e) => {
    editArticle(
      earticle.eid.toString(),
      earticle.etitle.toString(),
      earticle.edescription.toString(),
      earticle.econtent,
      earticle.etag.toString()
    );
    refClose.current.click();
    //props.showAlert("Successful edit","success");
  };
  const onChange = (e) => {
    //spread operator
    setArticle({ ...earticle, [e.target.name]: [e.target.value] });
  };

  const { article } = props;

  return (
    <>
      <div className="container border-bottom">
        <div className="card article-card mb-3 my-5">
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src="./images/p1.jpg"
                className="img-fluid rounded-start"
                alt="..."
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="title">{article.title}</h5>
                <p className="card-text content mb-3">{article.description}</p>
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
                    value={{ className: "top-react-icons m-2" }}
                  >
                    <FaBookReader onClick={handleReadClick} />{" "}
                    {/* Add onClick event */}
                  </IconContext.Provider>
                </button>

                <button
                  type="button"
                  className="btn"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  ref={ref}
                  onClick={() => {
                    updateArticle(article);
                  }}
                >
                  <IconContext.Provider
                    value={{ className: "top-react-icons" }}
                  >
                    <FaEdit />
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
                      <div className="modal-body">
                        {/*modal body start*/}
                        <form>
                          <div className="mb-3">
                            <label htmlFor="etitle" className="form-label">
                              Title
                            </label>
                            <input
                              type="text"
                              value={earticle.etitle}
                              className="form-control hero-heading fs-4"
                              id="etitle"
                              name="etitle"
                              onChange={onChange}
                              minLength={5}
                              required
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="edescription"
                              className="form-label"
                            >
                              Description
                            </label>
                            <input
                              type="text"
                              value={earticle.edescription}
                              className="form-control"
                              id="edescription"
                              name="edescription"
                              onChange={onChange}
                              minLength={5}
                              required
                            />
                          </div>
                        </form>
                        <div className="mb-3">
                          <label htmlFor="econtent" className="form-label">
                            Content
                          </label>
                          <JoditEditor
                            ref={editor}
                            name="econtent"
                            id="econtent"
                            onChange={(content) => {
                              setArticle({ ...earticle, econtent: content });
                            }}
                            value={earticle.econtent}
                            minLength={5}
                            required
                          ></JoditEditor>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="etag" className="form-label hero p-2">
                            Tags
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="etag"
                            value={earticle.etag}
                            name="etag"
                            onChange={onChange}
                            minLength={5}
                            required
                          />
                        </div>
                        {/*modal body end*/}
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn hero"
                          data-bs-dismiss="modal"
                          ref={refClose}
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          className="btn hero"
                          onClick={handleClick}
                        >
                          Update Article
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  className="btn mx-2"
                  onClick={() => {
                    delArticle(article._id);
                  }}
                >
                  <IconContext.Provider
                    value={{ className: "top-react-icons" }}
                  >
                    <FaTrash />
                  </IconContext.Provider>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ArticleCard;
