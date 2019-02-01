# For times when unit tests aren't enough,
# you have to get some hair on your chest
# and resort to bash.

set -e

docker-compose down
docker-compose rm -v
docker-compose up --build -d --force-recreate

# Docker contain takes a bit to get ready
sleep 20 

# docker exec sqllint_mysql_1 mysql -uroot -ppassword -e "SELECT * FROM sql_lint_test.city"
