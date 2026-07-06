# 💜 Mapa de Apoio à Mulher – Niterói/RJ
**Projeto Final · Recode Transforma Futuros · ODS 5 – Igualdade de Gênero**

---

## 📋 Sobre o projeto

Plataforma interativa que mapeia e organiza serviços de apoio à mulher
no município de Niterói/RJ: delegacias, centros de referência, assistência
jurídica, saúde e canais de denúncia.

**Stack:** MySQL · Java (Spring Boot) · ReactJS + Leaflet

---

## 🗂 Estrutura de pastas

```
projeto-mapa/
├── banco/
│   └── schema.sql          ← script completo do banco de dados
├── backend/
│   ├── pom.xml
│   └── src/main/java/br/com/mapaapoio/
│       ├── model/          ← Entidades JPA
│       ├── repository/     ← Interfaces Spring Data
│       ├── service/        ← Regras de negócio
│       ├── controller/     ← REST controllers
│       └── config/         ← Segurança (BCrypt + CORS)
└── frontend/
    ├── index.html          ← com Leaflet via CDN
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── main.jsx
        └── App.jsx         ← Aplicação completa (mapa + lista + CRUDs)
```

---

## ⚙️ Passo a passo para rodar

### 1. Banco de Dados (MySQL)

```sql
-- No MySQL Workbench ou terminal:
SOURCE caminho/para/banco/schema.sql;
```

Edite as credenciais em:
`backend/src/main/resources/application.properties`

```properties
spring.datasource.username=root
spring.datasource.password=SUA_SENHA
```

### 2. Backend (Java / Spring Boot)

```bash
cd backend
mvn spring-boot:run
# Roda em http://localhost:8080
```

**Endpoints disponíveis:**
| Método | URL | Ação |
|--------|-----|------|
| GET    | /api/servicos | Listar serviços |
| POST   | /api/servicos | Criar serviço |
| PUT    | /api/servicos/{id} | Atualizar |
| DELETE | /api/servicos/{id} | Remover |
| GET    | /api/usuarios | Listar usuários |
| POST   | /api/usuarios | Criar usuário |
| GET    | /api/avaliacoes?servicoId=1 | Avaliações do serviço |
| POST   | /api/avaliacoes?servicoId=1&usuarioId=2 | Criar avaliação |

### 3. Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
# Abre em http://localhost:3000
```

> O frontend já funciona **sem o backend** usando dados demo reais de Niterói.
> Quando o backend estiver rodando, os dados são buscados automaticamente.

---

## 🗺️ Funcionalidades

- **Mapa interativo** centrado em Niterói/RJ com marcadores por categoria
- **10 serviços reais** de Niterói com endereços e telefones verificados
- **Filtros** por categoria e busca por nome/bairro
- **Drawer de detalhe** ao clicar no marcador ou card
- **Avaliações** com estrelas e comentários (CRUD completo)
- **Cadastro de novos serviços** com formulário validado
- **Botão direto** para Ligue 180 e WhatsApp de denúncia

---

## 📍 Serviços mapeados (dados reais)

| Serviço | Categoria | Telefone |
|---------|-----------|----------|
| DEAM Niterói | Delegacia da Mulher | (21) 2717-0900 |
| CEAM Neuza Santos | Centro de Referência | (21) 2719-3047 |
| NUAM – Plaza Shopping | Centro de Referência | (21) 2719-3047 |
| NUAM – UPA Mário Monteiro | Centro de Referência | (21) 2719-3047 |
| Juizado de Violência Doméstica | Assistência Jurídica | (21) 2716-4562 |
| Defensoria Pública – Vara de Família | Assistência Jurídica | (21) 2719-2743 |
| SOS Mulher – HUAP | Saúde | (21) 2629-9073 |
| Policlínica Malu Sampaio | Saúde | (21) 2621-2302 |
| Disque Denúncia Niterói | Linha de Apoio | (21) 2253-1177 |
| CODIM | Centro de Referência | (21) 98321-0548 |

---

## 👩‍💻 Tecnologias utilizadas

- **MySQL** – banco relacional com 3 tabelas (usuarios, servicos, avaliacoes)
- **Java 17 + Spring Boot 3** – API REST com JPA, Lombok e BCrypt
- **ReactJS 18 + Vite** – SPA com componentes reutilizáveis
- **Leaflet.js** – mapa interativo com OpenStreetMap

---

*Projeto desenvolvido para o Programa Recode Transforma Futuros*
*Alinhado à ODS 5 – Igualdade de Gênero da ONU*
