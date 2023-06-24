import React, { useContext, useEffect } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import articleContext from "../context/articles/ArticleContext";

function MyArticles() {
  let navigate = useNavigate();
  const context = useContext(articleContext);
  //destructing Articles context
  const { articles, getArticles } = context;
  useEffect(() => {
    //check if auth token is not null
    if (localStorage.getItem("token")) {
      getArticles();
    } else {
      navigate("/login");
    }
  }, [getArticles, navigate]);

  return (
    <>
      <Navbar heading="Chintanika" title="MY ARTICLES"></Navbar>
      <section className="hero-section">
        <h1 className="hero-heading text-start">Your stories</h1>
        <div className="d-flex">
          <Link className="btn hero mx-2" to="/texteditor">
            Write
          </Link>
          <Link className="btn hero" to="/read">
            Read
          </Link>
        </div>
      </section>
      <div className="container p-2 text-center light-text">
        {articles.length === 0 && "No articles!"}
        <br />
      </div>
      {articles.length !== 0 &&
        Array.isArray(articles) &&
        articles.map((article) => {
          return <ArticleCard key={article._id} article={article} />;
        })}
    </>
  );
}

export default MyArticles;
