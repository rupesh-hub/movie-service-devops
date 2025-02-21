# 1. BUILD STAGE
FROM maven:3.8.7-openjdk-18 AS build
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

# 2. RUNTIME STAGE
FROM amazoncorretto:17

ARG PROFILE=dev
ARG APP_VERSION=1.0.0

WORKDIR /app
COPY --from=build /build/target/movie-service-backend-*.jar /app/

EXPOSE 8181

ENV DB_URL=jdbc:mysql://mysql:3306/product_db
ENV ACTIVE_PROFILE=${PROFILE}
ENV JAR_VERSION=${APP_VERSION}

CMD java -jar -Dspring.profiles.active=${ACTIVE_PROFILE} -Dspring.datasource.url=${DB_URL} movie-service-backend-${JAR_VERSION}.jar

# docker build -t rupesh1997/movie-service-service:1.0.0 -f ../docker/backend/Dockerfile .
# docker run -p 9191:9191 --name product-service -e SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/test_db -e SPRING_DATASOURCE_USERNAME=root -e SPRING_DATASOURCE_PASSWORD=root -network=java-network rupesh1997/movie-service:1.0.0
# docker run -d --name mysql -p 3306:3306 --network=java-network -v mysql-data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=test_db mysql
# docker exec -it mysql
# mysql -u root -p
# docker network ls
# docker network create java-network --driver bridge
# docker network inspect network_id/java_network
# docker volume ls
# docker volume inspect mysql-data
# docker volume rm mysql
# http://localhost:9191/api/v1.0.0/actuator/health
