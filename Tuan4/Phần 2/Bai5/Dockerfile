# Stage 1: Build app
FROM golang:1.21-alpine AS build

WORKDIR /app

COPY . .

# build trực tiếp file main.go (không cần go.mod)
RUN go build -o app main.go

# Stage 2: Run app
FROM alpine:latest

WORKDIR /app

COPY --from=build /app/app .

EXPOSE 8080

CMD ["./app"]