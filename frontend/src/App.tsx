import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import TodoPage from "./pages/TodoPage";
import TodoFormPage from "./pages/TodoFormPage";
import TodoDetailPage from "./pages/TodoDetailPage";

const AppContent: React.FC = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<TodoPage />} />
          <Route path="/form" element={<TodoFormPage />} />
          <Route path="/todos/:id" element={<TodoDetailPage />} />
        </Routes>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
      <AppContent />
  );
}

export default App;