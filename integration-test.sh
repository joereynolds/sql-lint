docker pull mysql
docker run --name sql-lint-mysql -e MYSQL_ROOT_PASSWORD=integration-tests -d mysql:latest
