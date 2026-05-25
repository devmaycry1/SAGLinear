import { useState } from 'react';
import solver from 'javascript-lp-solver';
import InputForm from '../InputForm/InputForm.jsx';
import ResultsCard from '../ResultsCard/ResultsCard.jsx';
import './PizzaAdvisor.css';

const PizzaAdvisor = () => {
    const [estoque, setEstoque] = useState({
        massa: '',
        queijo: '',
        molho: '',
        calabresa: ''
    });

    const [resultado, setResultado] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEstoque(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const calcularProducao = () => {
        const estoqueNumerico = {
            massa: parseFloat(estoque.massa) || 0,
            queijo: parseFloat(estoque.queijo) || 0,
            molho: parseFloat(estoque.molho) || 0,
            calabresa: parseFloat(estoque.calabresa) || 0,
        };

        const modelo = {
            optimize: "lucro",
            opType: "max",
            constraints: {
                massa: { max: estoqueNumerico.massa },
                queijo: { max: estoqueNumerico.queijo },
                molho: { max: estoqueNumerico.molho },
                calabresa: { max: estoqueNumerico.calabresa }
            },
            variables: {
                mucarela: { lucro: 20, massa: 0.5, queijo: 0.3, molho: 0.2, calabresa: 0 },
                calabresa: { lucro: 25, massa: 0.5, queijo: 0.2, molho: 0.2, calabresa: 0.15 }
            },
            ints: { mucarela: 1, calabresa: 1 }
        };

        const solucao = solver.Solve(modelo);

        const qtdMucarela = solucao.mucarela || 0;
        const qtdCalabresa = solucao.calabresa || 0;

        const massaUsada = (qtdMucarela * 0.5) + (qtdCalabresa * 0.5);
        const queijoUsado = (qtdMucarela * 0.3) + (qtdCalabresa * 0.2);
        const molhoUsado = (qtdMucarela * 0.2) + (qtdCalabresa * 0.2);
        const calabresaUsada = (qtdCalabresa * 0.15);

        setResultado({
            lucroMaximo: solucao.result,
            mucarela: qtdMucarela,
            calabresa: qtdCalabresa,
            totalPizzas: qtdMucarela + qtdCalabresa,
            sobras: {
                massa: (estoqueNumerico.massa - massaUsada).toFixed(2),
                queijo: (estoqueNumerico.queijo - queijoUsado).toFixed(2),
                molho: (estoqueNumerico.molho - molhoUsado).toFixed(2),
                calabresa: (estoqueNumerico.calabresa - calabresaUsada).toFixed(2)
            }
        });
    };

    const fecharResultado = () => {
        setResultado(null);
    };

   return (
    <div className="advisor-container">
      <InputForm 
        estoque={estoque} 
        onChange={handleInputChange} 
        onCalculate={calcularProducao} 
      />
      {resultado && <ResultsCard resultado={resultado} onClose={fecharResultado} />}
    </div>
  );
};

export default PizzaAdvisor;