import React, { useContext, useEffect } from "react";
import articleContext from "../context/articles/ArticleContext";
import HeroBanner from "./HeroBanner";
import Trending from "./Trending";
import InfScroll from "./InfScroll";
import Navbar from "./Navbar";

function Home() {
  const contextArt = useContext(articleContext);
  const { articles, AllArticles } = contextArt;

  useEffect(() => {
    AllArticles();
  }, [AllArticles]);

  return (
    <>
      <Navbar heading="Chintanika" title="WELCOME" />
      <div>
        <HeroBanner></HeroBanner>
        <Trending></Trending>
        <div className="hero-section">
          <section>
            <div className="row">
              {articles.length !== 0 &&
                articles.data?.map((article) => {
                  return (
                    <InfScroll
                      key={article._id}
                      articleObj={article}
                    ></InfScroll>
                  );
                })}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Home;
