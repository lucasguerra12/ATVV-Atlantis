import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { NomeAcomodacao } from '../utils/NomeAcomodacao';

// URL do Backend
const API_URL = 'http://localhost:3001';

const formatDateToMySQL = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export interface Dependente {
  id: string;
  nome: string;
  cpf: string;
  dataNascimento: string;
}

export interface Cliente {
  id: string;
  nome: string;
  nomeSocial: string;
  cpf: string;
  dataNascimento: string;
  dataCadastro: string;
  telefones: string[];
  dependentes: Dependente[];
  endereco: {
    rua: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };
}

export interface Acomodacao {
  id: string;
  nome: NomeAcomodacao;
  camaCasal: number;
  camaSolteiro: number;
  suite: number;
  garagem: number;
  climatizacao: boolean;
}

export interface Hospedagem {
  id: string;
  clienteId: string;
  acomodacaoId: string;
  dataEntrada: string;
  status: 'Ativa' | 'Finalizada';
}

interface AtlantisContextData {
  clientes: Cliente[];
  acomodacoes: Acomodacao[];
  hospedagens: Hospedagem[];
  addCliente: (cliente: Omit<Cliente, 'id' | 'dataCadastro'>) => void;
  updateCliente: (id: string, cliente: Partial<Cliente>) => void;
  deleteCliente: (id: string) => void;
  addAcomodacao: (acomodacao: Omit<Acomodacao, 'id'>) => void;
  deleteAcomodacao: (id: string) => void;
  checkIn: (clienteId: string, acomodacaoId: string) => void;
  checkOut: (hospedagemId: string) => void;
}

const AtlantisContext = createContext<AtlantisContextData>({} as AtlantisContextData);

export function AtlantisProvider({ children }: { children: ReactNode }) {
  
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [acomodacoes, setAcomodacoes] = useState<Acomodacao[]>([]);
  const [hospedagens, setHospedagens] = useState<Hospedagem[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [resClientes, resAcomodacoes, resHospedagens] = await Promise.all([
        fetch(`${API_URL}/clientes`),
        fetch(`${API_URL}/acomodacoes`),
        fetch(`${API_URL}/hospedagens`)
      ]);

      if (resClientes.ok) setClientes(await resClientes.json());
      if (resAcomodacoes.ok) setAcomodacoes(await resAcomodacoes.json());
      if (resHospedagens.ok) setHospedagens(await resHospedagens.json());
    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
    }
  };

  const addCliente = async (dados: Omit<Cliente, 'id' | 'dataCadastro'>) => {
    const novoId = crypto.randomUUID();
    const novoCliente = { 
      ...dados, 
      id: novoId,
      dataCadastro: formatDateToMySQL(new Date()) 
    };

    setClientes(prev => [...prev, novoCliente as Cliente]);

    try {
      const response = await fetch(`${API_URL}/clientes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoCliente)
      });
      if (!response.ok) throw new Error('Erro no backend');
    } catch (error) {
      console.error("Erro ao salvar cliente", error);
      loadData(); 
    }
  };

  const updateCliente = async (id: string, dadosAtualizados: Partial<Cliente>) => {
    setClientes(prev => prev.map(c => c.id === id ? { ...c, ...dadosAtualizados } : c));

    await fetch(`${API_URL}/clientes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dadosAtualizados)
    });
  };

  const deleteCliente = async (id: string) => {
    setClientes(prev => prev.filter(c => c.id !== id));
    
    setHospedagens(prev => prev.filter(h => h.clienteId !== id));

    await fetch(`${API_URL}/clientes/${id}`, { method: 'DELETE' });
  };

  const addAcomodacao = async (dados: Omit<Acomodacao, 'id'>) => {
    const novaAcomodacao = { ...dados, id: crypto.randomUUID() };
    setAcomodacoes(prev => [...prev, novaAcomodacao]);

    await fetch(`${API_URL}/acomodacoes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novaAcomodacao)
    });
  };

  const deleteAcomodacao = async (id: string) => {
    setAcomodacoes(prev => prev.filter(a => a.id !== id));
    await fetch(`${API_URL}/acomodacoes/${id}`, { method: 'DELETE' });
  };

  const checkIn = async (clienteId: string, acomodacaoId: string) => {
    const estaOcupado = hospedagens.some(h => h.acomodacaoId === acomodacaoId && h.status === 'Ativa');
    if (estaOcupado) { alert('ERRO: Quarto ocupado!'); return; }

    const novaHospedagem: Hospedagem = {
      id: crypto.randomUUID(),
      clienteId, acomodacaoId,
      dataEntrada: formatDateToMySQL(new Date()),
      status: 'Ativa'
    };
    setHospedagens(prev => [...prev, novaHospedagem]);

    await fetch(`${API_URL}/hospedagens`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novaHospedagem)
    });
  };

  const checkOut = async (hospedagemId: string) => {
    setHospedagens(current => 
      current.map(h => h.id === hospedagemId ? { ...h, status: 'Finalizada' } : h)
    );

    await fetch(`${API_URL}/hospedagens/${hospedagemId}/checkout`, {
      method: 'PUT'
    });
  };

  return (
    <AtlantisContext.Provider value={{ 
      clientes, acomodacoes, hospedagens, 
      addCliente, updateCliente, deleteCliente, 
      addAcomodacao, deleteAcomodacao, 
      checkIn, checkOut 
    }}>
      {children}
    </AtlantisContext.Provider>
  );
}

export function useAtlantis() {
  return useContext(AtlantisContext);
}