import { useState } from 'react';
import { X, FloppyDisk, Bed, Car, Snowflake, HouseLine } from 'phosphor-react';
import { NomeAcomodacao } from '../utils/NomeAcomodacao';
import { useAtlantis } from '../context/AtlantisContext'; 

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const REGRAS_ACOMODACAO: Record<string, { camaCasal: number; camaSolteiro: number; suite: number; garagem: number; climatizacao: boolean }> = {
  [NomeAcomodacao.SolteiroSimples]: { camaCasal: 0, camaSolteiro: 1, suite: 1, garagem: 0, climatizacao: true },
  [NomeAcomodacao.SolteiroMais]:    { camaCasal: 1, camaSolteiro: 0, suite: 1, garagem: 1, climatizacao: true },
  [NomeAcomodacao.CasalSimples]:    { camaCasal: 1, camaSolteiro: 0, suite: 1, garagem: 1, climatizacao: true },
  [NomeAcomodacao.FamiliaSimples]:  { camaCasal: 1, camaSolteiro: 2, suite: 1, garagem: 1, climatizacao: true },
  [NomeAcomodacao.FamiliaMais]:     { camaCasal: 1, camaSolteiro: 5, suite: 2, garagem: 2, climatizacao: true },
  [NomeAcomodacao.FamiliaSuper]:    { camaCasal: 2, camaSolteiro: 6, suite: 3, garagem: 2, climatizacao: true },
};

export default function ModalCadastroAcomodacao({ isOpen, onClose }: ModalProps) {
  const { addAcomodacao } = useAtlantis(); 
  
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    nome: '',
    camaCasal: 0,
    camaSolteiro: 0,
    garagem: 0,
    suite: 0,
    climatizacao: false
  });

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nomeSelecionado = e.target.value;
    const regras = REGRAS_ACOMODACAO[nomeSelecionado];

    if (regras) {
      setFormData({
        nome: nomeSelecionado,
        ...regras
      });
    } else {
        setFormData(prev => ({ ...prev, nome: nomeSelecionado }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome) {
        alert('Por favor, selecione um tipo de acomodação.');
        return;
    }

    addAcomodacao({
        nome: formData.nome as NomeAcomodacao, 
        camaCasal: formData.camaCasal,
        camaSolteiro: formData.camaSolteiro,
        suite: formData.suite,
        garagem: formData.garagem,
        climatizacao: formData.climatizacao
    });

    alert('Acomodação criada com sucesso!');
    setFormData({ nome: '', camaCasal: 0, camaSolteiro: 0, garagem: 0, suite: 0, climatizacao: false });
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
      display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white', padding: '32px', borderRadius: '24px',
        width: '100%', maxWidth: '500px', 
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ backgroundColor: '#FFF7ED', padding: '8px', borderRadius: '8px', color: 'var(--card-orange)' }}>
              <HouseLine size={24} weight="fill" />
            </div>
            <h2 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.5rem' }}>Nova Acomodação</h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div>
            <label style={labelStyle}>Tipo de Acomodação</label>
            <select 
              name="nome" 
              required 
              style={inputStyle} 
              onChange={handleSelectChange}
              value={formData.nome}
            >
              <option value="" disabled>Selecione um tipo...</option>
              {(Object.values(NomeAcomodacao) as string[]).map((nome, index) => (
                <option key={index} value={nome}>{nome}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelStyle}><Bed size={16} weight="bold" /> Camas Casal</label>
              <input type="number" style={disabledInputStyle} value={formData.camaCasal} readOnly />
            </div>
            <div>
              <label style={labelStyle}><Bed size={16} weight="bold" /> Camas Solteiro</label>
              <input type="number" style={disabledInputStyle} value={formData.camaSolteiro} readOnly />
            </div>
            <div>
              <label style={labelStyle}><Car size={16} weight="bold" /> Vagas Garagem</label>
              <input type="number" style={disabledInputStyle} value={formData.garagem} readOnly />
            </div>
            <div>
              <label style={labelStyle}>Suítes</label>
              <input type="number" style={disabledInputStyle} value={formData.suite} readOnly />
            </div>
          </div>

          <div style={{ 
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '16px', backgroundColor: '#F1F5F9', borderRadius: '12px', border: '1px solid #E2E8F0',
            opacity: 0.8 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Snowflake size={24} color={formData.climatizacao ? "#0EA5E9" : "#94A3B8"} weight={formData.climatizacao ? "fill" : "regular"} />
              <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>Possui Ar Condicionado?</span>
            </div>
            <input type="checkbox" checked={formData.climatizacao} disabled style={{ width: '20px', height: '20px', accentColor: '#0EA5E9' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
            <button type="button" onClick={onClose} style={btnSecondaryStyle}>Cancelar</button>
            <button type="submit" style={btnPrimaryStyle}>
              <FloppyDisk size={20} weight="bold" />
              Confirmar Criação
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

const labelStyle = { display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-secondary)' };
const inputStyle = { padding: '12px', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '1rem', outline: 'none', color: 'var(--text-primary)', width: '100%', backgroundColor: 'white' };
const disabledInputStyle = { ...inputStyle, backgroundColor: '#F1F5F9', color: '#64748B', cursor: 'not-allowed' };
const btnPrimaryStyle = { backgroundColor: 'var(--card-orange)', color: 'white', padding: '12px 24px', borderRadius: '12px', border: 'none', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: '0.2s' };
const btnSecondaryStyle = { backgroundColor: 'transparent', color: 'var(--text-secondary)', padding: '12px 24px', borderRadius: '12px', border: '1px solid #E2E8F0', fontWeight: '600', cursor: 'pointer', transition: '0.2s' };