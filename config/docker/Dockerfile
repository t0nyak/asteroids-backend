FROM public.ecr.aws/bitnami/node:14 AS build

WORKDIR /usr/snail

COPY . .

RUN npm ci

EXPOSE 3000

CMD node index.js
