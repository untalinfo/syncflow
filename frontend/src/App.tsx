import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { HomePage } from "./domains/home/presentation/pages/HomePage";
import { RequestPage } from "./domains/request/presentation/pages/RequestPage";
import { RequestProvider } from "./domains/request/presentation/DependencyProvider";

function App() {
  return (
    <RequestProvider>
      <BrowserRouter>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/request" element={<RequestPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </RequestProvider>
  );
}

export default App;
