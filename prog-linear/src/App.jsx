import { useState } from 'react';
import PizzaAdvisor from './components/PizzaAdvisor/PizzaAdvisor';
import NovaCalculadora from './components/CustoMin/CustoMin';
import Sidebar from './components/Sidebar/Sidebar';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeView, setActiveView] = useState('pizza'); 
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app-wrapper ${darkMode ? 'theme-dark' : 'theme-light'}`}>

      <header className="app-header">
        <h1>Programação Linear</h1>
        <button className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? '☀️ Modo Claro' : '🌙 Modo Escuro'}
        </button>
      </header>

      <div className="app-body">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />

        <main className="app-main">
          {activeView === 'pizza' && <PizzaAdvisor />}
          {activeView === 'novo' && <NovaCalculadora />}
        </main>
      </div>

      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} - Sistema de Apoio a Gestão - SAG.</p>
      </footer>

    </div>
  );
}

export default App;