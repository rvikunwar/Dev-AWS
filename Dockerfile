FROM node:16.20
RUN mkdir -p /home/app
WORKDIR /home/app
COPY . /home/app
RUN npm install

EXPOSE 9001
CMD ["node", "index.js"]
