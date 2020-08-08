projectData = {};

const express = require("express");

const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());

app.use(express.static("website"));

app.get("/", (req, res) => {
  res.send("Home Page from server");
});
app.post("data", (req, res) => {});
const port = 3000;

const server = app.listen(port, listening);
function listening() {
  console.log(`running on localhost: ${port}`);
}
