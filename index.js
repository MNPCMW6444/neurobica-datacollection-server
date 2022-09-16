const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const Yoad = require("./models/museDataMocel");

dotenv.config();

// setup express server

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "https://braindata.flexboxtorchy.com",
      "https://braindatacheck.flexboxtorchy.com",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);
app.use(cookieParser());

const PORT = process.env.PORT || 5051;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// set up routers

// connect to mongoDB

mongoose.connect(
  process.env.MDB_CONNECT_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.error(err);
    console.log("Connected to MongoDB");
  }
);

app.post("/savedata", async (req, res) => {
  try {
    const { datadata, name } = req.body;

    const editItem = new Yoad({
      stringified: JSON.stringify(datadata),
      name: name,
    });
    await editItem.save();

    res.json({});
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

app.get("/num", async (req, res) => {
  try {
    const a = await Yoad.find();

    res.send(a.length);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});
