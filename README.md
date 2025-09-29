# Porter React Challenge

Aplicação React para gerenciamento de usuários, com funcionalidades de listagem, busca, paginação e favoritos.

## Sobre o Projeto

Esta aplicação permite visualizar e gerenciar uma lista de usuários obtidos da API Random User. Principais funcionalidades:

- Listagem de usuários com paginação
- Sistema de favoritos persistente
- Busca por nome/email
- Filtro para mostrar apenas favoritos
- Interface responsiva
- Detalhes do usuário em modal

## Tecnologias Utilizadas

- React 19.1.1 - Framework para construção da interface
- Zustand 5.0.8 - Gerenciamento de estado global
- Tailwind CSS 3.4.17 - Framework CSS para estilização
- Random User API - API pública para dados de usuários

## Como Executar o Projeto

### Requisitos

- Node.js (v16+)
- npm ou yarn

### Instalação e Execução Local

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```
3. Execute o projeto:
```bash
npm start
```
4. Acesse a aplicação em [http://localhost:3000](http://localhost:3000)

### Execução com Docker

#### Ambiente de Desenvolvimento (com hot-reload)

```bash
docker-compose up dev
```

#### Ambiente de Produção

```bash
docker-compose up -d prod
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000) em ambos os casos.

## Testes

Execute os testes unitários com:

```bash
npm test
```

## API Utilizada

O projeto utiliza a [Random User API](https://randomuser.me/), uma API REST gratuita que fornece dados aleatórios de usuários para testes e prototipagem.

### Endpoints Utilizados

- `GET https://randomuser.me/api/` - Endpoint principal para buscar usuários
- Parâmetros utilizados:
  - `results`: Número de resultados por página
  - `page`: Número da página
  - `seed`: Semente para garantir resultados consistentes
  - `inc`: Campos a serem incluídos na resposta

## Arquitetura do Projeto

### Estrutura de Diretórios

```
src/
├── components/       # Componentes React reutilizáveis
├── hooks/           # Hooks personalizados
├── services/        # Serviços para comunicação com APIs
├── store/           # Gerenciamento de estado global (Zustand)
└── utils/           # Funções utilitárias
```

### Decisões Arquiteturais

#### 1. Gerenciamento de Estado com Zustand

Optei pelo Zustand em vez de Redux ou Context API, por ser mais simples e intuitivo, suporte nativo para persistência e tamanho reduzido.
Também foi escolhido por ser uma biblioteca que eu queria aprender a usar, o que foi possível nesta aplicação.

#### 2. Separação de Responsabilidades

- Store: Centraliza o estado global e lógica de persistência
- Hooks: Encapsulam a lógica de negócio e fornecem APIs simplificadas
- Services: Isolam a comunicação com APIs externas
- Components: Focados apenas na renderização e interação do usuário

#### 3. Persistência de Favoritos

A persistência de favoritos é implementada usando o middleware `persist` do Zustand:

```javascript
persist(
    (set, get) => ({
        // Estado e ações
    }),
    {
        name: 'user-store', // Nome no localStorage
        partialize: (state) => ({
            favorites: state.favorites // Persiste apenas os favoritos
        })
    }
)
```
Características:
- Armazena apenas os IDs dos usuários favoritos no localStorage
- Restaura automaticamente os favoritos ao recarregar a página
- Aplica o status de favorito aos usuários carregados da API

#### 4. Hooks Customizados

Criamos hooks específicos para cada domínio:
- `useFavorites`: Gerencia a adição/remoção de favoritos
- `useSearch`: Controla a busca e filtragem
- `useUsers`: Gerencia o carregamento e paginação
- `useUI`: Controla estados de UI como loading e erros

Esta abordagem permite:
- Melhor organização do código
- Reutilização de lógica entre componentes
- Testes unitários mais simples
- Componentes mais limpos e focados na UI

#### 5. Icones utilizados

Utilizei os icones do [Heroicons](https://heroicons.com/), para os icones do modal e do botão de favoritos.
