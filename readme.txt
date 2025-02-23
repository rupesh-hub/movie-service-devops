docker run -d \
  --name mysql \
  --network devops \
  -v mysql_data:/var/lib/mysql \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=product_db \
  mysql:latest

docker run -d -p 3306:3306 --name mysql --network devops -v mysql_data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=product_db mysql:8.0
docker build -t rupesh1997/backend:1.0.0 -f ../docker/backend/Dockerfile .
docker run -d -p 8181:8181 --name backend --network devops rupesh1997/backend:1.0.0

docker build -t rupesh1997/frontend:1.0.0 -f ../docker/frontend/Dockerfile .
docker run -d -p 8080:80 --name frontend --network devops rupesh1997/frontend:1.0.0

docker kill frontend && docker rm frontend
docker images

docker rmi -f <image-id>

docker system prune -f