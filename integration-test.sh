docker pull mysql:5.6
docker run -p=3306:3306 --name sql-lint-mysql -e MYSQL_ALLOW_EMPTY_PASSWORD=yes -d mysql:5.6

sql-lint --host="localhost" --user="root" --password="integration-tests" --query="use te" 

docker kill sql-lint-mysql
docker rm sql-lint-mysql
