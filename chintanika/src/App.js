import "./App.css";
import Footer from "./components/Footer";
import Home from "./components/Home";
import { About } from "./components/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TextEditor from "./components/TextEditor";
import { useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import MyArticles from "./components/MyArticles";
import ArticleState from "./context/articles/ArticleState";
import Alert from "./components/Alert";
import ReadArticles from "./components/ReadArticles";
import OpenArticle from "./components/OpenArticle";

function App() {
  const [alert,setAlert]=useState(null);
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500);
  }
  const [content, setContent] = useState("");
  return (
    <>
      <ArticleState>
        <Router>
          <Alert alert={alert}/>
          <Routes>
            <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}></Route>
            <Route exact path="/about" element={<About />}></Route>
            <Route exact path="/" element={<Home showAlert={showAlert} />}></Route>
            <Route
              exact
              path="/texteditor"
              element={<TextEditor setContent={setContent} />}
            ></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/read" element={<ReadArticles />}></Route>
            <Route exact path="/myarticles" element={<MyArticles showAlert={showAlert} />}></Route>
            <Route exact path="/open" element={<OpenArticle/>}></Route>
          </Routes>
        </Router>
        <Footer></Footer>
      </ArticleState>
    </>
  );
}

export default App;
