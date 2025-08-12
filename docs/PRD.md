Versão: 1.0

Data: 11/08/2025

Autor: Heitor Viana

# Documento de Requisitos do Produto

## Problema:
- A empresa Eclética Comunicação atualmente utiliza como banco de dados uma tabela Excel para monitorar processos.
Essa tabela possui muitas colunas, dificultando a manutenção e a análise em tempo real, além de não possuir padronização em algumas colunas.

## Objetivo:
- Criar uma plataforma web segura para armazenamento de processos, permitindo que as informações sejam inseridas via interface amigável.
Essa plataforma deverá oferecer dashboards para extração de insights e apoiar a tomada de decisão na empresa.

## Escopo do MVP (O que irá entrar na v1):
1. Autenticação simples:

    - Login e senha para cada funcionário.
    - Dashboards visíveis apenas para os gestores.
2. Cadastro de processos:

    - Formulário para inserir os dados que hoje vão para a planilha.

3. Listagem de registros:

    - Tabela para ver, filtrar e ordenar os dados.

4. Dashboard Básico:

    - Um ou dois gráficos visando entregar informações financeiras.

5. Armazenamento em banco de dados:

    - Banco PostgreSQL conectado à aplicação.

6. Segurança Mínima:

    - Proteção de rotas para usuários logados.

7. Deploy Local:

    - Sistema rodando via Docker na máquina.

## Fora do Escopo (para versões futuras):

- Dashboards complexos e exportação para PDF.

- Design avançado (UI refinada).

- Integração com APIs externas.

## Atores:

- Funcionário: insere e visualiza registros.

- Gestor: visualiza dashboards e registros.

## Requisitos Funcionais:

- Requisitos funcionais descrevem as diversas funções que usuários e clientes querem ou precisam que o software ofereça, ou seja, são requisitos ligados diretamente à funcionalidade do software.

### RF-01 - Login de Funcionário: 
- User Story:
    - Como funcionário quero entrar com email e senha, para acessar o sistema de registros.

- Prioridade:

    - Must.

- Critérios de Aceite:

    - Dado que informo e-mail válido e senha correta, quando clico em Entrar, então sou redirecionado à tela de registros.

    - Dado e-mail ou senha incorretos, quando tento entrar, então vejo mensagem amigável sem expor qual campo errou.

    - Dado que estou autenticado, quando acesso uma rota protegida, então não sou redirecionado para login.

- Regras de Negócio / Validações:

    - Senha mínima de 8 caracteres.

    - 5 tentativas falhas -> bloquear por 3 minutos.

- Permissões:

    - Qualquer usuário ativo pode logar; Gestor acessa telas de dashboard.

### RF-02 - Cadastro de Registro:

- User Story:

    - Como funcionário, quero criar um registro via formulário, para substituir o lançamento na planilha.

- Prioridade:

    - Must.

- Critérios de aceite:

    - Dado campos obrigatórios preenchidos, quando clico em Salvar, então o registro é gravado no Postgres e aparece na listagem.

    - Dado um campo obrigatório em branco, quando clico em salvar, então vejo a validação ao lado do campo.

    - Dado que salvo com sucesso, quando abro o registro, então os valores são exatamente os que enviei.

    - Dado que salvo com sucesso, o usuário será redirecionado para a página de registros em que aparecerá uma mensagem indicando se o dado foi salvo com sucesso.

- Regras / Validações:

    - Campos Obrigatórios (A definir).

    - `data` no formato ISO (YYYY-MM-DD).

- Dados envolvidos:

    - A definir.

- Permissões:

    - Funcionário: criar/editar próprios registros.

    - Gestor: ver registros, ver dashboards.

### RF-03 - Dashboard Básico (tempo "quase real"):

- User Story:

    - Como gestor, quero ver um gráfico contendo informações financeiras dos processos, gráfico esse que conterá filtros para melhor avaliação.

- Prioridade:

    - Must.

- Critérios de Aceite:

    - Dados os filtros Campanha, Período, Tipo de Processo e Situação, quando aplico, então o gráfico atualiza com os dados filtrados.

    - Dado novos registros, quando aguardo até 30s, então o dashboard reflete os dados sem recarregar a página (polling).

    - Dado que não há dados, então vejo estado vazio explicando como começar.

- Regras:

    - Agregação por mês e ano (A definir).

- Permissões:

    - Gestor visualiza o dashboard.

### RF-04 - Página de listagem de registros:

- User Story:

    - Como funcionário, quero acessar uma página com todos os registros, para visualizar e consultar as informações cadastradas.

- Prioridade: 

    - Must.

- Critérios de Aceite:

    - Dado que estou autenticado, quando acesso a página de registros, então vejo uma lista com todos os registros disponíveis.

    - Dado que a lista tem muitos registros, quando aplico filtros ou ordenação, então a lista é atualizada de acordo.

- Regras / Validações:

    - A listagem deve exibir no mínimo: (A definir).

    - Paginação ou “carregar mais” para não travar a tela em listas grandes.

- Permissões:

    - Funcionário: vê todos os registros.

## Requisitos Não Funcionais:

### Desempenho:

- Resposta da API em < 500 ms para listagens comuns (com ~10k registros).

- Dashboard carregando em < 1,5 s (mesmo com agregações).

### Segurança:

- Autenticação via JWT ou sessão segura.

- Senhas hash com bcrypt/argon2.

- CORS configurado para permitir apenas domínios autorizados.

### Disponibilidade:

- `docker compose up -d` deve subir DB + API + Front sem erro.

### Usabilidade:

- Formulários com validação de campos e mensagens claras.

- “Empty states” explicando o que fazer quando não há dados.

### Observabilidade:

- Endpoint `/healthz` respondendo 200 se API + DB estão OK.

- Logs estruturados com:
    - `method`, `path`, `status`, `duration_ms`, `userId` (quando autenticado).

### LGPD / Privacidade:

- Não registrar informações pessoais em logs.

- Variáveis sensíveis no `.env` (fora do repositório).