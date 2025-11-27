# 🌊 Atlantis Water Park - Sistema de Gestão (Full Stack)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

> **Atividade Prática Final (ATV V)** - Implementação de Persistência de Dados com Banco Relacional.

Este repositório contém a versão completa do sistema **Atlantis**, evoluída de um protótipo SPA para uma aplicação **Full Stack**. O sistema gerencia hóspedes, acomodações e hospedagens de um resort, persistindo dados em um banco MySQL.

---

## 📂 Estrutura do Projeto

O projeto está dividido em dois módulos principais:

* **`atlantis/` (Frontend):** Aplicação React (Vite) responsável pela interface do usuário.
* **`backend/` (Backend):** API REST em Node.js/Express que gerencia as regras de negócio e conecta ao MySQL.

---

## 🚀 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:
* [Node.js](https://nodejs.org/) (v18 ou superior)
* [MySQL Workbench](https://www.mysql.com/products/workbench/) (ou outro cliente MySQL)
* Git

---

## 🛠️ Configuração e Instalação

Siga a ordem abaixo para garantir o funcionamento correto.

### 1. Banco de Dados (MySQL)

1.  Abra seu cliente MySQL (Workbench, DBeaver, etc).
2.  Crie um banco de dados chamado `atlantis_db`.
3.  Execute o script SQL de criação das tabelas (disponível na documentação do projeto ou criado via modelagem).

### 2. Backend (Servidor API)

1.  Entre na pasta do backend:
    ```bash
    cd backend
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  **CONFIGURAÇÃO CRÍTICA (.env):**
    Crie um arquivo chamado `.env` na raiz da pasta `backend` e configure suas credenciais do MySQL:

    ```env
    # Arquivo: backend/.env
    DB_HOST=localhost
    DB_USER=root
    DB_PASS=SUA_SENHA_DO_MYSQL_AQUI  <-- Troque pela sua senha!
    DB_NAME=atlantis_db
    ```

4.  Inicie o servidor:
    ```bash
    npm run dev
    ```
    *O terminal deve exibir: `✅ Conectado ao MySQL com sucesso!` e `🚀 Servidor rodando na porta 3001`.*

### 3. Frontend (Interface Web)

1.  Abra um **novo terminal** (mantenha o backend rodando) e entre na pasta do frontend:
    ```bash
    cd atlantis
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Inicie a aplicação:
    ```bash
    npm run dev
    ```
4.  Acesse no navegador: `http://localhost:5173`

---

## 📡 Tecnologias

* **Frontend:** React 19, Vite, TypeScript, React Router DOM, Phosphor Icons, Context API.
* **Backend:** Node.js, Express, MySQL2, TypeScript, Dotenv.
* **Banco de Dados:** MySQL 8.0.

---

## ✨ Funcionalidades Full Stack

Diferente das versões anteriores, esta versão **persiste os dados**:

1.  **Clientes:** CRUD completo salvando no banco `clientes`, incluindo endereço e telefones.
2.  **Acomodações:** Listagem e status gerenciados via tabela `acomodacoes`.
3.  **Hospedagem:** Check-in e Check-out com atualização real de status no banco.

---

## 👨‍💻 Autor

Desenvolvido por **Lucas Guerra** como parte das atividades práticas de Engenharia de Software.