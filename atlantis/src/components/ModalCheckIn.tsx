import { useState } from 'react';
import { X, User, HouseLine, Check, MagnifyingGlass } from 'phosphor-react';
import { useAtlantis } from '../context/AtlantisContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalCheckIn({ isOpen, onClose }: ModalProps) {
  const { clientes, acomodacoes, checkIn, hospedagens } = useAtlantis();
  
  const [selectedClienteId, setSelectedClienteId] = useState<string | null>(null);
  const [selectedQuartoId, setSelectedQuartoId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const clientesFiltrados = clientes.filter(c => 
    c.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.cpf.includes(searchTerm)
  );

  const quartosDisponiveis = acomodacoes.filter(quarto => {
    return !hospedagens.some(h => h.acomodacaoId === quarto.id && h.status === 'Ativa');
  });

  const handleConfirm = () => {
    if (selectedClienteId && selectedQuartoId) {
      checkIn(selectedClienteId, selectedQuartoId);
      alert('Check-in realizado com sucesso!');
      onClose();
      setSelectedClienteId(null);
      setSelectedQuartoId(null);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
      display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white', padding: '32px', borderRadius: '24px',
        width: '100%', maxWidth: '900px', height: '80vh',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <h2 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.8rem' }}>Novo Check-in</h2>
            <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)' }}>Selecione um hóspede e vincule a uma acomodação disponível.</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
            <X size={24} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', flex: 1, overflow: 'hidden' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflow: 'hidden' }}>
            <h4 style={sectionTitleStyle}>1. Selecione o Hóspede</h4>
            
            <div style={searchBoxStyle}>
              <MagnifyingGlass size={20} color="#94A3B8" />
              <input 
                placeholder="Buscar por nome ou CPF..." 
                style={searchInputStyle}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div style={listContainerStyle}>
              {clientesFiltrados.length === 0 && <p style={{color:'#94A3B8', textAlign:'center', marginTop: '20px'}}>Nenhum cliente encontrado.</p>}
              
              {clientesFiltrados.map(cliente => (
                <div 
                  key={cliente.id}
                  onClick={() => setSelectedClienteId(cliente.id)}
                  style={{
                    ...itemStyle,
                    ...(selectedClienteId === cliente.id ? selectedItemStyle : {})
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ padding: '10px', borderRadius: '50%', backgroundColor: '#F1F5F9', color: '#64748B' }}>
                      <User size={24} />
                    </div>
                    <div>
                      <p style={{ margin: 0, fontWeight: '600', color: 'var(--text-primary)' }}>{cliente.nome}</p>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{cliente.cpf}</p>
                    </div>
                  </div>
                  {selectedClienteId === cliente.id && <Check size={24} color="#10B981" weight="bold" />}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflow: 'hidden' }}>
            <h4 style={sectionTitleStyle}>2. Selecione a Acomodação</h4>
            
            <div style={listContainerStyle}>
              {quartosDisponiveis.length === 0 ? (
                <div style={{textAlign: 'center', color: '#94A3B8', marginTop: '20px'}}>
                    <p>Nenhum quarto disponível no momento.</p>
                    <small>Faça check-out ou crie novas acomodações.</small>
                </div>
              ) : (
                quartosDisponiveis.map(quarto => (
                    <div 
                    key={quarto.id}
                    onClick={() => setSelectedQuartoId(quarto.id)}
                    style={{
                        ...itemStyle,
                        ...(selectedQuartoId === quarto.id ? selectedItemStyle : {})
                    }}
                    >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ padding: '10px', borderRadius: '12px', backgroundColor: '#FFF7ED', color: 'var(--card-orange)' }}>
                        <HouseLine size={24} weight="fill" />
                        </div>
                        <div>
                        <p style={{ margin: 0, fontWeight: '600', color: 'var(--text-primary)' }}>{quarto.nome}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            <span>{quarto.camaCasal > 0 ? `${quarto.camaCasal} Casal` : `${quarto.camaSolteiro} Solt.`} • {quarto.climatizacao ? 'Ar Cond.' : 'Sem Ar'}</span>
                        </div>
                        </div>
                    </div>
                    {selectedQuartoId === quarto.id && <Check size={24} color="#10B981" weight="bold" />}
                    </div>
                ))
              )}
            </div>
          </div>

        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '32px', borderTop: '1px solid #F1F5F9', paddingTop: '24px' }}>
          <button onClick={onClose} style={btnSecondaryStyle}>Cancelar</button>
          <button 
            onClick={handleConfirm}
            disabled={!selectedClienteId || !selectedQuartoId} 
            style={{
              ...btnPrimaryStyle,
              opacity: (!selectedClienteId || !selectedQuartoId) ? 0.5 : 1,
              cursor: (!selectedClienteId || !selectedQuartoId) ? 'not-allowed' : 'pointer'
            }}
          >
            Confirmar Check-in
          </button>
        </div>

      </div>
    </div>
  );
}

const sectionTitleStyle = { margin: 0, fontSize: '1rem', fontWeight: '600', color: 'var(--text-primary)', textTransform: 'uppercase' as const, letterSpacing: '0.5px' };
const searchBoxStyle = { display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' };
const searchInputStyle = { border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '1rem', color: 'var(--text-primary)' };
const listContainerStyle = { display: 'flex', flexDirection: 'column' as const, gap: '12px', overflowY: 'auto' as const, paddingRight: '8px', flex: 1 };
const itemStyle = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderRadius: '16px', border: '1px solid #E2E8F0', cursor: 'pointer', transition: 'all 0.2s', backgroundColor: 'white' };
const selectedItemStyle = { borderColor: '#10B981', backgroundColor: '#ECFDF5', boxShadow: '0 0 0 2px rgba(16, 185, 129, 0.1)' };
const btnPrimaryStyle = { backgroundColor: '#10B981', color: 'white', padding: '14px 32px', borderRadius: '12px', border: 'none', fontWeight: '600', fontSize: '1rem', transition: '0.2s' };
const btnSecondaryStyle = { backgroundColor: 'transparent', color: 'var(--text-secondary)', padding: '14px 24px', borderRadius: '12px', border: '1px solid #E2E8F0', fontWeight: '600', cursor: 'pointer', fontSize: '1rem', transition: '0.2s' };