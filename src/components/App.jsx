import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/notes";


function App() {
  const [notes, setNotes] = useState([]);

  // Fetch notes when the app loads
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setNotes(data))
      .catch(err => console.error("Error fetching notes:", err));
  }, []);

  // Add a new note
  function addNote(newNote) {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNote)
    })
      .then(res => res.json())
      .then(savedNote => {
        setNotes(prevNotes => [...prevNotes, savedNote]);
      })
      .catch(err => console.error("Error adding note:", err));
  }

  // Delete a note
  function deleteNote(id) {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
      })
      .catch(err => console.error("Error deleting note:", err));
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem) => {
        return (
          <Note
            key={noteItem._id}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
