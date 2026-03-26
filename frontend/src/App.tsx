import { RouterProvider } from "react-router-dom";
import "./App.css";
import { RequestProvider } from "./domains/request/presentation/DependencyProvider";
import router from "./shared/presentation/components/Router/Router";

function App() {
  return (
    <RequestProvider>
      <div className="app-container">
        <RouterProvider router={router} />
      </div>
    </RequestProvider>
  );
}

export default App;
