Mapa de Apoio à Mulher – Niterói/RJ

ODS escolhida: ODS 5 – Igualdade de Gênero

Problema que resolve: Mulheres em situação de violência muitas vezes não sabem onde buscar ajuda. O projeto centraliza e mapeia todos os serviços de apoio do município de Niterói em uma plataforma interativa e acessível.
Público-alvo: Mulheres em situação de vulnerabilidade ou violência no município de Niterói/RJ, e também profissionais e voluntários que precisam indicar serviços.


Utilizados:

MySQL — banco de dados com 3 tabelas: usuários, serviços e avaliações
Java 17 + Spring Boot 3 — API REST com JPA, Lombok e BCrypt
ReactJS 18 + Vite — interface com componentes reutilizáveis
Leaflet.js — mapa interativo com OpenStreetMap

3 CRUDs completos:

Usuários — cadastro, listagem, atualização e remoção

Serviços — cadastro, busca por categoria, atualização e remoção

Avaliações — criar, listar por serviço, calcular média, atualizar e remover

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
