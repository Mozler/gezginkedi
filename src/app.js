const path = require("path");
const express = require("express");
const hbs = require("hbs");

const publicDir = path.join(__dirname, "../public");
const viewsDir = path.join(__dirname, "../templates/views");
const partialsDir = path.join(__dirname, "../templates/partials");
const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "hbs");
app.set("views", viewsDir);
hbs.registerPartials(partialsDir);

app.use(express.static(publicDir));

app.get("*", (req, res) => {
  res.render("index");
});

app.listen(port, () => console.log("starting server on port number " + port));
