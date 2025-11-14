var mongoose = require("mongoose");
function dbConfig() {
  const url =
    "mongodb+srv://diwali:diwali@cluster0.twzlz0b.mongodb.net/diwali-greet?retryWrites=true&w=majority&appName=Cluster0";
    // mongodb+srv://diwali:<db_password>@cluster0.twzlz0b.mongodb.net/?appName=Cluster0
  mongoose
    .connect(url)
    .then(() => {
      console.log("db is running");
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = { dbConfig };
