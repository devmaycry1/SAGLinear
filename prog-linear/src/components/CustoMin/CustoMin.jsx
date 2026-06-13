import { useState } from 'react';
import solver from 'javascript-lp-solver';
import './CustoMin.css';

const NovaCalculadora = () => {
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
      opType: "min", 
      constraints: {
        desktops: { min: demandaNumerica.desktops },
        notebooks: { min: demandaNumerica.notebooks },
        netbooks: { min: demandaNumerica.netbooks }
      },
      variables: {
        manaus: { custo: 150000, desktops: 8000, notebooks: 1000, netbooks: 2000 },
        sul: { custo: 210000, desktops: 2000, notebooks: 1000, netbooks: 7000 }
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
    <div className="enade-wrapper">
      
      {/* COLUNA ESQUERDA: Fórmulas Matemáticas */}
      <aside className="math-side-panel">
        <div className="math-model-box">
          <h4 className="math-title">Modelagem Matemática</h4>
          
          <div className="math-line">
            <span className="math-label">Objetivo:</span>
            <span className="math-equation">Min Z = 150.000x₁ + 210.000x₂</span>
          </div>
          
          <div className="math-line">
            <span className="math-label">Restrições (Produção Mínima):</span>
            <div className="math-constraints">
              <span>8.000x₁ + 2.000x₂ ≥ {demanda.desktops || 0} <small>(Desktops)</small></span>
              <span>1.000x₁ + 1.000x₂ ≥ {demanda.notebooks || 0} <small>(Notebooks)</small></span>
              <span>2.000x₁ + 7.000x₂ ≥ {demanda.netbooks || 0} <small>(Netbooks)</small></span>
              <span>x₁, x₂ ≥ 0 <small>(Não-negatividade)</small></span>
            </div>
          </div>
          
          <div className="math-legend">
            <small><strong>x₁</strong> = Dias de operação em Manaus</small><br/>
            <small><strong>x₂</strong> = Dias de operação no Sul</small>
          </div>
        </div>
      </aside>

      {/* COLUNA DIREITA: Calculadora e Resultados */}
      <div className="calculator-side">
        
        {/* Formulário */}
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

        {/* Resultados */}
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
      
    </div>
  );
};

export default NovaCalculadora;