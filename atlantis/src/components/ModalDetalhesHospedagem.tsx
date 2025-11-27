import { X, User, HouseLine, Users, CalendarCheck, MapPin } from 'phosphor-react';
import { useAtlantis } from '../context/AtlantisContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  hospedagemId: string | null;
}

export default function ModalDetalhesHospedagem({ isOpen, onClose, hospedagemId }: ModalProps) {
  const { hospedagens, clientes, acomodacoes } = useAtlantis();

  if (!isOpen || !hospedagemId) return null;

  const hospedagem = hospedagens.find(h => h.id === hospedagemId);
  if (!hospedagem) return null;

  const cliente = clientes.find(c => c.id === hospedagem.clienteId);
  const quarto = acomodacoes.find(a => a.id === hospedagem.acomodacaoId);

  if (!cliente || !quarto) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
      display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1100
    }}>
      <div style={{
        backgroundColor: 'white', padding: '0', borderRadius: '24px',
        width: '100%', maxWidth: '600px', overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}>
        <div style={{ backgroundColor: '#0F172A', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
                <h2 style={{ margin: 0, color: 'white', fontSize: '1.4rem' }}>Detalhes da Hospedagem</h2>
                <span style={{ 
                    marginTop: '8px', display: 'inline-block',
                    padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700',
                    backgroundColor: hospedagem.status === 'Ativa' ? '#10B981' : '#64748B', 
                    color: '#fff'
                }}>
                    {hospedagem.status.toUpperCase()}
                </span>
            </div>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}>
                <X size={24} />
            </button>
        </div>

        <div style={{ padding: '32px' }}>
            
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginBottom: '32px' }}>
                <div style={{ padding: '16px', backgroundColor: '#EFF6FF', borderRadius: '50%', color: 'var(--card-blue)' }}>
                    <User size={32} weight="fill" />
                </div>
                <div>
                    <h4 style={{ margin: '0 0 4px', fontSize: '0.9rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '1px' }}>Titular</h4>
                    <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: '700', color: '#1E293B' }}>{cliente.nome}</p>
                    <p style={{ margin: '4px 0 0', color: '#64748B' }}>CPF/Doc: {cliente.cpf}</p>
                    {cliente.telefones.length > 0 && <p style={{ margin: '4px 0 0', color: '#64748B' }}>{cliente.telefones[0]}</p>}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                <div style={infoBoxStyle}>
                    <HouseLine size={24} color="#F97316" />
                    <div>
                        <span style={labelStyle}>Acomodação</span>
                        <p style={valueStyle}>{quarto.nome}</p>
                    </div>
                </div>
                <div style={infoBoxStyle}>
                    <CalendarCheck size={24} color="#10B981" />
                    <div>
                        <span style={labelStyle}>Entrada</span>
                        <p style={valueStyle}>{hospedagem.dataEntrada}</p>
                    </div>
                </div>
                <div style={infoBoxStyle}>
                    <MapPin size={24} color="#8B5CF6" />
                    <div>
                        <span style={labelStyle}>Localização</span>
                        <p style={valueStyle}>{cliente.endereco.cidade} - {cliente.endereco.estado}</p>
                    </div>
                </div>
            </div>

            <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <Users size={20} color="#64748B" />
                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '600', color: '#334155' }}>Dependentes Hospedados</h4>
                </div>
                
                {(!cliente.dependentes || cliente.dependentes.length === 0) ? (
                    <p style={{ color: '#94A3B8', fontStyle: 'italic', marginLeft: '28px' }}>Nenhum dependente registrado.</p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginLeft: '8px' }}>
                        {cliente.dependentes.map(dep => (
                            <div key={dep.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                                <span style={{ fontWeight: '500', color: '#1E293B' }}>{dep.nome}</span>
                                <span style={{ fontSize: '0.9rem', color: '#64748B' }}>Doc: {dep.cpf}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
      </div>
    </div>
  );
}

const infoBoxStyle = { display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '12px' };
const labelStyle = { display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#94A3B8', textTransform: 'uppercase' as const, marginBottom: '2px' };
const valueStyle = { margin: 0, fontWeight: '600', color: '#334155' };