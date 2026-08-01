const express = require("express");
const articleRoutes = require("./routes/articleRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const session = require("express-session");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(
  session({
    secret: "supersecret",
    resave: false,
    saveUninitialized: false,
  }),
);
app.use((req, res, next) => {
  res.locals.userId = req.session.userId;
  res.locals.errors = {};
  res.locals.old = {};
  next();
});
app.use("/", articleRoutes);
app.use("/", authRoutes);
app.use("/api/users", userRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
