import './InputForm.css';

const InputForm = ({ estoque, onChange, onCalculate }) => {
    return (
        <div className="form-card">
            <h2 className="form-header">Seu Estoque</h2>
            <div className="form-body">
                <div className="form-row">
                    <div className="input-group">
                        <label className="input-label">Estoque Massa (kg)</label>
                        <input type="number" name="massa" className="input-field" value={estoque.massa} onChange={onChange} />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Estoque Queijo (kg)</label>
                        <input type="number" name="queijo" className="input-field" value={estoque.queijo} onChange={onChange} />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Estoque Molho (kg)</label>
                        <input type="number" name="molho" className="input-field" value={estoque.molho} onChange={onChange} />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Estoque Calabresa (kg)</label>
                        <input type="number" name="calabresa" className="input-field" value={estoque.calabresa} onChange={onChange} step="0.1" />
                    </div>
                </div>
                <button className="btn-calculate" onClick={onCalculate}>
                    Calcular
                </button>
            </div>
        </div>
    );
};

export default InputForm;