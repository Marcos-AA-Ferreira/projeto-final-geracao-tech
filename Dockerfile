FROM node:20-alpine

WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Expõe a porta da aplicação
EXPOSE 3000

# Comando para iniciar o servidor em desenvolvimento
CMD ["npm", "run", "dev"]