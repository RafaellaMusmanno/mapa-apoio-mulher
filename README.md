Mapa de Apoio à Mulher – Niterói/RJ

Nome do projeto: Mapa de Apoio à Mulher – Niterói/RJ

Aluna: Rafaella Musmanno

ODS escolhida: ODS 5 – Igualdade de Gênero

Objetivo do projeto:
Plataforma interativa que mapeia e centraliza os serviços de apoio à mulher no município de Niterói/RJ — como delegacias, centros de referência, assistência jurídica, saúde e canais de denúncia. O objetivo é facilitar o acesso à informação para mulheres em situação de vulnerabilidade ou violência, reduzindo o tempo que levam para encontrar ajuda.

Utilizados:

MySQL — banco de dados com 3 tabelas: usuários, serviços e avaliações
Java 17 + Spring Boot 3 — API REST com JPA, Lombok e BCrypt
ReactJS 18 + Vite — interface com componentes reutilizáveis
Leaflet.js — mapa interativo com OpenStreetMap

3 CRUDs completos:

Usuários — cadastro, listagem, atualização e remoção

Serviços — cadastro, busca por categoria, atualização e remoção

Avaliações — criar, listar por serviço, calcular média, atualizar e remover

Como rodar

Banco de Dados (MySQL)

O arquivo SQL está em: projeto-mapa/banco/schema.sql

Execute no MySQL Workbench ou terminal:

sqlSOURCE projeto-mapa/banco/schema.sql;

Back-end (Java + Spring Boot)

bashcd projeto-mapa/backend
mvn spring-boot:run

A API ficará disponível em: http://localhost:8080

Antes de rodar, configure sua senha do MySQL em:
projeto-mapa/backend/src/main/resources/application.properties

Front-end (ReactJS + Vite)

bashcd projeto-mapa/frontend
npm install
npm run dev

Acesse em: http://localhost:3000

O frontend funciona mesmo sem o backend, exibindo os 10 serviços reais de Niterói como dados demo.

Funcionalidades do sistema:

Mapa interativo centrado em Niterói com marcadores por categoria
10 serviços reais mapeados com endereços e telefones verificados
Filtros por categoria e busca por nome ou bairro
Drawer de detalhes ao clicar em um serviço
Sistema de avaliações com estrelas e comentários
Formulário de cadastro de novos serviços
Botão direto para o Ligue 180 e WhatsApp de denúncia

Impacto social esperado: Facilitar o acesso a serviços de proteção e apoio, reduzindo o tempo que uma mulher em situação de risco leva para encontrar ajuda no município de Niterói.
Repositório GitHub: github.com/RafaellaMusmanno/mapa-apoio-mulher
