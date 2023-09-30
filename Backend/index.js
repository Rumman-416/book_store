const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { homeController } = require("./controllers/index");
const bookRoutes = require("./routes/bookRoutes");
const { PORT, URL } = require("./config");

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

app.use("/books", bookRoutes);

app.get("/", homeController);

mongoose
  .connect(URL)
  .then(() => {
    console.log("Mongodb connected");
    app.listen(PORT, () => {
      console.log(`Server started at: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
