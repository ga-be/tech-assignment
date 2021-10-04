FROM openjdk:17
ADD target/technical-assignment-docker.jar technical-assignment-docker.jar
COPY /src/main/resources/static/key.json .
COPY init.sql /docker-entrypoint-initdb.d
ENTRYPOINT ["java", "-jar","technical-assignment-docker.jar"]
EXPOSE 8080