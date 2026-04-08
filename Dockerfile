FROM ubuntu/node:20-24.04

WORKDIR /app
COPY . .

RUN npm i express@latest mineflayer@latest minecraft-protocol@latest prismarine-chat@latest


EXPOSE 8080

CMD ["node" , "index.js"]
