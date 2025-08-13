FROM node:22-alpine AS development

WORKDIR /app

# Copia apenas o package.json e package-lock.json para instalar dependências
COPY package*.json ./

RUN npm install && npm audit fix

# Copia o restante do código (só para quando subir pela primeira vez)
COPY . .

# Expõe a porta
EXPOSE 3000

# Comando para desenvolvimento (hot reload)
CMD ["npm", "run", "start:dev"]
