FROM node:18.13.0

RUN mkdir -p /app

WORKDIR /app

# Bundle app source
COPY . /app/

RUN npm ci

EXPOSE 3000

ENTRYPOINT ["npm", "run", "start"]
