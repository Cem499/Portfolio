FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/contact-form-1.0.0.jar app.jar
CMD ["sh", "-c", "java -jar app.jar --server.port=${PORT:-8081}"]
