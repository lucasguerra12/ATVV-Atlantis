import { useState } from 'react';
import { X, Plus, Bed, Trash } from 'phosphor-react';
import { useAtlantis, type Acomodacao } from '../context/AtlantisContext';
import { NomeAcomodacao } from '../utils/NomeAcomodacao';
import { REGRAS_ACOMODACAO } from '../utils/RegrasAcomodacao';
import ModalDetalhesQuarto from './ModalDetalhesQuarto';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  tipo: NomeAcomodacao | null;
}

export default function ModalGerenciarTipoAcomodacao({ isOpen, onClose, tipo }: ModalProps) {
  const { acomodacoes, addAcomodacao, hospedagens, deleteAcomodacao } = useAtlantis();
  const [quartoSelecionado, setQuartoSelecionado] = useState<Acomodacao | null>(null);

  if (!isOpen || !tipo) return null;

  const quartosDoTipo = acomodacoes.filter(a => a.nome === tipo);
  const regras = REGRAS_ACOMODACAO[tipo];

  const handleCriarNovoQuarto = () => {
    addAcomodacao({
        nome: tipo,
        ...regras
    });
  };

  const isOcupado = (id: string) => {
    return hospedagens.some(h => h.acomodacaoId === id && h.status === 'Ativa');
  };

  const handleExcluir = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); 

    if (isOcupado(id)) {
      alert('Não é possível excluir uma unidade que está ocupada!');
      return;
    }

    if (confirm('Tem certeza que deseja excluir esta unidade permanentemente?')) {
      deleteAcomodacao(id);
    }
  };

  return (
    <>
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
      display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white', borderRadius: '24px',
        width: '100%', maxWidth: '900px', height: '80vh', display: 'flex', flexDirection: 'column',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', overflow: 'hidden'
      }}>
        <div style={{ padding: '24px 32px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8FAFC' }}>
          <div>
            <h2 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.5rem' }}>{tipo}</h2>
            <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Configuração Padrão: {regras.camaCasal} Casal, {regras.camaSolteiro} Solteiro, {regras.suite} Suíte(s).
            </p>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <button 
                onClick={handleCriarNovoQuarto}
                style={{ 
                    backgroundColor: 'var(--card-blue)', color: 'white', padding: '10px 20px', 
                    borderRadius: '10px', border: 'none', fontWeight: '600', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                }}
            >
                <Plus size={20} weight="bold" /> Adicionar Unidade
            </button>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                <X size={24} />
            </button>
          </div>
        </div>

        <div style={{ padding: '32px', overflowY: 'auto', flex: 1, backgroundColor: 'white' }}>
            {quartosDoTipo.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#94A3B8' }}>
                    <Bed size={48} weight="duotone" />
                    <p>Nenhuma unidade construída para esta categoria ainda.</p>
                    <p>Clique em "Adicionar Unidade" para expandir o resort.</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                    {quartosDoTipo.map((quarto, index) => {
                        const ocupado = isOcupado(quarto.id);
                        return (
                            <div 
                                key={quarto.id}
                                onClick={() => setQuartoSelecionado(quarto)}
                                style={{
                                    border: ocupado ? '1px solid #FECACA' : '1px solid #E2E8F0',
                                    backgroundColor: ocupado ? '#FEF2F2' : 'white',
                                    borderRadius: '16px', padding: '20px', cursor: 'pointer',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    position: 'relative'
                                }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                            >
                                <button
                                   onClick={(e) => handleExcluir(e, quarto.id)}
                                   style={{
                                     position: 'absolute',
                                     top: 12, 
                                     right: 12,
                                     background: 'white',
                                     border: '1px solid #EF4444',
                                     borderRadius: '50%',
                                     width: '32px',
                                     height: '32px',
                                     display: 'flex', alignItems: 'center', justifyContent: 'center',
                                     color: '#EF4444',
                                     cursor: 'pointer',
                                     zIndex: 10
                                   }}
                                   title="Excluir unidade"
                                 >
                                   <Trash size={16} weight="bold" />
                                 </button>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                    <div style={{ 
                                        padding: '8px', borderRadius: '8px', 
                                        backgroundColor: ocupado ? 'white' : '#F1F5F9', 
                                        color: ocupado ? '#EF4444' : '#64748B' 
                                    }}>
                                        <Bed size={24} weight="fill" />
                                    </div>
                                    <span style={{ 
                                        fontSize: '0.75rem', fontWeight: '700', padding: '4px 8px', borderRadius: '12px',
                                        backgroundColor: ocupado ? '#FECACA' : '#DCFCE7',
                                        color: ocupado ? '#EF4444' : '#16A34A',
                                        marginRight: '40px' 
                                    }}>
                                        {ocupado ? 'OCUPADO' : 'LIVRE'}
                                    </span>
                                </div>
                                <h4 style={{ margin: 0, color: 'var(--text-primary)' }}>Unidade {index + 1}</h4>
                                <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>ID: {quarto.id}</p>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
      </div>
    </div>
    
    <ModalDetalhesQuarto 
        isOpen={!!quartoSelecionado} 
        onClose={() => setQuartoSelecionado(null)} 
        quarto={quartoSelecionado}
    />
    </>
  );
}