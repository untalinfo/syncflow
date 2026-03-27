import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import CreateRequestModal from "../../../domains/request/presentation/components/CreateRequestModal/CreateRequestModal";
import "./LayoutApp.scss";

const LayoutApp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="layout-app">
      <Sidebar onOpenNewRequest={handleOpenModal} />
      <main className="layout-app__main">
        <Header onOpenNewRequest={handleOpenModal} />
        <div className="layout-app__content">
          <Outlet />
        </div>
      </main>
      
      <CreateRequestModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};

export default LayoutApp;
