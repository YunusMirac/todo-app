import { createTodo } from "../apiServices/TodoApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function TodoFormPage() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState<boolean>(false); // Verhindert Mehrfach-Submits

  // Formular-Submit-Handler
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    if (title.trim() === "") {
      alert("Bitte geben Sie einen Titel ein.");
      return;
    }
    setSubmitted(true);

    try {
      await createTodo({ title, description });
      setTitle("");
      setDescription("");
      navigate("/");
    } catch (error) {
      console.error("Fehler beim Erstellen des To-Dos:", error);
      alert("Fehler beim Erstellen. Bitte überprüfen Sie die Eingaben.");
    } finally {
      setSubmitted(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto bg-gray p-8 shadow-xl rounded-lg mt-10 border-2 border-orange-300 flex flex-col gap-4">

        <h3 className="text-center text-3xl pb-10 text-orange-500">Neues Todo</h3>
        <label htmlFor="title" className="text-xl">Titel:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={submitted}
          required
          className="color-black p-2 border border-orange-500 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 mb-4"
        />
        <label htmlFor="description" className="text-xl">Beschreibung:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={submitted}
          placeholder="Optionale Beschreibung"
          className="text-black p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 mb-4 h-24 resize-none"
        />
        <button type="submit" disabled={submitted}
        className="text-green-700 font-semibold hover:text-white transition hover:bg-green-700 rounded-md p-2"
        >{submitted ? 'Speichere...' : 'To-Do erstellen'}</button>
        <button onClick={() => navigate("/")} disabled={submitted}
          className="text-red-700 font-light m-auto"
        >Abbrechen</button>
      </form>
    </>
  );
}

export default TodoFormPage;
