const express = require("express");
const authRoutes = require("./routes/auth");
const stripeRoutes = require("./routes/stripe");
const hotelRoutes = require("./routes/hotel");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const morgan = require("morgan");

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config();
}

const PORT = process.env.PORT || 8000;
const app = express();

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Database connected.");
  });

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", stripeRoutes);
app.use("/api", hotelRoutes);

if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
