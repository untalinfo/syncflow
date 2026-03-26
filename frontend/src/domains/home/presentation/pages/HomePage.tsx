import React from 'react';

interface HomePageProps {
  onNavigateToRequest: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigateToRequest }) => {
  return (
    <div className="home-page">
      <h1>Bienvenido a Syncflow</h1>
      <p>Esta aplicación permite guardar y sincronizar solicitudes en modo offline.</p>
      <button className="btn-primary" onClick={onNavigateToRequest}>
        Ir a Solicitudes
      </button>
    </div>
  );
};
