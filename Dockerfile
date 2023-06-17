FROM openjdk:18-jdk-alpine
COPY ptitbiomed-api/target/*.jar application.jar
ENTRYPOINT ["java","-jar", "-Dspring.profiles.active=dev,bastien,docker", "/application.jar"]
