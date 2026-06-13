import { useState } from 'react';
import solver from 'javascript-lp-solver';
import './CustoMin.css';

const CustoMin = () => {
  const [demanda, setDemanda] = useState({
    desktops: 16000,
    notebooks: 6000,
    netbooks: 28000
  });

  const [resultado, setResultado] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDemanda(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calcularMinimizacao = () => {
    const demandaNumerica = {
      desktops: parseFloat(demanda.desktops) || 0,
      notebooks: parseFloat(demanda.notebooks) || 0,
      netbooks: parseFloat(demanda.netbooks) || 0,
    };

    const modelo = {
      optimize: "custo",
      opType: "min", // Atenção aqui: 'min' para MINIMIZAR os custos
      constraints: {
        desktops: { min: demandaNumerica.desktops },
        notebooks: { min: demandaNumerica.notebooks },
        netbooks: { min: demandaNumerica.netbooks }
      },
      variables: {
        manaus: { 
          custo: 150000, 
          desktops: 8000, 
          notebooks: 1000, 
          netbooks: 2000 
        },
        sul: { 
          custo: 210000, 
          desktops: 2000, 
          notebooks: 1000, 
          netbooks: 7000 
        }
      }
    };

    const solucao = solver.Solve(modelo);
    const diasManaus = solucao.manaus || 0;
    const diasSul = solucao.sul || 0;

    
    const prodDesktops = (diasManaus * 8000) + (diasSul * 2000);
    const prodNotebooks = (diasManaus * 1000) + (diasSul * 1000);
    const prodNetbooks = (diasManaus * 2000) + (diasSul * 7000);

    setResultado({
      custoMinimo: solucao.result,
      diasManaus: diasManaus,
      diasSul: diasSul,
      produzido: {
        desktops: prodDesktops,
        notebooks: prodNotebooks,
        netbooks: prodNetbooks
      }
    });
  };

  return (
    <div className="enade-container">
      
      <div className="enade-card">
        <h2 className="enade-header">Fábrica de Computadores</h2>
        <div className="enade-body">
          <h3 className="input-section-title">Demanda a ser entregue (unidades)</h3>
          
          <div className="demand-grid">
            <div className="demand-item">
              <label className="demand-label">Desktops</label>
              <input type="number" name="desktops" className="demand-input" value={demanda.desktops} onChange={handleInputChange} />
            </div>
            <div className="demand-item">
              <label className="demand-label">Notebooks</label>
              <input type="number" name="notebooks" className="demand-input" value={demanda.notebooks} onChange={handleInputChange} />
            </div>
            <div className="demand-item">
              <label className="demand-label">Netbooks</label>
              <input type="number" name="netbooks" className="demand-input" value={demanda.netbooks} onChange={handleInputChange} />
            </div>
          </div>

          <button className="btn-calculate" onClick={calcularMinimizacao}>
            Calcular Custo Mínimo
          </button>
        </div>
      </div>

      {resultado && (
        <div className="enade-card">
          <div style={{ position: 'relative' }}>
            <h2 className="enade-header" style={{ background: 'transparent', color: '#4f46e5', borderBottom: '1px solid var(--border-color)' }}>
              Relatório de Operação
            </h2>
            <button 
              onClick={() => setResultado(null)} 
              style={{ position: 'absolute', right: '16px', top: '24px', background: 'transparent', border: 'none', fontSize: '24px', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              &times;
            </button>
          </div>

          <div className="enade-body">
            
            <div className="result-highlight">
              <span>Custo Mínimo Total:</span>
              <span className="value">
                {resultado.custoMinimo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>

            <div className="factory-days">
              <span>Fábrica Manaus: {resultado.diasManaus.toFixed(1)} dias</span>
              <span>Fábrica Sul: {resultado.diasSul.toFixed(1)} dias</span>
            </div>

            <h3 className="input-section-title">Volume Fabricado vs Demanda</h3>
            <div className="production-list">
              <div className="production-item">
                <span>Desktops:</span>
                <strong>{resultado.produzido.desktops.toLocaleString('pt-BR')} / {demanda.desktops}</strong>
              </div>
              <div className="production-item">
                <span>Notebooks:</span>
                <strong>{resultado.produzido.notebooks.toLocaleString('pt-BR')} / {demanda.notebooks}</strong>
              </div>
              <div className="production-item">
                <span>Netbooks:</span>
                <strong>{resultado.produzido.netbooks.toLocaleString('pt-BR')} / {demanda.netbooks}</strong>
              </div>
            </div>

          </div>
        </div>
      )}
      
    </div>
  );
};

export default CustoMin;