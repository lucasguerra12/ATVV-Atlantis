# 🌊 Atlantis Water Park - Sistema de Gestão (Full Stack)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)

> **Atividade Prática Final (ATV V)** - Evolução do sistema de gestão de resort para arquitetura Full Stack com persistência de dados.

Este projeto consiste em uma aplicação completa para o gerenciamento do **Atlantis Water Park**, permitindo o controle de hóspedes, acomodações e hospedagens. O sistema evoluiu de um protótipo em memória para uma aplicação conectada a um banco de dados relacional.

---

## 🏛️ Arquitetura do Projeto

O sistema é dividido em dois módulos principais:

1.  **`atlantis/` (Frontend):** Interface construída com React, Vite e TypeScript. Responsável pela interação com o usuário.
2.  **`backend/` (Backend):** API REST construída com Node.js, Express e TypeScript. Responsável pelas regras de negócio e comunicação com o banco de dados.

---

## 🚀 Como Rodar o Projeto

Siga os passos abaixo para configurar o ambiente em sua máquina.

### Pré-requisitos
* Node.js (v18+)
* MySQL Server e Workbench (ou outro cliente SQL)

### Passo 1: Configurar o Banco de Dados 🗄️

1.  Abra seu cliente MySQL.
2.  Localize o arquivo `database.sql` na raiz deste projeto.
3.  Copie o conteúdo e execute no seu banco de dados para criar o Schema `atlantis_db` e as tabelas necessárias.

### Passo 2: Configurar e Rodar o Backend ⚙️

1.  Abra o terminal e entre na pasta do servidor:
    ```bash
    cd backend
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  **Configure as credenciais:** Crie um arquivo `.env` na raiz da pasta `backend` com as configurações do seu MySQL:
    ```env
    DB_HOST=localhost
    DB_USER=root
    DB_PASS=SUA_SENHA_DO_MYSQL
    DB_NAME=atlantis_db
    ```
4.  Inicie o servidor:
    ```bash
    npm run dev
    ```
    *Você deve ver a mensagem: `🚀 Backend Full Stack rodando na porta 3001` e `✅ Conectado ao MySQL`.*

### Passo 3: Rodar o Frontend 💻

1.  Abra um **novo terminal** e entre na pasta da interface:
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

## ✨ Funcionalidades

* **Gestão de Hóspedes:** Cadastro completo (CRUD) com suporte a dependentes, múltiplos telefones e endereço.
* **Gestão de Acomodações:** Criação de unidades baseada em categorias pré-definidas (Solteiro, Casal, Família).
* **Hospedagem:**
    * **Check-in:** Vincula cliente a um quarto disponível.
    * **Check-out:** Libera o quarto e finaliza a estadia.
    * **Validação:** O sistema impede check-in em quartos ocupados.
* **Persistência:** Todos os dados são salvos no MySQL. Ao recarregar a página, nada é perdido.
* **Integridade:** Ao excluir um cliente, o sistema limpa automaticamente as hospedagens e dados vinculados para manter o banco consistente.

---

## 🛠️ Tecnologias

* **Frontend:** React, TypeScript, Context API, Phosphor Icons, CSS Modules.
* **Backend:** Node.js, Express, MySQL2 Driver.
* **Banco:** MySQL 8.0.

---

## 👨‍💻 Autor

Desenvolvido por **Lucas Guerra** como parte das atividades práticas de Engenharia de Software.