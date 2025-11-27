import { useState } from 'react';
import { Plus, PencilSimple, Trash, MagnifyingGlass, User, Users } from 'phosphor-react';
import ModalCadastroCliente from '../components/ModalCadastroCliente';
import { useAtlantis, type Cliente } from '../context/AtlantisContext';

export default function Clientes() {
  const { clientes, deleteCliente } = useAtlantis();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [clienteParaEditar, setClienteParaEditar] = useState<Cliente | null>(null);

  const clientesFiltrados = clientes.filter(cliente => {
    const term = searchTerm.toLowerCase();
    const matchTitular = cliente.nome.toLowerCase().includes(term) || cliente.cpf.includes(term);
    const matchDependente = cliente.dependentes?.some(dep => 
      dep.nome.toLowerCase().includes(term) || dep.cpf.includes(term)
    );

    return matchTitular || matchDependente;
  });

  const handleNovo = () => {
    setClienteParaEditar(null);
    setIsModalOpen(true);
  };

  const handleEditar = (cliente: Cliente) => {
    setClienteParaEditar(cliente);
    setIsModalOpen(true);
  };

  const handleExcluir = (id: string, nome: string) => {
    if (confirm(`Tem certeza que deseja excluir ${nome}?`)) {
      deleteCliente(id);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      
      <div style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' 
      }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-primary)' }}>Hóspedes</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Gerencie os clientes e seus dependentes.</p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={handleNovo} style={btnBlueStyle}>
            <Plus size={20} weight="bold" />
            Novo Hóspede
          </button>
        </div>
      </div>

      <div style={{ 
        backgroundColor: 'white', padding: '16px', borderRadius: '16px', marginBottom: '24px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', gap: '12px',
        border: '1px solid rgba(0,0,0,0.05)'
      }}>
        <MagnifyingGlass size={20} color="var(--text-secondary)" />
        <input 
          type="text" 
          placeholder="Buscar por nome, CPF ou nome do dependente..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ border: 'none', outline: 'none', fontSize: '1rem', width: '100%', color: 'var(--text-primary)' }}
        />
      </div>

      <div style={{ 
        backgroundColor: 'white', borderRadius: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
        border: '1px solid rgba(0,0,0,0.05)', overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
            <tr>
              <th style={thStyle}>HÓSPEDE TITULAR</th>
              <th style={thStyle}>DOCUMENTO</th>
              <th style={thStyle}>DEPENDENTES</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {clientesFiltrados.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  Nenhum cliente encontrado.
                </td>
              </tr>
            ) : (
              clientesFiltrados.map((cliente) => (
                <tr key={cliente.id} style={{ borderBottom: '1px solid #F1F5F9', transition: 'background 0.2s' }}>
                  <td style={{ padding: '20px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ 
                        width: '48px', height: '48px', borderRadius: '50%', 
                        backgroundColor: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#64748B'
                      }}>
                        <User size={24} weight="bold" />
                      </div>
                      <div>
                        <p style={{ margin: 0, fontWeight: '600', color: 'var(--text-primary)', fontSize: '1rem' }}>{cliente.nome}</p>
                        <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                          {cliente.nomeSocial ? `Social: ${cliente.nomeSocial}` : `Cadastro: ${cliente.dataCadastro}`}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td style={{ padding: '20px 24px' }}>
                    <p style={{ margin: 0, fontWeight: '500', color: 'var(--text-primary)', fontFamily: 'monospace' }}>
                      {cliente.cpf}
                    </p>
                  </td>

                  <td style={{ padding: '20px 24px' }}>
                     {cliente.dependentes && cliente.dependentes.length > 0 ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                            <Users size={18} />
                            <span style={{ fontSize: '0.9rem' }}>{cliente.dependentes.length} dependente(s)</span>
                        </div>
                     ) : (
                        <span style={{ color: '#CBD5E1', fontSize: '0.9rem' }}>—</span>
                     )}
                  </td>

                  <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                      
                      <button 
                        onClick={() => handleEditar(cliente)}
                        style={actionBtnStyle}
                        title="Editar"
                      >
                        <PencilSimple size={20} />
                      </button>

                      <button 
                        onClick={() => handleExcluir(cliente.id, cliente.nome)}
                        style={{ ...actionBtnStyle, color: '#EF4444' }}
                        title="Excluir"
                      >
                        <Trash size={20} />
                      </button>

                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ModalCadastroCliente 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        clienteParaEditar={clienteParaEditar} 
      />

    </div>
  );
}

const thStyle = {
  padding: '20px 24px', color: 'var(--text-secondary)', fontWeight: '600', 
  fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase' as const
};

const btnBlueStyle = {
  backgroundColor: 'var(--card-blue)', color: 'white', padding: '12px 20px',
  borderRadius: '12px', border: 'none', display: 'flex', alignItems: 'center', 
  gap: '8px', fontWeight: '600', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)', 
  cursor: 'pointer', transition: '0.2s'
};


const actionBtnStyle = {
  background: 'none', border: 'none', padding: '8px', color: '#64748B', 
  cursor: 'pointer', borderRadius: '8px', transition: '0.2s'
};