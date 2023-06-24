import { useState } from "react";
import ArticleContext from "./ArticleContext";

const ArticleState = (props) => {
  const host = "http://localhost:5000";
  const articleInitial = [];

  const [articles, setArticles] = useState(articleInitial);

  //Fetch all user article
  const getArticles = async () => {
    const response = await fetch(`${host}/api/article/fetchallarticles`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
    });
    const json = await response.json();
    var articlearray = [];
    Object.keys(json).forEach(function(key) {
        articlearray.push(json[key]);
    });
    setArticles(articlearray);
  };


  //Fetch all article
  const AllArticles = async () => {
    const response = await fetch(`${host}/api/article/allarticles`, {
      method: "GET",
      headers: {
        "Content-type": "application/json"
      },
    });
    const json = await response.json();
    setArticles(json);
  };
  
  //ADD ARTICLE
  const addArticle = async (title, description, content, tag) => {
    const response = await fetch(`${host}/api/article/addarticle`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, content, tag }),
    });
    const article = await response.json();
    setArticles(articles.concat(article));
  };

  //DELETE ARTICLE (takes article id)
  const delArticle = async (id) => {
    //TODO:API CALL
    
    const response = await fetch(`${host}/api/article/deletearticle/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
    });
    const json = response.json();
    console.log(json);
    setTimeout(() => {
    }, 1000);
    const newArticle = articles.filter((article) => {
      return article._id !== id;
    });
    setArticles(newArticle);
  };

  //EDIT NOTE
  const editArticle = async (id, title, description, content, tag) => {
    const response = await fetch(`${host}/api/article/updatearticle/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, content, tag }),
    });
    const json = await response.json();
    console.log(json);
    let newArticle = JSON.parse(JSON.stringify(articles));
    for (let index = 0; index < newArticle.length; index++) {
      const element = articles[index];
      if (element._id === id) {
        newArticle[index].title = title;
        newArticle[index].description = description;
        newArticle[index].content = content;
        newArticle[index].tag = tag;
        break;
      }
    }
    setArticles(newArticle);
  };


const updateViewCounts = async (id) => {
  try {
    const response = await fetch(`${host}/api/article/incrementViewCount`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ _id: id })
    });

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error);
  }
}

const updateLikeCounts = async (id) => {
  try {
    const response = await fetch(`${host}/api/article/incrementLikeCount`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ _id: id })
    });

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error);
  }
}



  return (
    <ArticleContext.Provider
      value={{
        articles,
        addArticle,
        delArticle,
        editArticle,
        getArticles,
        AllArticles,
        updateViewCounts,
        updateLikeCounts
      }}
    >
      {props.children}
    </ArticleContext.Provider>
  );
};

export default ArticleState;
