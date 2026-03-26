import React from "react";
import { useNavigate } from "react-router-dom";

interface HomePageProps {
  onNavigateToRequest?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigateToRequest }) => {
  const navigate = useNavigate();
  return (
    <div className="home-page">
      <h1>Bienvenido a Syncflow</h1>
      <p>
        Esta aplicación permite guardar y sincronizar solicitudes en modo
        offline.
      </p>
      <button
        className="btn-primary"
        onClick={() => {
          onNavigateToRequest?.();
          navigate("/request");
        }}
      >
        Ir a Solicitudes
      </button>
    </div>
  );
};
