const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
connectToMongo();
const app = express();
const port = 5000;

app.use(cors());
//middleware to use req.body in aut
app.use(express.json());

//available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/article", require("./routes/article"));

//Available routes

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
