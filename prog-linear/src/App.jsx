import { useState } from 'react';
import PizzaAdvisor from './components/PizzaAdvisor/PizzaAdvisor';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    
    < div className = {`app-wrapper ${darkMode ? 'theme-dark' : 'theme-light'}`
}>

  < header className = "app-header" >
        <h1>Programação Linear</h1>
        <button className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? '☀️ Modo Claro' : '🌙 Modo Escuro'}
        </button>
      </header >

  < main className = "app-main" >
    <PizzaAdvisor />
      </main >
  < footer className = "app-footer" >
    <p>&copy; {new Date().getFullYear()} - Sistemas de Apoio a Gestão</p>
      </footer >

    </div >
  );
}

export default App;