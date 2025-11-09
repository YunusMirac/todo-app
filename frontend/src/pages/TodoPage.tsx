import { useEffect, useState, type FormEvent } from "react";
import { getTodos, deleteTodo, updateTodoStatus } from "../apiServices/TodoApi";
import { Link, useNavigate } from "react-router-dom";
import type { Todo } from "../types/Todo";

function TodoPage() {
  const [todosOpen, setTodosOpen] = useState<Todo[]>([]); // Offene To-Dos
  const [todosCompleted, setTodosCompleted] = useState<Todo[]>([]); // Abgeschlossene To-Dos
  const [searchTerm, setSearchTerm] = useState<string>(""); // Suchbegriff
  const navigate = useNavigate();

  useEffect(() => {
    fetchTodos(searchTerm);
  }, [searchTerm]);

  // Holt To-Dos vom Backend
  async function fetchTodos(currentSearch: string = "") {
    try {
      // Paralleles Abrufen offener und abgeschlossener To-Dos
      const [openData, completedData] = await Promise.all([
        // Offene To-Dos
        getTodos({ search: currentSearch, status: "PENDING" }),
        // Abgeschlossene To-Dos
        getTodos({ search: currentSearch, status: "COMPLETED" }),
      ]);
      // Setze die To-Do-Listen
      setTodosOpen(openData as Todo[]);
      setTodosCompleted(completedData as Todo[]);
    } catch (error) {
      console.error("Fehler beim Laden der To-Dos:", error);
    }
  }
// Suchformular-Submit-Handler
  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Holt den Suchbegriff aus dem Formular
    const formData = new FormData(event.currentTarget);
    const searchValue = formData.get("todoSuche") as string;
    // Setze den Suchbegriff
    setSearchTerm(searchValue);
  }

  // Löscht ein To-Do
  async function handleDeleteTodo(id: number): Promise<void> {
    try {
      await deleteTodo(id);
      // Lokales Entfernen des To-Dos aus beiden Listen
      setTodosOpen((prev) => prev.filter((todo) => todo.id !== id));
      setTodosCompleted((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Fehler beim Löschen des Todos:", error);
      // Bei Fehler: Aktuelle Suche beibehalten
      await fetchTodos(searchTerm);
    }
  }

  // Aktualisiert den Status eines To-Dos
  async function handleUpdateTodoStatus(id: number): Promise<void> {
    
    const todoToUpdate =
      todosOpen.find((todo) => todo.id === id) ||
      todosCompleted.find((todo) => todo.id === id);
    if (!todoToUpdate) return;

    try {
      const nextStatus =
        todoToUpdate.status === "COMPLETED" ? "PENDING" : "COMPLETED";

      // 1. API-Aufruf (um das aktualisierte Objekt zu bekommen)
      const updatedTodo = await updateTodoStatus(id, nextStatus);

      // 2. State LOKAL aktualisieren
      if (nextStatus === "COMPLETED") {
        // Verschiebe von Offen zu Abgeschlossen
        setTodosOpen((prev) => prev.filter((todo) => todo.id !== id));
        setTodosCompleted((prev) => [updatedTodo, ...prev]);
      } else {
        // Verschiebe von Abgeschlossen zu Offen
        setTodosCompleted((prev) => prev.filter((todo) => todo.id !== id));
        setTodosOpen((prev) => [updatedTodo, ...prev]);
      }
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Todos:", error);
      alert("Status konnte nicht aktualisiert werden.");
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <form
        onSubmit={handleSearchSubmit}
        className="flex w-full max-w-lg mx-auto gap-2 pt-20"
      >
        <label htmlFor="suchfeld"></label>
        <input
          type="search"
          id="suchfeld"
          name="todoSuche"
          placeholder="Todo suchen..."
          className="flex-grow w-full border border-orange-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-orange-300"
        />
        <button type="submit" className="">
          {/* SVG-Icon für die Lupe */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2} // Linienstärke
            stroke="currentColor"
            className="w-8 h-8" // Größe des Icons
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </form>

      <button
        onClick={() => navigate("/form")}
        className="border border-orange-300 rounded-md px-4 py-2 hover:bg-orange-100 mx-auto"
      >
        Neues To-Do erstellen
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 mt-8 md:mt-20 px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-4xl underline underline-offset-4">Offen</h2>
          <div className="mt-10 w-full">
            {todosOpen.length === 0 ? (
              <p className="text-gray-500 opacity-75 text-center italic">
                Keine offenen To-Dos
              </p>
            ) : (
              <ul>
                {todosOpen.map((todo) => (
                  <li
                    key={todo.id}
                    className="border border-orange-300 bg-orange-200 rounded-md flex justify-between items-center p-2 mb-2 hover:bg-orange-300 transition"
                  >
                    {/* Todo Name - Links */}
                    <Link to={`/todos/${todo.id}`} className="flex-1">
                      <h3 className="text-lg font-medium ">{todo.title}</h3>
                    </Link>

                    {/* Buttons - Ganz rechts */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDeleteTodo(todo.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                      >
                        Löschen
                      </button>
                      <button
                        onClick={() => handleUpdateTodoStatus(todo.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition"
                      >
                        Erledigt
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-4xl underline underline-offset-4">
            Abgeschlossen
          </h2>
          <div className="mt-10 w-full">
            {todosCompleted.length === 0 ? (
              <p className="text-gray-500 opacity-75 text-center italic">
                Noch keine abgeschlossen
              </p>
            ) : (
              <ul>
                {todosCompleted.map((todo) => (
                  <li
                    key={todo.id}
                    className="border border-green-300 bg-green-200 rounded-md flex justify-between items-center p-2 mb-2"
                  >
                    <h3 className="text-lg font-medium">{todo.title}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDeleteTodo(todo.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                      >
                        Löschen
                      </button>
                      <button
                        onClick={() => handleUpdateTodoStatus(todo.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition"
                      >
                        Wieder öffnen
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default TodoPage;
