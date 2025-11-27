-- Script de Criação do Banco de Dados - Atlantis Water Park

CREATE DATABASE IF NOT EXISTS atlantis_db;
USE atlantis_db;

-- 1. Tabela de Clientes (Hóspedes e Dependentes)
CREATE TABLE IF NOT EXISTS clientes (
    id VARCHAR(36) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    nome_social VARCHAR(255),
    cpf VARCHAR(20) NOT NULL,
    data_nascimento DATE NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    titular_id VARCHAR(36),
    FOREIGN KEY (titular_id) REFERENCES clientes(id) ON DELETE CASCADE
);

-- 2. Tabela de Endereços
CREATE TABLE IF NOT EXISTS enderecos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id VARCHAR(36) NOT NULL,
    rua VARCHAR(255),
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    estado VARCHAR(50),
    cep VARCHAR(20),
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
);

-- 3. Tabela de Telefones
CREATE TABLE IF NOT EXISTS telefones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id VARCHAR(36) NOT NULL,
    numero VARCHAR(20) NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
);

-- 4. Tabela de Documentos
CREATE TABLE IF NOT EXISTS documentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id VARCHAR(36) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    numero VARCHAR(50) NOT NULL,
    data_expedicao DATE,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
);

-- 5. Tabela de Acomodações
CREATE TABLE IF NOT EXISTS acomodacoes (
    id VARCHAR(36) PRIMARY KEY,
    nome_tipo VARCHAR(100) NOT NULL,
    cama_casal INT DEFAULT 0,
    cama_solteiro INT DEFAULT 0,
    suite INT DEFAULT 0,
    garagem INT DEFAULT 0,
    climatizacao BOOLEAN DEFAULT FALSE
);

-- 6. Tabela de Hospedagens
CREATE TABLE IF NOT EXISTS hospedagens (
    id VARCHAR(36) PRIMARY KEY,
    cliente_id VARCHAR(36) NOT NULL,
    acomodacao_id VARCHAR(36) NOT NULL,
    data_entrada DATE DEFAULT (CURRENT_DATE),
    status VARCHAR(20) DEFAULT 'Ativa',
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE,
    FOREIGN KEY (acomodacao_id) REFERENCES acomodacoes(id) ON DELETE CASCADE
);