import { useState } from 'react';
import { Plus, SignOut, CalendarCheck, User, HouseLine, Eye } from 'phosphor-react';
import ModalCheckIn from '../components/ModalCheckIn';
import ModalDetalhesHospedagem from '../components/ModalDetalhesHospedagem';
import { useAtlantis } from '../context/AtlantisContext';

export default function Hospedagem() {
  const { hospedagens, clientes, acomodacoes, checkOut } = useAtlantis();
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
  const [selectedHospedagemId, setSelectedHospedagemId] = useState<string | null>(null);

  const getNomeCliente = (id: string) => {
    const cliente = clientes.find(c => c.id === id);
    return cliente ? cliente.nome : 'Cliente Removido';
  };

  const getNomeQuarto = (id: string) => {
    const quarto = acomodacoes.find(a => a.id === id);
    return quarto ? quarto.nome : 'Quarto Removido';
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-primary)' }}>Hospedagem</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Controle de Check-in e Check-out.</p>
        </div>

        <button 
          onClick={() => setIsCheckInModalOpen(true)} 
          className="btn-primary" 
          style={{ 
            backgroundColor: 'var(--card-green)', color: 'white', padding: '12px 24px', borderRadius: '12px', border: 'none',
            display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)', cursor: 'pointer'
          }}
        >
          <Plus size={20} weight="bold" />
          Novo Check-in
        </button>
      </div>

      <div style={{ 
        backgroundColor: 'white', borderRadius: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
        border: '1px solid rgba(0,0,0,0.05)', overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
            <tr>
              <th style={thStyle}>HÓSPEDE</th>
              <th style={thStyle}>ACOMODAÇÃO</th>
              <th style={thStyle}>DATA ENTRADA</th>
              <th style={thStyle}>STATUS</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {hospedagens.length === 0 && (
                <tr>
                    <td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                        Nenhuma hospedagem ativa.
                    </td>
                </tr>
            )}

            {hospedagens.map((estadia) => (
              <tr key={estadia.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={tdStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ padding: '8px', backgroundColor: '#EFF6FF', borderRadius: '50%', color: 'var(--card-blue)' }}>
                      <User size={16} weight="bold" />
                    </div>
                    <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>
                        {getNomeCliente(estadia.clienteId)}
                    </span>
                  </div>
                </td>
                <td style={tdStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                    <HouseLine size={18} />
                    <span>{getNomeQuarto(estadia.acomodacaoId)}</span>
                  </div>
                </td>

                <td style={tdStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                    <CalendarCheck size={18} />
                    <span>{estadia.dataEntrada}</span>
                  </div>
                </td>

                <td style={tdStyle}>
                  <span style={{ 
                    padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600',
                    backgroundColor: estadia.status === 'Ativa' ? '#ECFDF5' : '#F1F5F9',
                    color: estadia.status === 'Ativa' ? '#10B981' : '#64748B'
                  }}>
                    {estadia.status}
                  </span>
                </td>

                <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                    <button 
                      style={actionBtnStyle} 
                      onClick={() => setSelectedHospedagemId(estadia.id)} 
                      title="Ver Detalhes"
                    >
                        <Eye size={20} />
                    </button>

                    {estadia.status === 'Ativa' && (
                        <button style={{ 
                        background: 'white', border: '1px solid #EF4444', padding: '8px 16px', 
                        color: '#EF4444', cursor: 'pointer', borderRadius: '8px', fontWeight: '600',
                        fontSize: '0.9rem', transition: '0.2s', display: 'inline-flex', alignItems: 'center', gap: '8px'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#EF4444'; e.currentTarget.style.color = 'white'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#EF4444'; }}
                        onClick={() => {
                            if(confirm('Confirmar Check-out e liberação do quarto?')) {
                                checkOut(estadia.id);
                            }
                        }}
                        >
                        <SignOut size={16} weight="bold" />
                        Check-out
                        </button>
                    )}
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalCheckIn isOpen={isCheckInModalOpen} onClose={() => setIsCheckInModalOpen(false)} />
      <ModalDetalhesHospedagem 
        isOpen={!!selectedHospedagemId} 
        onClose={() => setSelectedHospedagemId(null)} 
        hospedagemId={selectedHospedagemId}
      />
    </div>
  );
}

const thStyle = { padding: '20px 24px', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.85rem', letterSpacing: '0.5px' };
const tdStyle = { padding: '20px 24px' };
const actionBtnStyle = { background: 'none', border: 'none', padding: '8px', color: '#64748B', cursor: 'pointer', borderRadius: '8px', transition: '0.2s' };