const path = require("path");
const express = require("express");
const hbs = require("hbs");
require('./db/mongoose')
const Esya = require('./models/esya')

const publicDir = path.join(__dirname, "../public");
const viewsDir = path.join(__dirname, "../templates/views");
const partialsDir = path.join(__dirname, "../templates/partials");
const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "hbs");
app.set("views", viewsDir);
hbs.registerPartials(partialsDir);

app.use(express.static(publicDir));
app.use(express.json())

app.get("/evlilik", (req, res) => {
  res.render("evlilik");
});

app.get("/evlilik-list", async (req, res) => {
  try {
    const esyalar = await Esya.find({})
    res.send(esyalar);
  } catch (error) {
    console.log(error)
    res.status(500).send();

  }
});

app.post("/evlilik", async (req, res) => {
  try {
    const allowedFields = ['_id', 'name', 'category', 'priceLow', 'priceHigh', 'bought']
    const reqFields = Object.keys(req.body)
    const isValid = reqFields.every((field) => allowedFields.includes(field))
    if (!isValid) { return res.status(400).send({ error: 'Invalid fields' }) }
    const esya = await new Esya(req.body)
    await esya.save()
    res.status(201).send(esya)
  } catch (error) {
    res.status(500).send(error)
  }
})

app.patch("/evlilik", async (req, res) => {
  const allowedFields = ['_id', 'name', 'category', 'priceLow', 'priceHigh', 'bought']
  const reqFields = Object.keys(req.body)
  const isValid = reqFields.every((field) => allowedFields.includes(field))
  if (!isValid) { return res.status(400).send({ error: 'Invalid fields' }) }
  try {
    const esya = await Esya.findById(req.body._id)
    reqFields.forEach((field) => esya[field] = req.body[field])
    await esya.save()
    res.send(esya)
  } catch (e) {
    res.status(500).send()
  }
})

app.get("*", (req, res) => {
  res.render("index");
});

app.listen(port, () => console.log("starting server on port number " + port));
