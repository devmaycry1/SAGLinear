import './Sidebar.css';

const Sidebar = ({ activeView, setActiveView }) => {
    return (
        <aside className="sidebar">
            <div
                className={`nav-item ${activeView === 'pizza' ? 'active' : ''}`}
                onClick={() => setActiveView('pizza')}
            >
                🍕 Pizzaria (Max. Lucro)
            </div>
            <div
                className={`nav-item ${activeView === 'novo' ? 'active' : ''}`}
                onClick={() => setActiveView('novo')}
            >
                🏭 Questão Enade - Nota 3
            </div>
        </aside>
    );
};

export default Sidebar;