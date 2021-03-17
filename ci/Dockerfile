FROM node

RUN mkdir sql-lint
WORKDIR sql-lint

COPY * ./
RUN npm install -g sql-lint
ENTRYPOINT [ "sql-lint" ]
