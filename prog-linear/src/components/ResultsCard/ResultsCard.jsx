import './ResultsCard.css';

const ResultsCard = ({ resultado, onClose }) => {
    return (
        <div className="results-card">
            <div className="results-header-wrapper">
                <h2 className="results-header">Resultados</h2>
                <button className="close-btn" onClick={onClose} title="Fechar resultados">
                    &times;
                </button>
            </div>
            <div className="results-body">

                <div className="box-highlight">
                    <span>Lucro Máximo Estimado:</span>
                    <span className="value">R$ {resultado.lucroMaximo.toFixed(2)}</span>
                </div>

                <div className="box-standard">
                    <span>Total de Pizzas:</span>
                    <span className="value">{resultado.totalPizzas}</span>
                </div>

                <div className="pizza-split">
                    <span>Muçarela: {resultado.mucarela}</span>
                    <span>Calabresa: {resultado.calabresa}</span>
                </div>

                <div className="sobras-container">
                    <h4 className="sobras-title">Sobras no Estoque</h4>
                    <div className="sobra-item">
                        <span>Sobra de Massa:</span>
                        <strong className="sobra-value">{resultado.sobras.massa} kg</strong>
                    </div>
                    <div className="sobra-item">
                        <span>Sobra de Queijo:</span>
                        <strong className="sobra-value">{resultado.sobras.queijo} kg</strong>
                    </div>
                    <div className="sobra-item">
                        <span>Sobra de Molho:</span>
                        <strong className="sobra-value">{resultado.sobras.molho} kg</strong>
                    </div>
                    <div className="sobra-item">
                        <span>Sobra de Calabresa:</span>
                        <strong className="sobra-value">{resultado.sobras.calabresa} kg</strong>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ResultsCard;