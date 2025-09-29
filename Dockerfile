# Imagem base do Node.js
FROM node:20-alpine

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package.json package-lock.json ./

# Instalar dependências
RUN npm ci

# Copiar o restante dos arquivos do projeto
COPY . .

# Construir a aplicação para produção
RUN npm run build

# Instalar um servidor web simples para servir a aplicação
RUN npm install -g serve

# Expor porta 3000
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["serve", "-s", "build", "-l", "3000"]
