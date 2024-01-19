import express from "express";
import "./db";
import noteRouter from "./routers/note";

//create a server
const app = express();

//this will parse post request coming from fetch.post() method
app.use(express.json());

// note prefix will apply on app routes in noteRouter
/**
 * 
 * "localhost:8000/note/create"
"localhost:8000/note"
"localhost:8000/note/noteId"
"localhost:8000/note/noteId"
*/
app.use("/note", noteRouter);

// this will parse post request coming from html form
app.use(express.urlencoded({ extended: false }));

//listen to some port
app.listen(8000, () => {
  console.log("Listining....");
});
