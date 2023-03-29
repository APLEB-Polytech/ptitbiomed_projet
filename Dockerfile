FROM openjdk:17-alpine
WORKDIR /app
#COPY ./ptitbiomed-api/target/ptitbiomed-api-0.0.1-SNAPSHOT.jar /app
COPY ptitbiomed-api/build/libs/ptitbiomed-api-*-SNAPSHOT.jar /app/ptitbiomed.jar
EXPOSE 8080
CMD ["java", "-jar", "ptitbiomed.jar"]