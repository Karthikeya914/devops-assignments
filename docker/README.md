# Docker Homework Tasks

## Task — Hello World Applications

Created simple **Hello World** web applications using Docker for Node.js, Python, Java, Apache, React, and Nginx.

## Folder Structure

docker/
├── nodejs-app/
│   ├── app.js
│   └── Dockerfile
├── python-app/
│   ├── app.py
│   └── Dockerfile
├── java-app/
│   ├── Main.java
│   └── Dockerfile
├── Apache-app/
│   ├── index.html
│   └── Dockerfile
├── React-app/
│   ├── index.html
│   └── Dockerfile
└── nginx-app/
    ├── index.html
    └── Dockerfile

---

# 1. Node.js Application

Created a simple Node.js HTTP server that displays:

**Hello World from Node.js!**

The application runs on port `3000`.

### Dockerfile

FROM node:20

WORKDIR /app

COPY app.js .

EXPOSE 3000

CMD ["node", "app.js"]

### Build

docker build -t nodejs-hello-world .

### Run

docker run -d -p 3000:3000 --name nodejs-hello-world nodejs-hello-world

### Verification

Opened:

http://localhost:3000

The page displayed **Hello World from Node.js!**

---

# 2. Python Application

Created a simple Python HTTP server that displays:

**Hello World from Python!**

The application runs on port `8000`.

### Dockerfile

FROM python:3.12

WORKDIR /app

COPY app.py .

EXPOSE 8000

CMD ["python", "app.py"]

### Build

docker build -t python-hello-world .

### Run

docker run -d -p 8000:8000 --name python-hello-world python-hello-world

### Verification

Opened:

http://localhost:8000

The page displayed **Hello World from Python!**

---

# 3. Java Application

Created a simple Java HTTP server that displays:

**Hello World from Java!**

The application runs on port `8080`.

### Dockerfile

FROM eclipse-temurin:21

WORKDIR /app

COPY Main.java .

RUN javac Main.java

EXPOSE 8080

CMD ["java", "Main"]

### Build

docker build -t java-hello-world .

### Run

docker run -d -p 8080:8080 --name java-hello-world java-hello-world

### Verification

Opened:

http://localhost:8080

The page displayed **Hello World from Java!**

---

# 4. Apache Web Server

Created a simple HTML page and served it using the Apache HTTP server.

The page displays:

**Hello World from Apache!**

### Dockerfile

FROM httpd:2.4

COPY index.html /usr/local/apache2/htdocs/

EXPOSE 80

### Build

docker build -t apache-hello-world .

### Run

Port `8081` was mapped on the host:

docker run -d -p 8081:80 --name apache-hello-world apache-hello-world

### Verification

Opened:

http://localhost:8081

The page displayed **Hello World from Apache!**

---

# 5. React Application

Created a simple React application that displays:

**Hello World from React!**

The React application is served using Nginx.

### Dockerfile

FROM nginx:alpine

COPY index.html /usr/share/nginx/html/

EXPOSE 80

### Build

docker build -t react-hello-world .

### Run

Port `8082` was mapped on the host:

docker run -d -p 8082:80 --name react-hello-world react-hello-world

### Verification

Opened:

http://localhost:8082

The page displayed **Hello World from React!**

---

# 6. Nginx Application

Created a simple HTML page and served it using the Nginx web server.

The page displays:

**Hello World from Nginx!**

### Dockerfile

FROM nginx:alpine

COPY index.html /usr/share/nginx/html/

EXPOSE 80

### Build

docker build -t nginx-hello-world .

### Run

Port `8083` was mapped on the host:

docker run -d -p 8083:80 --name nginx-hello-world nginx-hello-world

### Verification

Opened:

http://localhost:8083

The page displayed **Hello World from Nginx!**

---

# Docker Images and Ports

| Application | Docker Image | Host Port | Container Port |
|---|---|---:|---:|
| Node.js | `nodejs-hello-world` | 3000 | 3000 |
| Python | `python-hello-world` | 8000 | 8000 |
| Java | `java-hello-world` | 8080 | 8080 |
| Apache | `apache-hello-world` | 8081 | 80 |
| React | `react-hello-world` | 8082 | 80 |
| Nginx | `nginx-hello-world` | 8083 | 80 |

## Conclusion

The six Hello World applications were created using Docker. Each application has its own folder and Dockerfile. The Docker images were built and the applications were run as separate containers. Each application was successfully verified through a web browser using its respective localhost port.