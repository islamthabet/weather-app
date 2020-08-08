projectData = {};

const express = require("express");

const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());

app.use(express.static("website"));

app.get("/data", sendData);

function sendData(request, response) {
  response.send(projectData);
}
app.post("/data", (req, res) => {
  console.log(req.body);
  projectData = req.body;
  res.redirect("/data");
});

const port = 3000;
const server = app.listen(port, listening);
function listening() {
  console.log(`running on localhost: ${port}`);
}
