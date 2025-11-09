// frontend/src/services/api.ts
import axios from 'axios';
import type { Todo, TodoCreateInput, TodoUpdateInputTitleDescription } from '../types/Todo';

// Die Basis-URL zu Ihrem Django-Backend
const API_URL = 'http://127.0.0.1:8000/api/todos/';

// --- READ (GET): Alle To-Dos abrufen ---
export const getTodos = async (params: { search?: string; status?: string }): Promise<Todo[]> => {
    const response = await axios.get<Todo[]>(API_URL, { params });
    return response.data;
};

// --- CREATE (POST): Neues To-Do erstellen ---
export const createTodo = async (todoData: TodoCreateInput): Promise<Todo> => {
    const response = await axios.post<Todo>(API_URL, todoData);
    return response.data;
};

// --- DELETE (DELETE): To-Do löschen ---
export const deleteTodo = async (id: number): Promise<void> => {
    // Sendet an den Detail-Endpunkt: /api/todos/{id}/
    await axios.delete(`${API_URL}${id}/`); 
};

// --- UPDATE (PATCH): To-Do aktualisieren ---
export const updateTodoTitleDescription = async (id: number, todoData: Partial<TodoUpdateInputTitleDescription>): Promise<Todo> => {
    // PATCH erlaubt das Senden von nur einem Teil des Objekts
    const response = await axios.patch<Todo>(`${API_URL}${id}/`, todoData);
    return response.data;
};
// --- UPDATE (PATCH): To-Do-Status aktualisieren ---
export const updateTodoStatus = async (id: number, status: string): Promise<Todo> => {
    const response = await axios.patch<Todo>(`${API_URL}${id}/`, { status });
    return response.data;
}
// --- READ (GET): Einzelnes To-Do nach ID abrufen ---
export const getTodoById = async (id: number): Promise<Todo> => {
    const response = await axios.get<Todo>(`${API_URL}${id}/`);
    return response.data;
}