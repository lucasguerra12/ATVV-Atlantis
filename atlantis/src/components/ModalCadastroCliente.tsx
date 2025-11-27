import { useState, useEffect } from 'react';
import { X, FloppyDisk, Plus, Trash } from 'phosphor-react';
import { useAtlantis, type Cliente, type Dependente } from '../context/AtlantisContext';
import { TipoDocumento } from '../utils/TipoDocumento';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  clienteParaEditar?: Cliente | null;
}

export default function ModalCadastroCliente({ isOpen, onClose, clienteParaEditar }: ModalProps) {
  const { addCliente, updateCliente } = useAtlantis();

  const [tipoDocSelecionado, setTipoDocSelecionado] = useState<string>('CPF');

  const [formData, setFormData] = useState({
    nome: '', 
    nomeSocial: '', 
    dataNascimento: '', 
    cpf: '', 
    telefone: '', 
    rua: '', 
    bairro: '', 
    cidade: '', 
    estado: '', 
    cep: ''
  });

  const [dependentes, setDependentes] = useState<Dependente[]>([]);
  const [novoDependente, setNovoDependente] = useState({ nome: '', cpf: '', dataNascimento: '' });

  useEffect(() => {
    if (isOpen && clienteParaEditar) {
      setFormData({
        nome: clienteParaEditar.nome,
        nomeSocial: clienteParaEditar.nomeSocial,
        dataNascimento: clienteParaEditar.dataNascimento, 
        cpf: clienteParaEditar.cpf,
        telefone: clienteParaEditar.telefones && clienteParaEditar.telefones.length > 0 ? clienteParaEditar.telefones[0] : '',
        rua: clienteParaEditar.endereco.rua,
        bairro: clienteParaEditar.endereco.bairro,
        cidade: clienteParaEditar.endereco.cidade,
        estado: clienteParaEditar.endereco.estado,
        cep: clienteParaEditar.endereco.cep
      });
      setDependentes(clienteParaEditar.dependentes || []);
    } else if (isOpen && !clienteParaEditar) {
      setFormData({ nome: '', nomeSocial: '', dataNascimento: '', cpf: '', telefone: '', rua: '', bairro: '', cidade: '', estado: '', cep: '' });
      setDependentes([]);
    }
  }, [isOpen, clienteParaEditar]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddDependente = () => {
    if (novoDependente.nome && novoDependente.cpf) {
      setDependentes([...dependentes, { ...novoDependente, id: Math.random().toString() }]);
      setNovoDependente({ nome: '', cpf: '', dataNascimento: '' });
    }
  };

  const handleRemoveDependente = (id: string) => {
    setDependentes(dependentes.filter(d => d.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const dadosBase = {
      nome: formData.nome, 
      nomeSocial: formData.nomeSocial, 
      cpf: formData.cpf, 
      dataNascimento: formData.dataNascimento, 
      telefones: [formData.telefone], 
      dependentes: dependentes,
      endereco: { 
        rua: formData.rua, 
        bairro: formData.bairro, 
        cidade: formData.cidade, 
        estado: formData.estado, 
        cep: formData.cep 
      }
    };

    if (clienteParaEditar) {
      updateCliente(clienteParaEditar.id, dadosBase);
      alert('Cliente atualizado!');
    } else {
      addCliente(dadosBase);
      alert('Cliente cadastrado!');
    }
    onClose();
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '24px', width: '100%', maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ margin: 0, color: 'var(--text-primary)' }}>{clienteParaEditar ? 'Editar Hóspede' : 'Novo Hóspede'}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}><X size={24} /></button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h4 style={sectionTitle}>Dados Pessoais</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <input name="nome" placeholder="Nome Completo" required style={inputStyle} onChange={handleChange} value={formData.nome} />
            <input name="nomeSocial" placeholder="Nome Social" style={inputStyle} onChange={handleChange} value={formData.nomeSocial} />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr 1fr', gap: '16px', alignItems: 'end' }}>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={labelStyle}>Tipo Doc</label>
                <select 
                    style={inputStyle} 
                    value={tipoDocSelecionado} 
                    onChange={(e) => setTipoDocSelecionado(e.target.value)}
                >
                    {Object.keys(TipoDocumento).map(key => (
                        <option key={key} value={key}>{key}</option>
                    ))}
                </select>
             </div>

             <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={labelStyle}>Número</label>
                <input 
                    name="cpf" 
                    placeholder={`Nº do ${tipoDocSelecionado}`} 
                    required 
                    style={inputStyle} 
                    onChange={handleChange} 
                    value={formData.cpf} 
                />
             </div>

             <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={labelStyle}>Data de Nascimento</label>
                <input 
                    name="dataNascimento" 
                    type="date" 
                    required 
                    style={inputStyle} 
                    onChange={handleChange} 
                    value={formData.dataNascimento} 
                />
             </div>
          </div>

          <input name="telefone" placeholder="Telefone Principal" required style={inputStyle} onChange={handleChange} value={formData.telefone} />
          
          <h4 style={sectionTitle}>Endereço</h4>
          <input name="rua" placeholder="Rua e Número" required style={inputStyle} onChange={handleChange} value={formData.rua} />
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <input name="bairro" placeholder="Bairro" required style={inputStyle} onChange={handleChange} value={formData.bairro} />
            <input name="cep" placeholder="CEP" required style={inputStyle} onChange={handleChange} value={formData.cep} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
            <input name="cidade" placeholder="Cidade" required style={inputStyle} onChange={handleChange} value={formData.cidade} />
            <input name="estado" placeholder="UF" required style={inputStyle} onChange={handleChange} value={formData.estado} />
          </div>

          <h4 style={sectionTitle}>Dependentes ({dependentes.length})</h4>
          
          <div style={{ backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
            {dependentes.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                {dependentes.map(dep => (
                    <div key={dep.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: '10px 16px', borderRadius: '8px', fontSize: '0.9rem', border: '1px solid #F1F5F9' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{dep.nome}</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>CPF: {dep.cpf}</span>
                    </div>
                    <button type="button" onClick={() => handleRemoveDependente(dep.id)} style={{ color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer' }}><Trash size={18} /></button>
                    </div>
                ))}
                </div>
            )}

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input placeholder="Nome do Dependente" style={{...inputStyle, flex: 2}} value={novoDependente.nome} onChange={e => setNovoDependente({...novoDependente, nome: e.target.value})} />
                <input placeholder="CPF / Doc" style={{...inputStyle, flex: 1}} value={novoDependente.cpf} onChange={e => setNovoDependente({...novoDependente, cpf: e.target.value})} />
                <button type="button" onClick={handleAddDependente} style={{ backgroundColor: '#10B981', color: 'white', border: 'none', borderRadius: '8px', padding: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><Plus size={20} /></button>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
            <button type="button" onClick={onClose} style={btnSecondaryStyle}>Cancelar</button>
            <button type="submit" style={btnPrimaryStyle}><FloppyDisk size={20} weight="bold" /> Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const sectionTitle = { margin: '8px 0 4px', color: 'var(--card-blue)', fontSize: '0.9rem', textTransform: 'uppercase' as const, letterSpacing: '1px' };
const inputStyle = { padding: '12px 16px', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '1rem', outline: 'none', color: 'var(--text-primary)', width: '100%', backgroundColor: 'white' };
const labelStyle = { fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600', marginLeft: '4px' }; // Novo estilo para labels
const btnPrimaryStyle = { backgroundColor: 'var(--card-blue)', color: 'white', padding: '12px 24px', borderRadius: '12px', border: 'none', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' };
const btnSecondaryStyle = { backgroundColor: 'transparent', color: 'var(--text-secondary)', padding: '12px 24px', borderRadius: '12px', border: '1px solid #E2E8F0', fontWeight: '600', cursor: 'pointer' };