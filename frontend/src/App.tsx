import { useState } from 'react';
import './App.css';
import { HomePage } from './domains/home/presentation/pages/HomePage';
import { RequestPage } from './domains/request/presentation/pages/RequestPage';

function App() {
  const [page, setPage] = useState<'home' | 'request'>('home');

  return (
    <div className="app-container">
      {page === 'home' && <HomePage onNavigateToRequest={() => setPage('request')} />}
      {page === 'request' && <RequestPage onNavigateHome={() => setPage('home')} />}
    </div>
  );
}

export default App;
