import React from "react";
import { useNavigate } from "react-router-dom";
import { RiCloudLine } from "@remixicon/react";
import "./HomePage.scss";

interface HomePageProps {
  onNavigateToRequest?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigateToRequest }) => {
  const navigate = useNavigate();
  return (
    <div className="home-page-container">
      <div className="home-page">
        <div className="home-page__icon">
          <RiCloudLine size={80} />
        </div>
        <h1 className="home-page__title">SyncFlow</h1>
        <p className="home-page__description">
          Administra tus solicitudes con eficiencia. Sincroniza tus datos de forma transparente en línea y fuera de línea.
        </p>
        <button
          className="btn-primary"
          onClick={() => {
            onNavigateToRequest?.();
            navigate("/request");
          }}
        >
          Empezar ahora
        </button>
      </div>
    </div>
  );
};
