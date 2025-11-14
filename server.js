var express = require("express");
var app = express();
var cors = require("cors");
var dotenv = require("dotenv");
const { dbConfig } = require("./configuration/db.config");
const { userRouter } = require("./routers/user.router");
const bodyParser = require("body-parser");
const { geminiRouter } = require("./routers/gemini.router");
var cookieParser = require("cookie-parser");
const path = require("path");

dotenv.config();

// middlwares
app.use(
  cors({
    origin: ["http://localhost:5173", "https://diwali-greeting-clinet.netlify.app/"],
    credentials: true, // Allow cookies
  })
);

if (process.env.NODE_ENV === "production") {
  const fronendPath = path.join(__dirname, "../diwali-fronend/dist");
  app.use(express.static(fronendPath));

  app.get((req, res) => {
    res.sendFile(path.join(fronendPath, "index.html"));
  })
}

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/gemini", geminiRouter);

var PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
  await dbConfig();
  console.log(`Listening to the port ${PORT}`);
});
