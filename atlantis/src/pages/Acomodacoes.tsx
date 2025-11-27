import { useState } from 'react';
import { Bed, Users, ArrowRight, Info } from 'phosphor-react';
import { useAtlantis } from '../context/AtlantisContext';
import { NomeAcomodacao } from '../utils/NomeAcomodacao';
import ModalGerenciarTipoAcomodacao from '../components/ModalGerenciarTipoAcomodacao';
import ModalDetalhesTipoAcomodacao from '../components/ModalDetalhesTipoAcomodacao'; // Import novo

export default function Acomodacoes() {
  const { acomodacoes } = useAtlantis();
  
  // Estado para gerenciar unidades (Modal anterior)
  const [tipoSelecionado, setTipoSelecionado] = useState<NomeAcomodacao | null>(null);
  
  // Novo estado para ver detalhes técnicos (Modal novo)
  const [tipoParaDetalhes, setTipoParaDetalhes] = useState<NomeAcomodacao | null>(null);

  const categorias = Object.values(NomeAcomodacao);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-primary)' }}>Acomodações</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Gerencie as unidades e visualize detalhes das categorias.</p>
      </div>  

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {categorias.map((nomeTipo) => {
          const qtdExistente = acomodacoes.filter(a => a.nome === nomeTipo).length;

          return (
            <div 
                key={nomeTipo} 
                // Clique no card abre o gerenciador de unidades
                onClick={() => setTipoSelecionado(nomeTipo)}
                style={{ 
                    backgroundColor: 'white', borderRadius: '20px', padding: '24px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', border: '1px solid #F1F5F9',
                    cursor: 'pointer', transition: 'all 0.2s ease', position: 'relative', overflow: 'hidden'
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)'; }}
            >
                {/* Botão de Informações (stop propagation para não abrir o gerenciador) */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setTipoParaDetalhes(nomeTipo);
                    }}
                    title="Ver especificações técnicas"
                    style={{
                        position: 'absolute', top: 24, right: 24,
                        width: '32px', height: '32px', borderRadius: '50%',
                        border: '1px solid #E2E8F0', backgroundColor: 'white',
                        color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', zIndex: 10
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--card-blue)'; e.currentTarget.style.color = 'var(--card-blue)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                >
                    <Info size={18} weight="bold" />
                </button>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                    <div style={{ 
                        width: '56px', height: '56px', borderRadius: '16px', 
                        backgroundColor: '#FFF7ED', color: 'var(--card-orange)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Bed size={32} weight="fill" />
                    </div>
                </div>

                {/* Badge de Quantidade */}
                <div style={{ marginBottom: '12px' }}>
                     <span style={{ 
                        backgroundColor: '#F1F5F9', color: 'var(--text-secondary)', 
                        padding: '6px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '700' 
                    }}>
                        {qtdExistente} Unidades
                    </span>
                </div>

                <h3 style={{ margin: '0 0 8px', fontSize: '1.25rem', color: 'var(--text-primary)' }}>{nomeTipo}</h3>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
                    <Users size={18} />
                    <span>Categoria padrão</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--card-blue)', fontWeight: '600', fontSize: '0.95rem' }}>
                    Gerenciar Unidades <ArrowRight size={18} weight="bold" />
                </div>
            </div>
          );
        })}
      </div>

      {/* Modal para Adicionar/Listar Unidades (Passo anterior) */}
      <ModalGerenciarTipoAcomodacao 
        isOpen={!!tipoSelecionado} 
        tipo={tipoSelecionado} 
        onClose={() => setTipoSelecionado(null)} 
      />

      {/* Novo Modal de Detalhes Técnicos (Este Passo) */}
      <ModalDetalhesTipoAcomodacao
        isOpen={!!tipoParaDetalhes}
        tipo={tipoParaDetalhes}
        onClose={() => setTipoParaDetalhes(null)}
      />
    </div>
  );
}