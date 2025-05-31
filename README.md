# TF12WEB - Sistema de Gerenciamento de Pessoas

Este é um projeto de API REST para gerenciamento de pessoas e seus telefones, construído com Node.js, Express, PostgreSQL e Docker.

## Pré-requisitos

Para executar este projeto, você precisa ter instalado:

- [Docker](https://www.docker.com/products/docker-desktop/)
- [Docker Compose](https://docs.docker.com/compose/install/) (geralmente já vem com o Docker Desktop)
- [Node.js](https://nodejs.org/) (versão 22 ou superior)

## Estrutura do Projeto

```
TF12WEB/
├── app/
│   ├── Controllers/      # Controladores da aplicação
│   └── Models/          # Modelos do Sequelize
├── config/             # Configurações do projeto
├── docker/            # Arquivos Docker e configurações
├── public/           # Arquivos estáticos
├── routes/          # Rotas da aplicação
└── docker-compose.yml  # Configuração dos containers
```

## Configuração e Execução

1. **Clone o repositório**

2. **Configure as variáveis de ambiente**
   - O arquivo `.env` já está configurado com as seguintes variáveis:
   ```
   PORT=8080
   POSTGRES_HOST=postgres-tf12-container
   POSTGRES_PORT=5432
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=postgres
   POSTGRES_DB=postgres
   ```

3. **Construa e inicie os containers**
   ```powershell
   docker-compose up --build -d
   ```
   Este comando irá:
   - Construir a imagem do Node.js
   - Construir a imagem do Nginx
   - Iniciar o container do PostgreSQL
   - Executar os scripts de inicialização do banco de dados
   - Iniciar a aplicação Node.js
   - Configurar o proxy reverso com Nginx

4. **Verificar se os containers estão rodando**
   ```powershell
   docker ps
   ```
   Você deverá ver 3 containers em execução:
   - tf12web-node-web-tf12-container
   - tf12web-nginx-tf12-container
   - tf12web-postgres-tf12-container

## Testando a API

A API estará disponível em `http://localhost:8080`

### Endpoints disponíveis:

1. **Listar Pessoas**
   ```
   GET http://localhost:8080/api/pessoas
   ```
   Parâmetros de consulta opcionais:
   - `limit`: Número de registros por página (padrão: 10)
   - `offset`: Número de registros para pular (padrão: 0)
   - `orderBy`: Campo e direção para ordenação (exemplo: created_at,desc)

## Resolução de Problemas

1. **Se a porta 8080 estiver em uso:**
   ```powershell
   # Encontre o processo usando a porta
   netstat -ano | findstr :8080
   
   # Encerre o processo (substitua [PID] pelo número do processo)
   taskkill /F /PID [PID]
   ```

2. **Se precisar reiniciar os containers:**
   ```powershell
   # Pare todos os containers
   docker-compose down
   
   # Inicie novamente
   docker-compose up -d
   ```

3. **Para ver os logs:**
   ```powershell
   # Logs do container Node.js
   docker logs tf12web-node-web-tf12-container-1
   
   # Logs do PostgreSQL
   docker logs tf12web-postgres-tf12-container-1
   
   # Logs do Nginx
   docker logs tf12web-nginx-tf12-container-1
   ```

## Estrutura do Banco de Dados

O banco de dados possui duas tabelas principais:

1. **pessoas**
   - id (PRIMARY KEY)
   - nome
   - created_at
   - updated_at

2. **telefones**
   - id (PRIMARY KEY)
   - numero
   - id_pessoa (FOREIGN KEY)
   - created_at
   - updated_at

Os scripts de inicialização do banco de dados estão localizados em `docker/postgres/init/`.
