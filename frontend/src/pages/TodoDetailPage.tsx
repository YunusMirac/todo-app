import { useNavigate, useParams } from "react-router-dom";
import {
  getTodoById,
  updateTodoTitleDescription,
} from "../apiServices/TodoApi";
import { useEffect, useState, type FormEvent } from "react";

function TodoDetailPage() {
  const { id } = useParams<string>(); // Holt die ID aus der URL
  const [title, setTitle] = useState<string>(""); //
  const [description, setDescription] = useState<string>("");
  const [originalTitle, setOriginalTitle] = useState<string>("");
  const [originalDescription, setOriginalDescription] = useState<string>("");
  const navigate = useNavigate();
  // Steuerung der Sichtbarkeit des Update-Formulars
  const [updateFormVisible, setUpdateFormVisible] = useState<boolean>(false);

  // Vergleicht aktuelle mit ursprünglichen Werten
  const hasChanged =
    title !== originalTitle || description !== originalDescription;

  useEffect(() => {
    getTodo();
  }, [id]);

  // Holt das Todo anhand der ID
  async function getTodo() {
    if (!id) return;

    try {
      const datas = await getTodoById(Number(id));
      if (datas) {
        setTitle(datas.title);
        setDescription(datas.description);
        // Originale Werte speichern für Vergleich
        setOriginalTitle(datas.title);
        setOriginalDescription(datas.description);
      }
    } catch (error) {
      console.error("Fehler beim Laden des To-Dos:", error);
    }
  }
// Aktualisiert das To-Do mit neuen Werten
  async function handleUpdateTodo(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    if (!hasChanged) {
      alert("Keine Änderungen erkannt. Todo bleibt unverändert.");
      return;
    }

    try {
      await updateTodoTitleDescription(Number(id), { title, description });
      console.log("To-Do erfolgreich aktualisiert.");
      setUpdateFormVisible(false);
      navigate(`/`);
    } catch (error) {
      console.error("Fehler beim Aktualisieren des To-Dos:", error);
    }
  }

  // Setzt die Formularfelder auf die ursprünglichen Werte zurück
  async function handleResetTodo(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    if (!hasChanged) { return; }
    try {
      console.log("To-Do erfolgreich zurückgesetzt.");
      setTitle(originalTitle);
      setDescription(originalDescription);
    } catch (error) {
      console.error("Fehler beim Aktualisieren des To-Dos:", error);
    }
  }
  return (
    <div >
      {!updateFormVisible ? (
        <div className="flex flex-col mt-40">
          <h2 className="text-center text-orange-500 text-7xl font-semibold mb-5">ToDo Details</h2>
          <div className="border border-gray-500 mt-20 mx-auto p-10 md:p-20 rounded-lg shadow-lg">
          <p className="text-center mb-10 md:mb-20 text-4xl font-lg">
          {title}
          </p>
          {description ? (
            <p className="text-center text-xl">
              <strong>Beschreibung:</strong> {description}
            </p>
          ) : (
            <p className="text-center text-xl italic">Keine Beschreibung vorhanden</p>
          )}
          </div>
          <div className="w-full max-w-lg mx-auto mt-10 p-6 flex flex-col gap-60 md:flex-row md:justify-center">
            <button onClick={() => setUpdateFormVisible(!updateFormVisible)} className="text-2xl text-green-700 font-semibold hover:text-white transition hover:bg-green-700 rounded-md p-2 w-full md:w-auto">
              Bearbeiten
            </button>
            <button onClick={() => navigate("/")} className="text-2xl text-red-700 font-light w-full md:w-auto">
              Zurück
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleUpdateTodo} onReset={handleResetTodo} className="w-full max-w-lg mx-auto bg-gray p-8 shadow-xl rounded-lg mt-10 border-2 border-orange-300 flex flex-col gap-4">
          <h3 className="text-center text-3xl pb-10 text-orange-500">Update ToDo</h3>
          <label htmlFor="title" className="text-xl">Titel:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="color-black p-2 border border-orange-500 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 mb-4"
          />

          <label htmlFor="description" className="text-xl">Beschreibung:</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
             className="text-black p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 mb-4 h-24 resize-none"
          />
          <button type="reset" disabled={!hasChanged} className="text-red-500 font-semibold hover:text-white transition hover:bg-red-700 rounded-md p-2">Zurücksetzen</button>
          <button type="submit" disabled={!hasChanged} className="text-orange-500 hover:bg-orange-500 hover:text-white font-semibold transition rounded-md p-2">Aktualisieren</button>
          <div>
          <p>Zurück zur</p><button type="button" onClick={() => navigate("/")} className="text-blue-700 font-light hover:underline">
            Home Page
          </button>
          </div>
        </form>
      )}
    </div>
  );
}
export default TodoDetailPage;
