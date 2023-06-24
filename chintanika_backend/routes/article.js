const express = require("express");
const router = express.Router();
//import articles model
const Article = require("../models/Article");
//import middleware
const fetchUser = require("../models/middleware/fetchUser");
//validate articles
const { body, validationResult } = require("express-validator");

//ROUTE-1: Get all the articles of a user using: GET "/api/article/fetchallarticles" .Login Required
//1.Get token from header
router.get("/fetchallarticles", fetchUser, async (req, res) => {
  try {
    const articles = await Article.find({ user: req.user.id });
    res.json(articles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE-2: Add new article: POST "/api/article/addarticle" .Login Required
router.post(
  "/addarticle",
  fetchUser,
  [
    body("title", "title length should be minimum 5").isLength({ min: 5 }),
    body("description", "description length should be minimum 5").isLength({
      min: 5,
    }),
    body("content", "content must be unique").exists(),
  ],
  async (req, res) => {
    try {
      const { title, description, content, tag } = req.body;
      //if there are error -->return bad request and error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //id no error ->save article
      const article = new Article({
        title,
        description,
        content,
        tag,
        user: req.user.id,
      });
      const savedArticle = await article.save();
      res.json(savedArticle);
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ error: error.message }); //"Article with same content already exists"
    }
  }
);

//ROUTE-3: Update existing article: PUTT "/api/article/updatearticle" .Login Required
router.put(
  "/updatearticle/:id",
  fetchUser,
  [
    body("title", "title length should be minimum 5").isLength({ min: 5 }),
    body("description", "description length should be minimum 5").isLength({
      min: 5,
    }),
    body("content", "content must be unique").exists(),
  ],
  async (req, res) => {
    //only the author of the article can update the article
    try {
      const { title, description, content, tag } = req.body;
      //create a new article object
      const newArticle = {};
      if (title) {
        newArticle.title = title;
      }
      if (description) {
        newArticle.description = description;
      }
      if (content) {
        newArticle.content = content;
      }
      if (tag) {
        newArticle.tag = tag;
      }

      //Find the article to be updated and update it
      let article = await Article.findById(req.params.id);
      //if the article does not exixts then==>
      if (!article) {
        return res.status(404).send("Article not found");
      }
      //check if the author is trying to update ot someone else
      if (article.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }
      //else update ....also if content is new add it
      article = await Article.findByIdAndUpdate(
        req.params.id,
        { $set: newArticle },
        { new: true }
      );
      res.json(article);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Couldnt Update");
    }
  }
);

//ROUTE-4: Delete existing article: DELETE "/api/article/deletearticle" .Login Required
router.delete("/deletearticle/:id", fetchUser, async (req, res) => {
  //only the author of the article can delete the article
  try {
    //Find the article to be updated and update it
    let article = await Article.findById(req.params.id);
    //if the article does not exixts then==>
    if (!article) {
      return res.status(404).send("Article not found");
    }
    //check if the author is trying to update or someone else
    if (article.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    //else delete
    article = await Article.findByIdAndDelete(req.params.id);

    res.json({ Success: "Note has been deleted", article: article });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Couldnt Update");
  }
});

//ROUTE-5: Get all the articles: GET "/api/article/fetchallarticles" .Login Required
//1.Get token from header
router.get("/allarticles", async (req, res) => {
  try {
    const allarticles = await Article.find({});
    res.send({ data: allarticles });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// PUT route to update the view count of an article
router.put("/incrementViewCount", async (req, res) => {
  try {
    const { _id } = req.body;

    // Find the article by ID and update the view count
    const updatedArticle = await Article.findByIdAndUpdate(
      _id,
      { $inc: { view_counts: 1 } }, // Increment the view count by 1
      { new: true }
    );

    res.json(updatedArticle);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT route to update the view count of an article
router.put("/incrementLikeCount", async (req, res) => {
  try {
    const { _id } = req.body;

    // Find the article by ID and update the view count
    const updatedArticle = await Article.findByIdAndUpdate(
      _id,
      { $inc: { like_counts: 1 } }, // Increment the view count by 1
      { new: true }
    );

    res.json(updatedArticle);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
