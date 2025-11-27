import express, { Request, Response } from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import { config } from 'dotenv';

config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dateStrings: true 
});

// --- HELPERS ---
// Função auxiliar para executar queries com Promessas (mais limpo)
const query = (sql: string, params: any[] = []) => {
  return new Promise<any>((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

// --- CLIENTES ---

// GET: Listar Clientes com Endereço, Telefones e Dependentes
app.get('/clientes', async (req: Request, res: Response) => {
  try {
    // 1. Busca clientes titulares
    const clientesRaw = await query('SELECT * FROM clientes WHERE titular_id IS NULL');
    
    // 2. Para cada cliente, busca os detalhes (Isso poderia ser otimizado com JOINs, mas assim é mais didático)
    const clientesCompletos = await Promise.all(clientesRaw.map(async (c: any) => {
      const endereco = (await query('SELECT * FROM enderecos WHERE cliente_id = ?', [c.id]))[0];
      const telefones = await query('SELECT numero FROM telefones WHERE cliente_id = ?', [c.id]);
      const dependentes = await query('SELECT * FROM clientes WHERE titular_id = ?', [c.id]);

      return {
        id: c.id,
        nome: c.nome,
        nomeSocial: c.nome_social,
        cpf: c.cpf,
        dataNascimento: c.data_nascimento,
        dataCadastro: c.data_cadastro,
        telefones: telefones.map((t: any) => t.numero),
        dependentes: dependentes.map((d: any) => ({
            id: d.id, nome: d.nome, cpf: d.cpf, dataNascimento: d.data_nascimento
        })),
        endereco: endereco || { rua: '', bairro: '', cidade: '', estado: '', cep: '' }
      };
    }));

    res.json(clientesCompletos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
});

// POST: Criar Cliente (Transação complexa: salva cliente, endereço, telefone e dependentes)
app.post('/clientes', async (req: Request, res: Response) => {
  const { id, nome, nomeSocial, cpf, dataNascimento, dataCadastro, endereco, telefones, dependentes } = req.body;

  try {
    // Salva Cliente
    await query(
      'INSERT INTO clientes (id, nome, nome_social, cpf, data_nascimento, data_cadastro) VALUES (?, ?, ?, ?, ?, ?)', 
      [id, nome, nomeSocial, cpf, dataNascimento, dataCadastro]
    );

    // Salva Endereço
    if (endereco) {
      await query(
        'INSERT INTO enderecos (cliente_id, rua, bairro, cidade, estado, cep) VALUES (?, ?, ?, ?, ?, ?)',
        [id, endereco.rua, endereco.bairro, endereco.cidade, endereco.estado, endereco.cep]
      );
    }

    // Salva Telefones
    if (telefones && telefones.length > 0) {
        for (const tel of telefones) {
            await query('INSERT INTO telefones (cliente_id, numero) VALUES (?, ?)', [id, tel]);
        }
    }

    // Salva Dependentes
    if (dependentes && dependentes.length > 0) {
        for (const dep of dependentes) {
            await query(
                'INSERT INTO clientes (id, nome, cpf, data_nascimento, titular_id) VALUES (?, ?, ?, ?, ?)',
                [dep.id, dep.nome, dep.cpf, dep.dataNascimento, id]
            );
        }
    }

    res.json({ message: 'Cliente cadastrado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao salvar cliente' });
  }
});

// DELETE: Excluir Cliente
app.delete('/clientes/:id', async (req: Request, res: Response) => {
    try {
        await query('DELETE FROM clientes WHERE id = ?', [req.params.id]);
        res.json({ message: 'Cliente removido' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar' });
    }
});

// --- ACOMODAÇÕES ---

app.get('/acomodacoes', async (req: Request, res: Response) => {
    const result = await query('SELECT * FROM acomodacoes');
    // Mapear snake_case do banco para camelCase do frontend
    const formatado = result.map((a: any) => ({
        id: a.id,
        nome: a.nome_tipo,
        camaCasal: a.cama_casal,
        camaSolteiro: a.cama_solteiro,
        suite: a.suite,
        garagem: a.garagem,
        climatizacao: Boolean(a.climatizacao)
    }));
    res.json(formatado);
});

app.post('/acomodacoes', async (req: Request, res: Response) => {
    const { id, nome, camaCasal, camaSolteiro, suite, garagem, climatizacao } = req.body;
    try {
        await query(
            'INSERT INTO acomodacoes (id, nome_tipo, cama_casal, cama_solteiro, suite, garagem, climatizacao) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [id, nome, camaCasal, camaSolteiro, suite, garagem, climatizacao]
        );
        res.json({ message: 'Acomodação criada' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Erro ao criar acomodação' });
    }
});

app.delete('/acomodacoes/:id', async (req: Request, res: Response) => {
    await query('DELETE FROM acomodacoes WHERE id = ?', [req.params.id]);
    res.json({ message: 'Deletado' });
});

// --- HOSPEDAGENS ---

app.get('/hospedagens', async (req: Request, res: Response) => {
    const result = await query('SELECT * FROM hospedagens');
    const formatado = result.map((h: any) => ({
        id: h.id,
        clienteId: h.cliente_id,
        acomodacaoId: h.acomodacao_id,
        dataEntrada: h.data_entrada,
        status: h.status
    }));
    res.json(formatado);
});

app.post('/hospedagens', async (req: Request, res: Response) => {
    const { id, clienteId, acomodacaoId, dataEntrada, status } = req.body;
    try {
        await query(
            'INSERT INTO hospedagens (id, cliente_id, acomodacao_id, data_entrada, status) VALUES (?, ?, ?, ?, ?)',
            [id, clienteId, acomodacaoId, dataEntrada, status]
        );
        res.json({ message: 'Check-in realizado' });
    } catch (e) {
        res.status(500).json({ error: 'Erro no check-in' });
    }
});

app.put('/hospedagens/:id/checkout', async (req: Request, res: Response) => {
    await query('UPDATE hospedagens SET status = "Finalizada" WHERE id = ?', [req.params.id]);
    res.json({ message: 'Check-out realizado' });
});

// --- START ---
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Backend Full Stack rodando na porta ${PORT}`);
});