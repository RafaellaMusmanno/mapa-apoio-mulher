-- ============================================================
-- MAPA DE SERVIÇOS DE APOIO À MULHER
-- ODS 5 – Igualdade de Gênero | Recode Projeto Final
-- ============================================================

CREATE DATABASE IF NOT EXISTS mapa_apoio_mulher
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE mapa_apoio_mulher;

-- ============================================================
-- TABELA: usuarios
-- ============================================================
CREATE TABLE usuarios (
  id            BIGINT       AUTO_INCREMENT PRIMARY KEY,
  nome          VARCHAR(100) NOT NULL,
  email         VARCHAR(150) NOT NULL UNIQUE,
  senha         VARCHAR(255) NOT NULL,          -- armazenar hash BCrypt
  perfil        ENUM('USUARIO','ADMIN') NOT NULL DEFAULT 'USUARIO',
  ativo         BOOLEAN      NOT NULL DEFAULT TRUE,
  data_cadastro DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  data_atualizacao DATETIME  ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================================
-- TABELA: categorias
-- ============================================================
CREATE TABLE categorias (
  id   BIGINT       AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL UNIQUE  -- ex: Delegacia, Abrigo, Centro de Atendimento
);

INSERT INTO categorias (nome) VALUES
  ('Delegacia da Mulher'),
  ('Abrigo / Casa de Acolhimento'),
  ('Centro de Referência'),
  ('Assistência Jurídica'),
  ('Saúde Mental'),
  ('Linha de Apoio');

-- ============================================================
-- TABELA: servicos
-- ============================================================
CREATE TABLE servicos (
  id           BIGINT         AUTO_INCREMENT PRIMARY KEY,
  categoria_id BIGINT         NOT NULL,
  nome         VARCHAR(200)   NOT NULL,
  descricao    TEXT,
  endereco     VARCHAR(300)   NOT NULL,
  cidade       VARCHAR(100)   NOT NULL,
  estado       CHAR(2)        NOT NULL,
  cep          CHAR(9),
  telefone     VARCHAR(20),
  email        VARCHAR(150),
  site         VARCHAR(255),
  latitude     DECIMAL(10,8),
  longitude    DECIMAL(11,8),
  funcionamento VARCHAR(300), -- ex: "Seg-Sex 08h-18h"
  ativo        BOOLEAN        NOT NULL DEFAULT TRUE,
  data_cadastro    DATETIME   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  data_atualizacao DATETIME   ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_servico_categoria FOREIGN KEY (categoria_id)
    REFERENCES categorias(id) ON DELETE RESTRICT
);

-- ============================================================
-- TABELA: avaliacoes
-- ============================================================
CREATE TABLE avaliacoes (
  id           BIGINT  AUTO_INCREMENT PRIMARY KEY,
  servico_id   BIGINT  NOT NULL,
  usuario_id   BIGINT  NOT NULL,
  nota         TINYINT NOT NULL CHECK (nota BETWEEN 1 AND 5),
  comentario   TEXT,
  data_avaliacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_avaliacao_servico  FOREIGN KEY (servico_id)
    REFERENCES servicos(id)  ON DELETE CASCADE,
  CONSTRAINT fk_avaliacao_usuario  FOREIGN KEY (usuario_id)
    REFERENCES usuarios(id)  ON DELETE CASCADE,
  CONSTRAINT uk_avaliacao_unica UNIQUE (servico_id, usuario_id) -- 1 avaliação por usuário por serviço
);

-- ============================================================
-- VIEWS ÚTEIS
-- ============================================================

-- Média de avaliações por serviço
CREATE VIEW vw_media_avaliacoes AS
SELECT
  s.id                                  AS servico_id,
  s.nome                                AS servico_nome,
  c.nome                                AS categoria,
  COUNT(a.id)                           AS total_avaliacoes,
  ROUND(AVG(a.nota), 1)                 AS media_nota
FROM servicos s
JOIN categorias c ON c.id = s.categoria_id
LEFT JOIN avaliacoes a ON a.servico_id = s.id
WHERE s.ativo = TRUE
GROUP BY s.id, s.nome, c.nome;

-- ============================================================
-- DADOS DE EXEMPLO
-- ============================================================
INSERT INTO servicos (categoria_id, nome, descricao, endereco, cidade, estado, telefone, latitude, longitude, funcionamento)
VALUES
(1, 'Delegacia de Defesa da Mulher – Centro SP',
 'Atendimento especializado a mulheres vítimas de violência doméstica.',
 'Rua do Paraíso, 248', 'São Paulo', 'SP', '(11) 3392-8400',
 -23.5671, -46.6476, 'Seg-Sex 24h'),

(2, 'Casa Abrigo Heliópolis',
 'Acolhimento temporário para mulheres em situação de risco.',
 'Rua das Rosas, 100', 'São Paulo', 'SP', '(11) 0000-0000',
 -23.6200, -46.6100, 'Todos os dias 24h'),

(3, 'CRAM – Centro de Referência de Atendimento à Mulher',
 'Orientação psicossocial, jurídica e de saúde.',
 'Av. Paulista, 900', 'São Paulo', 'SP', '(11) 3289-4000',
 -23.5630, -46.6543, 'Seg-Sex 08h-17h');
