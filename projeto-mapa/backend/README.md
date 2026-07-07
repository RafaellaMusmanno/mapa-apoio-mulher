📦 README – Backend
Mapa de Apoio à Mulher – Niterói/RJ
Tecnologia: Java 17 + Spring Boot 3 + MySQL
---
▶️ Como rodar
```bash
# 1. Configure o banco no application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/mapa_apoio_mulher
spring.datasource.username=root
spring.datasource.password=sua_senha

# 2. Rode o projeto
mvn spring-boot:run

# API disponível em: http://localhost:8080
```
---
👤 CRUD – Usuários `/api/usuarios`
Método	Rota	Ação
GET	/api/usuarios	Lista todos os usuários
GET	/api/usuarios/{id}	Busca usuário por ID
POST	/api/usuarios	Cria novo usuário
PUT	/api/usuarios/{id}	Atualiza usuário
DELETE	/api/usuarios/{id}	Remove usuário
POST /api/usuarios — Exemplo de requisição
```json
{
  "nome": "Rafaella Musmanno",
  "email": "rafa@email.com",
  "senha": "123456"
}
```
GET /api/usuarios — Exemplo de resposta
```json
[
  {
    "id": 1,
    "nome": "Rafaella Musmanno",
    "email": "rafa@email.com",
    "perfil": "USUARIO",
    "ativo": true,
    "dataCadastro": "2026-07-06T22:00:00"
  }
]
```
---
📍 CRUD – Serviços `/api/servicos`
Método	Rota	Ação
GET	/api/servicos	Lista todos os serviços ativos
GET	/api/servicos?categoriaId=1	Filtra por categoria
GET	/api/servicos?busca=DEAM	Busca por nome ou descrição
GET	/api/servicos/{id}	Busca serviço por ID
POST	/api/servicos	Cria novo serviço
PUT	/api/servicos/{id}	Atualiza serviço
DELETE	/api/servicos/{id}	Remove serviço (soft delete)
POST /api/servicos — Exemplo de requisição
```json
{
  "nome": "DEAM – Delegacia de Atendimento à Mulher",
  "descricao": "Atendimento 24h para mulheres vítimas de violência.",
  "endereco": "Av. Ernani do Amaral Peixoto, 577",
  "cidade": "Niterói",
  "estado": "RJ",
  "telefone": "(21) 2717-0900",
  "funcionamento": "24 horas",
  "categoria": { "id": 1 }
}
```
GET /api/servicos — Exemplo de resposta
```json
[
  {
    "id": 1,
    "nome": "DEAM – Delegacia de Atendimento à Mulher",
    "descricao": "Atendimento 24h para mulheres vítimas de violência.",
    "endereco": "Av. Ernani do Amaral Peixoto, 577",
    "cidade": "Niterói",
    "estado": "RJ",
    "telefone": "(21) 2717-0900",
    "funcionamento": "24 horas",
    "ativo": true,
    "categoria": {
      "id": 1,
      "nome": "Delegacia da Mulher"
    }
  }
]
```
---
⭐ CRUD – Avaliações `/api/avaliacoes`
Método	Rota	Ação
GET	/api/avaliacoes?servicoId=1	Lista avaliações de um serviço
GET	/api/avaliacoes/media?servicoId=1	Retorna média de notas
POST	/api/avaliacoes?servicoId=1&usuarioId=2	Cria nova avaliação
PUT	/api/avaliacoes/{id}	Atualiza avaliação
DELETE	/api/avaliacoes/{id}	Remove avaliação
POST /api/avaliacoes — Exemplo de requisição
```json
{
  "nota": 5,
  "comentario": "Atendimento muito acolhedor e eficiente."
}
```
GET /api/avaliacoes?servicoId=1 — Exemplo de resposta
```json
[
  {
    "id": 1,
    "nota": 5,
    "comentario": "Atendimento muito acolhedor e eficiente.",
    "dataAvaliacao": "2026-07-06T22:00:00",
    "servico": { "id": 1 },
    "usuario": { "id": 2, "nome": "Rafaella Musmanno" }
  }
]
```
GET /api/avaliacoes/media?servicoId=1 — Exemplo de resposta
```json
4.7
```
