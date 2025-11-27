import { Users, Bed, Key, Plus, TrendUp, TrendDown } from 'phosphor-react';
import { Link } from 'react-router-dom';
import { useAtlantis } from '../context/AtlantisContext';

export default function Dashboard() {
  const { clientes, acomodacoes, hospedagens } = useAtlantis(); 

  const totalClientes = clientes.length;
  const totalHospedagensAtivas = hospedagens.filter(h => h.status === 'Ativa').length;
  const totalQuartos = acomodacoes.length;
  const quartosDisponiveis = totalQuartos - totalHospedagensAtivas;

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>Visão Geral</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>Acompanhe os indicadores do Atlantis em tempo real.</p>
        </div>
        <Link to="/clientes" style={{ backgroundColor: 'var(--card-blue)', color: 'white', padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', boxShadow: '0 4px 14px rgba(59, 130, 246, 0.3)', transition: 'all 0.2s ease' }}>
          <Plus size={20} weight="bold" />
          Novo Hóspede
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '48px' }}>
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ backgroundColor: '#EFF6FF', padding: '12px', borderRadius: '14px', color: 'var(--card-blue)' }}>
              <Users size={28} weight="fill" />
            </div>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10B981', backgroundColor: '#ECFDF5', padding: '4px 8px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '700' }}>
              <TrendUp weight="bold" /> Total
            </span>
          </div>
          <div>
            <h3 style={numberStyle}>{totalClientes}</h3>
            <p style={labelStyle}>Clientes Cadastrados</p>
          </div>
        </div>

        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ backgroundColor: '#FFF7ED', padding: '12px', borderRadius: '14px', color: 'var(--card-orange)' }}>
              <Bed size={28} weight="fill" />
            </div>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#F43F5E', backgroundColor: '#FFF1F2', padding: '4px 8px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '700' }}>
              <TrendDown weight="bold" /> {totalQuartos} Total
            </span>
          </div>
          <div>
            <h3 style={numberStyle}>{quartosDisponiveis}</h3>
            <p style={labelStyle}>Quartos Livres</p>
          </div>
        </div>

        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ backgroundColor: '#ECFDF5', padding: '12px', borderRadius: '14px', color: 'var(--card-green)' }}>
              <Key size={28} weight="fill" />
            </div>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', backgroundColor: '#F1F5F9', padding: '4px 8px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '600' }}>
              Agora
            </span>
          </div>
          <div>
            <h3 style={numberStyle}>{totalHospedagensAtivas}</h3>
            <p style={labelStyle}>Hospedagens Ativas</p>
          </div>
        </div>

      </div>
    </div>
  );
}

const cardStyle = { backgroundColor: 'white', borderRadius: '20px', padding: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' as const, justifyContent: 'space-between', height: '160px' };
const numberStyle = { fontSize: '2.2rem', fontWeight: '700', color: 'var(--text-primary)', lineHeight: '1.2' };
const labelStyle = { color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: '500' };