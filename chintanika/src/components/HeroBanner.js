import React from "react";
import { useNavigate } from "react-router-dom";

function HeroBanner() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/read");
  };
  return (
    <>
      <section className="hero-section">
        <h1 className="hero-heading">Stay Curious</h1>
        <h4 className="my-2">
          Share philosophical ideas, thoughts, and perspectives with others
        </h4>
        <button
          type="button"
          onClick={handleClick}
          className="btn btn hero shadow my-5 p-2"
        >
          Start Reading
        </button>
      </section>
    </>
  );
}

export default HeroBanner;
