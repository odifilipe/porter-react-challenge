# Configuração Docker para Porter React Challenge

Este documento descreve como utilizar o Docker para desenvolvimento e produção no projeto Porter React Challenge.

## Requisitos

- Docker instalado
- Docker Compose instalado

## Estrutura de Arquivos Docker

- `Dockerfile` - Configuração para build de produção
- `Dockerfile.dev` - Configuração para ambiente de desenvolvimento
- `docker-compose.yml` - Configuração para orquestrar os containers
- `.dockerignore` - Lista de arquivos a serem ignorados pelo Docker

## Ambiente de Desenvolvimento

Para iniciar o ambiente de desenvolvimento com hot-reload:

```bash
docker-compose up dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

Todas as alterações feitas no código serão refletidas automaticamente no navegador.

## Ambiente de Produção

Para construir e iniciar o ambiente de produção:

```bash
docker-compose up -d prod
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

### Parar os containers

```bash
docker-compose down  # Para todos os containers
```

### Reconstruir as imagens

```bash
docker-compose build dev  # Reconstruir imagem de desenvolvimento
docker-compose build prod  # Reconstruir imagem de produção
```

### Executar testes dentro do container

```bash
docker-compose exec dev npm test
```