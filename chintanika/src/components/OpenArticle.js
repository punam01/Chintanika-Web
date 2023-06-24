import React, { useState, useEffect, useContext } from "react";
import Navbar from "./Navbar";
import { IconContext } from "react-icons";
import {
  FaEye,
  FaFacebookSquare,
  FaLinkedin,
  FaThumbsUp,
  FaTwitter,
} from "react-icons/fa";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";
import { useParams } from "react-router-dom";
import articleContext from "../context/articles/ArticleContext";

const OpenArticle = (props) => {
  const { data } = useParams(); // Get the serialized article object from the URL parameter
  const [article, setArticle] = useState(null); // Create a state to store the article object

  const context = useContext(articleContext);
  const { updateViewCounts, updateLikeCounts } = context;

  const handleDate = () => {
    const date = new Date(article.pub_date);
    const formattedDate = date.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
    });
    return formattedDate; // Output: July 23
  };

  useEffect(() => {
    // Deserialize the article object and set it in the state
    try {
      const storedArticle = JSON.parse(localStorage.getItem("article"));
      setArticle(storedArticle);
    } catch (error) {
      console.error("Error parsing article data:", error);
      // Handle the error, such as displaying an error message or redirecting to a different page
    }
  }, [data]);
  //handle views
  useEffect(() => {
    // Update the view counts when the component mounts
    if (article) {
      updateViewCounts(article._id);
    }
  }, [article,updateViewCounts]);

  if (!article) {
    return null; // If the article object is not available or still loading, you can render a loading indicator or return null
  }

  if (!article) {
    return null; // If the article object is not available or still loading, you can render a loading indicator or return null
  }
  const handleLikeClick = async () => {
    if (article) {
      updateLikeCounts(article._id);
    }
  };
  const text = article.content;
  const sanitizedText = { __html: text };
  return (
    <>
      <Navbar heading="Chintanika" />
      <div className="share-this-page">
        <section className="hero-section">
          <div className="container">
            <div className="d-flex row-4">
              <img alt="profile"
                className="col-1 mx-4 mb-2 "
                src="/images/p1.jpg"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "100px",
                }}
              />
              <div className="col container text-start">
                <p className="fs-3">
                  Punam Kumavat <sub className="fs-6">({handleDate()})</sub>
                </p>
                <div className="d-flex">
                  <p className="fs-4">
                    <small>{article.like_counts}</small>
                    <IconContext.Provider
                      value={{ className: "top-react-icons" }}
                    >
                      <FaThumbsUp
                        onClick={handleLikeClick}
                        style={{ cursor: "pointer", padding: "2px" }}
                      />
                    </IconContext.Provider>
                  </p>
                  <p className="mx-4 fs-4">
                    <small>{article.view_counts}</small>
                    <IconContext.Provider
                      value={{ className: "top-react-icons" }}
                    >
                      <FaEye style={{ padding: "2px" }} />
                    </IconContext.Provider>
                  </p>
                  <p className="mx-4 fs-6">
                    {(
                      Math.round(
                        0.008 * article.content.split(" ").length * 100
                      ) / 100
                    ).toFixed(1)}{" "}
                    minutes read
                  </p>
                </div>
              </div>
            </div>
          </div>
          <br />
          <h3 className="hero-heading mx-5">{article.title}</h3>
          <p className="fs-3 mx-5">{article.description}</p>
          <div className="d-flex">
            <FacebookShareButton className="mx-5" url="facebook.com">
              <IconContext.Provider value={{ className: "top-react-icons" }}>
                <FaFacebookSquare />
              </IconContext.Provider>
            </FacebookShareButton>
            <LinkedinShareButton className="" url="Linkedin.com">
              <IconContext.Provider value={{ className: "top-react-icons" }}>
                <FaLinkedin />
              </IconContext.Provider>
            </LinkedinShareButton>
            <TwitterShareButton className="mx-5" url="twitter.com">
              <IconContext.Provider value={{ className: "top-react-icons" }}>
                <FaTwitter />
              </IconContext.Provider>
            </TwitterShareButton>
          </div>
        </section>
        <div className="container p-5 my-5">
          {<div dangerouslySetInnerHTML={sanitizedText} />}
        </div>
      </div>
    </>
  );
};

export default OpenArticle;
