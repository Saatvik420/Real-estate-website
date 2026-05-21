# Build stage
FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app

# Copy maven wrapper and configuration
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Fix line endings for mvnw (just in case of Windows/Linux mismatch)
RUN sed -i 's/\r$//' mvnw
RUN chmod +x mvnw

# Copy source code
COPY src ./src

# Build the application
RUN ./mvnw clean package -DskipTests

# Run stage
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
