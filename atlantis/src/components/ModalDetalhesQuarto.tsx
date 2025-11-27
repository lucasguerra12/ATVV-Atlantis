import { X, User, CheckCircle } from 'phosphor-react';
import { useAtlantis, type Acomodacao } from '../context/AtlantisContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  quarto: Acomodacao | null;
}

export default function ModalDetalhesQuarto({ isOpen, onClose, quarto }: ModalProps) {
  const { hospedagens, clientes } = useAtlantis();

  if (!isOpen || !quarto) return null;

  // Busca se existe alguma hospedagem ATIVA para este quarto
  const hospedagemAtiva = hospedagens.find(h => h.acomodacaoId === quarto.id && h.status === 'Ativa');
  const clienteHospedado = hospedagemAtiva ? clientes.find(c => c.id === hospedagemAtiva.clienteId) : null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
      display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1200
    }}>
      <div style={{
        backgroundColor: 'white', padding: '32px', borderRadius: '24px',
        width: '100%', maxWidth: '400px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        textAlign: 'center'
      }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
             <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}><X size={24} /></button>
        </div>

        <div style={{ 
            width: '80px', height: '80px', borderRadius: '50%', margin: '0 auto 20px',
            backgroundColor: hospedagemAtiva ? '#FEF2F2' : '#ECFDF5',
            color: hospedagemAtiva ? '#EF4444' : '#10B981',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            {hospedagemAtiva ? <User size={40} weight="fill" /> : <CheckCircle size={40} weight="fill" />}
        </div>

        <h2 style={{ margin: '0 0 8px', color: 'var(--text-primary)' }}>{quarto.nome}</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            {quarto.suite} Suíte(s) • {quarto.climatizacao ? 'Climatizado' : 'Sem Ar'}
        </p>

        <div style={{ padding: '20px', backgroundColor: '#F8FAFC', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
            {hospedagemAtiva && clienteHospedado ? (
                <>
                    <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase' }}>Ocupado Por</span>
                    <p style={{ margin: '8px 0 0', fontSize: '1.2rem', fontWeight: '700', color: '#1E293B' }}>{clienteHospedado.nome}</p>
                    <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: '#64748B' }}>Desde: {hospedagemAtiva.dataEntrada}</p>
                </>
            ) : (
                <>
                    <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#10B981', textTransform: 'uppercase' }}>Status</span>
                    <p style={{ margin: '8px 0 0', fontSize: '1.2rem', fontWeight: '700', color: '#1E293B' }}>Disponível</p>
                    <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: '#64748B' }}>Pronto para check-in</p>
                </>
            )}
        </div>
      </div>
    </div>
  );
}