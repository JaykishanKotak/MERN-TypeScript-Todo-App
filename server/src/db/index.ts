import mongoose from "mongoose";

//Mongoose
mongoose
  .connect("mongodb://localhost:27017/todos-app")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("DB Connection Failed :", err);
  });
