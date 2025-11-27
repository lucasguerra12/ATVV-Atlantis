import { X, Bed, Car, Snowflake, Bathtub, Info } from 'phosphor-react';
import { NomeAcomodacao } from '../utils/NomeAcomodacao';
import { REGRAS_ACOMODACAO } from '../utils/RegrasAcomodacao';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  tipo: NomeAcomodacao | null;
}

export default function ModalDetalhesTipoAcomodacao({ isOpen, onClose, tipo }: ModalProps) {
  if (!isOpen || !tipo) return null;

  const regras = REGRAS_ACOMODACAO[tipo];

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
      display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1300
    }}>
      <div style={{
        backgroundColor: 'white', borderRadius: '24px', padding: '32px',
        width: '100%', maxWidth: '450px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        position: 'relative'
      }}>
        
        <button 
            onClick={onClose} 
            style={{ position: 'absolute', top: 24, right: 24, background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}
        >
            <X size={24} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ 
                width: '64px', height: '64px', backgroundColor: '#EFF6FF', 
                color: 'var(--card-blue)', borderRadius: '50%', margin: '0 auto 16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                <Info size={32} weight="fill" />
            </div>
            <h2 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.5rem' }}>{tipo}</h2>
            <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)' }}>Especificações da Categoria</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Linha Camas */}
            <div style={rowStyle}>
                <div style={iconBoxStyle}><Bed size={20} weight="fill" /></div>
                <div style={{ flex: 1 }}>
                    <span style={labelStyle}>Camas</span>
                    <div style={{ display: 'flex', gap: '12px', color: 'var(--text-primary)', fontWeight: '600' }}>
                        <span>{regras.camaCasal} Casal</span>
                        <span style={{ color: '#E2E8F0' }}>|</span>
                        <span>{regras.camaSolteiro} Solteiro</span>
                    </div>
                </div>
            </div>

            {/* Linha Suíte */}
            <div style={rowStyle}>
                <div style={iconBoxStyle}><Bathtub size={20} weight="fill" /></div>
                <div style={{ flex: 1 }}>
                    <span style={labelStyle}>Banheiros</span>
                    <span style={valueStyle}>{regras.suite} Suíte(s)</span>
                </div>
            </div>

            {/* Linha Climatização */}
            <div style={rowStyle}>
                <div style={iconBoxStyle}><Snowflake size={20} weight="fill" /></div>
                <div style={{ flex: 1 }}>
                    <span style={labelStyle}>Climatização</span>
                    <span style={valueStyle}>{regras.climatizacao ? 'Ar Condicionado Incluso' : 'Não possui'}</span>
                </div>
            </div>

            {/* Linha Garagem */}
            <div style={rowStyle}>
                <div style={iconBoxStyle}><Car size={20} weight="fill" /></div>
                <div style={{ flex: 1 }}>
                    <span style={labelStyle}>Garagem</span>
                    <span style={valueStyle}>{regras.garagem} Vaga(s)</span>
                </div>
            </div>

        </div>

        <button 
            onClick={onClose}
            style={{ 
                marginTop: '32px', width: '100%', padding: '12px', borderRadius: '12px',
                border: 'none', backgroundColor: '#F1F5F9', color: 'var(--text-primary)',
                fontWeight: '600', cursor: 'pointer', fontSize: '1rem'
            }}
        >
            Fechar
        </button>

      </div>
    </div>
  );
}

const rowStyle = { display: 'flex', alignItems: 'center', gap: '16px', padding: '12px', borderRadius: '12px', backgroundColor: '#F8FAFC', border: '1px solid #F1F5F9' };
const iconBoxStyle = { width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' };
const labelStyle = { display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase' as const, marginBottom: '2px' };
const valueStyle = { fontSize: '1rem', fontWeight: '600', color: 'var(--text-primary)' };