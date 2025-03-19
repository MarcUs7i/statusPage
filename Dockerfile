FROM node:18-alpine

RUN npm install -g http-server

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
VOLUME /app/config.js
EXPOSE 8080

RUN echo '#!/bin/sh\nnode watcher.js & http-server ./static -p 8080\n' > /app/start.sh && \
    chmod +x /app/start.sh
CMD ["/app/start.sh"]