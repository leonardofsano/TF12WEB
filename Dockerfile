# Imagem base do Node
FROM node:18

# Diretório de trabalho no container
WORKDIR /app

# Copia os arquivos para o container
COPY package*.json ./
RUN npm install

# Copia o restante do projeto
COPY . .

# Expõe a porta usada pela aplicação
EXPOSE 8080

# Comando para iniciar a aplicação
CMD ["npm", "start"]
