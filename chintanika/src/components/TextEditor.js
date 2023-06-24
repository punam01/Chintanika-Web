import JoditEditor from "jodit-react";
import React, { useRef, useState, useContext } from "react";
import Navbar from "./Navbar";
import articleContext from "../context/articles/ArticleContext";
import { useNavigate } from "react-router-dom";

function TextEditor({ setContent }) {
  const context = useContext(articleContext);
  //destructing Articles context
  const { addArticle } = context;
  const navigate = useNavigate();
  const editor = useRef(null);
  const [article, setArticle] = useState({
    title: "",
    description: "",
    content: "",
    tag: "",
  });
  const handleClick = (e) => {
    if (localStorage.getItem("token")) {
      addArticle(
        article.title.toString(),
        article.description.toString(),
        article.content.toString(),
        article.tag.toString()
      );
      //clear fields
      setArticle({
        title: "",
        description: "",
        content: "",
        tag: "",
      });
      navigate("/myarticles");
    } else {
      navigate("/login");
    }
  };
  const onChange = (e) => {
    //spread operator
    setArticle({ ...article, [e.target.name]: [e.target.value] });
  };

  return (
    <>
      <Navbar heading="Chintanika" title="WRITE" />
      <section className="hero-section">
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control hero-heading fs-4"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onChange}
              minLength={5}
              required
              value={article.title}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
              minLength={5}
              required
              value={article.description}
            />
          </div>
        </form>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <JoditEditor
            ref={editor}
            name="content"
            id="content"
            value={article.content}
            minLength={5}
            required
            onChange={(content) => {
              setArticle({ ...article, content: content });
            }}
          ></JoditEditor>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label hero p-2">
            Tags
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange}
            minLength={5}
            required
            value={article.tag}
          />
        </div>
        <div className="text-end">
          <button className=" btn hero" onClick={handleClick}>
            Publish Article
          </button>
        </div>
      </section>
    </>
  );
}
export default TextEditor;
