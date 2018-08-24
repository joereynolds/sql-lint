FROM mysql:5.7.15
ADD schema.sql /docker-entrypoint-initdb.d
