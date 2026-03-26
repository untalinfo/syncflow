import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import "./LayoutApp.scss";

const LayoutApp = () => {
  return (
    <div className="layout-app">
      <Sidebar />
      <main className="layout-app__main">
        <Header />
        <div className="layout-app__content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default LayoutApp;
