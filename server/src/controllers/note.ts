import { RequestHandler } from "express";
import Note, { NoteDocument } from "../models/note";

interface IncomingBody {
  title: string;
  description?: string;
}

export const createNote: RequestHandler = async (req, res) => {
  console.log(req.body);
  // const newNote = new Note<NoteDocument>({
  //   title: (req.body as IncomingBody).title,
  //   description: (req.body as IncomingBody).description,
  // });

  // await newNote.save();

  const newNote = await Note.create<NoteDocument>({
    title: (req.body as IncomingBody).title,
    description: (req.body as IncomingBody).description,
  });

  res.json({
    note: {
      id: newNote._id,
      title: newNote.title,
      description: newNote.description,
    },
    message: "Note created successfully !",
  });
};

export const updateSingleNote: RequestHandler = async (req, res) => {
  const { noteId } = req.params;

  // const note = await Note.findById(noteId);
  // if (!note) return res.json({ error: "Note not found !" });

  const { title, description } = req.body as IncomingBody;
  // if (title) note.title = title;
  // if (description) note.description = description;
  // await note.save();
  //it will return old object, so we need to pass new true
  const note = await Note.findByIdAndUpdate(
    noteId,
    { title, description },
    { new: true }
  );
  if (!note) return res.json({ error: "Note not found !" });
  res.json({
    note: { id: note._id, title: note.title, description: note.description },
    message: "Note updated successfully !",
  });
};

export const removeSingleNote: RequestHandler = async (req, res) => {
  const { noteId } = req.params;

  //For title and desc
  // await Note.findOneAndDelete(title);

  //For the whole document
  const removedNote = await Note.findByIdAndDelete(noteId);

  //If No note
  if (!removedNote) return res.json({ error: "Could not remove note !" });
  res.json({ message: "Note removed successfully !" });
};

export const getAllNotes: RequestHandler = async (req, res) => {
  //Find every note document from db
  const notes = await Note.find({});
  const finalNotes = notes.map((note) => {
    return {
      id: note.id,
      title: note.title,
      description: note.description,
    };
  });
  res.json({ notes: finalNotes });
};

export const getSingleNote: RequestHandler = async (req, res) => {
  const { id } = req.params;

  //Find every note document from db
  const note = await Note.findById(id);
  if (!note) return res.json({ error: "Note not found !" });
  res.json({
    note: { id: note._id, title: note.title, description: note.description },
  });
};

// app.get("/", (req, res) => {
//   res.send("<h1>Hello World , How Are You ?</h1>");
// });

// app.use((req, res, next) => {
//   // read the data and we want to add that to req.body
//   req.on("data", (chunk) => {
//     // manipulate this here
//     req.body = JSON.parse(chunk);
//     next();
//   });
// });

// app.post("/", (req, res) => {
//   console.log(req.body);

//   res.json({ message: "I am listning" });
// });
