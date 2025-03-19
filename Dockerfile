FROM node:18-alpine

RUN npm install -g http-server

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'node watcher.js & http-server ./static -p 8080' >> /app/start.sh && \
    chmod +x /app/start.sh
EXPOSE 8080
VOLUME /app/config.js

CMD ["/app/start.sh"]