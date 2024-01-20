import { ChangeEventHandler, SyntheticEvent, useEffect, useState } from "react";
import NoteItem from "./components/NoteItem";
import "./index.css";
import axios from "axios";


type noteType = {
  id: string;
  title: string;
  description?: string;
}
const App = () => {
  //title -> value setTitle - updaterFunction, react rerenders dom whenever value of state changes and updater fun is called,
  // const [title, setTitle] = useState("")
  // const [description, setDescription] = useState("")

  const [values, setValues] = useState({
    title: "",
    description: "",
  });

  const [notes, setNotes] = useState<noteType[]>([]);

  const [selectedNoteId, setSelectedNoteId] = useState("")
  const [noteToView, setNoteToView] = useState<noteType>()


  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = ({ target }) => {
    const { name, value } = target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (evt: SyntheticEvent) => {
    evt.preventDefault();
    //update
    if (selectedNoteId) {
      const { data } = await axios.patch("http://localhost:8000/note/" + selectedNoteId, {
        title: values.title,
        description: values.description,
      });
      console.log(data.note);

      //Update UI
      const updatedNotes = notes.map((note) => {
        if (note.id === selectedNoteId) {
          note.title = data.note.title;
          note.description = data.note.description
        }
        return note
      })
      setNotes([...updatedNotes]);
      setValues({ title: "", description: "" })
      return;
    }
    const { data } = await axios.post("http://localhost:8000/note/create", {
      title: values.title,
      description: values.description,
    });
    setNotes([...notes, data.note])
    setValues({ title: "", description: "" })
  };

  const fetchNotes = async () => {
    const { data } = await axios.get("http://localhost:8000/note")
    setNotes(data.notes)
  }

  useEffect(() => {
    console.log(" I will Run whenever DOM is ready or some changes happens inside Virtual DOM !");
    fetchNotes()
  }, []);


  return (
    <div className="max-w-3xl mx-auto  space-y-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded p-5 space-y-6"
      >
        <h1 className="font-semibold text-2xl text-center">Note Application</h1>
        <div>
          {/*title.trim() && title.length < 3 ? (<p className="text-red-500">Title is too short</p>) : null*/}

          <input
            className=" w-full border-b-2 border-gray-700 outline-none"
            type="text"
            placeholder="Title"
            name="title"
            value={values.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <textarea
            className=" w-full border-b-2 border-gray-700 outline-none resize-none h-36"
            placeholder="Description"
            name="description"
            value={values.description}
            onChange={handleChange}
          />
        </div>
        <div className="text-center">
          <button
            className="bg-blue-500 text-white px-5 py-2 rounded"
            onClick={() => console.log(values)}
          >
            Submit
          </button>
        </div>
      </form>

      {/*Note Item*/}
      {notes.map((note) => (
        <NoteItem key={note.id} title={note.title} description={noteToView?.id === note.id ? noteToView?.description : ""}
          onViewClick={() => {
            if (noteToView) {
              setNoteToView(undefined)
            }
            else {
              setNoteToView(note)
            }
          }}
          onEditClick={() => {
            console.log(note);
            setSelectedNoteId(note.id);
            setValues({
              title: note.title,
              description: note.description || ""
            })
          }}
          onDeleteClick={async () => {
            const result = confirm("Are you sure ?")
            console.log(result);
            if (result) {
              const { data } = await axios.delete("http://localhost:8000/note/" + note.id);
              // const updatedNotes = notes.filter(({ id }) => {
              //   if (note.id !== id)
              //     return note
              // })
              const updatedNotes = notes.filter(({ id }) => note.id !== id);
              setNotes([...updatedNotes]);
            }

          }}
        />
      ))}
    </div>
  );
};

export default App;
