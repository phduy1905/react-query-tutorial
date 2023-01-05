import "./App.css";
import { useRoutes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import MainLayout from "./layouts/MainLayout";
import AddStudent from "./pages/AddStudent";
import About from "./pages/About";

function App() {
  const elements = useRoutes([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/students",
      element: <Students />,
    },
    {
      path: "/students/:id",
      element: <AddStudent />,
    },
    {
      path: "/students/add",
      element: <AddStudent />,
    },
    {
      path: "/about",
      element: <About />,
    },
  ]);
  return (
    <div className="App">
      <MainLayout>{elements}</MainLayout>
    </div>
  );
}

export default App;
