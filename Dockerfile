FROM oven/bun:latest

WORKDIR /app
COPY . .

RUN bun i express@latest mineflayer@latest minecraft-protocol@latest prismarine-chat@latest


EXPOSE 8080

CMD ["bun" , "index.js"]
