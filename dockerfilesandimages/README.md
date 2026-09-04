# Docker Multi-Stage Build Homework

## Student Details

- **Name:** Karthikeya Chakravaram
- **Roll No:** 24BCS10113

---

## Task 1: Run Multi-Stage Dockerfile

The provided multi-stage Dockerfile was cloned from the DevOps Heroes repository and used without modification.

### Docker Image Build

Command:

~~~bash
docker build -t multi-stage-hello-world .
~~~

The Docker image was successfully built using the provided multi-stage Dockerfile.

### Run Container

Command:

~~~bash
docker run -d -p 8080:3000 --name multi-stage-hello-world multi-stage-hello-world
~~~

The application runs on port `3000` inside the container and is mapped to port `8080` on the host.

### Application Verification

The application was accessed at:

http://localhost:8080

The application displayed:

**Hello World from Docker Multi-Stage Build!**

# Docker Multi-Stage Build Homework

## Student Details

- **Name:** Karthikeya Chakravaram
- **Roll No:** 24BCS10113

---

## Task 1: Run Multi-Stage Dockerfile

The provided multi-stage Dockerfile was cloned from the DevOps Heroes repository and used without modification.

### Docker Image Build

Command:

~~~bash
docker build -t multi-stage-hello-world .
~~~

The Docker image was successfully built using the provided multi-stage Dockerfile.

### Run Container

Command:

~~~bash
docker run -d -p 8080:3000 --name multi-stage-hello-world multi-stage-hello-world
~~~

The application runs on port `3000` inside the container and is mapped to port `8080` on the host.

### Application Verification

The application was accessed at:

http://localhost:8080

The application displayed:

**Hello World from Docker Multi-Stage Build!**

![Multi-Stage Application](Screenshots/01-multistage-browser.png)

---

## Task 2: Verify Running Container

The running Docker container was verified using:

~~~bash
docker ps
~~~

The output showed the multi-stage application running with the following port mapping:

~~~text
0.0.0.0:8080->3000/tcp
~~~

This confirms that the application is running successfully and can be accessed through port `8080`.

![Docker PS](Screenshots/02-docker-ps.png)

---

## Task 3: Docker Application Deployment

Three different types of applications were deployed using Docker.

### Node.js Application

- **Docker Image:** `nodejs-hello-world`
- **Host Port:** `3000`

![Node.js Application](Screenshots/01-nodejs.png)

### Python Application

- **Docker Image:** `python-hello-world`
- **Host Port:** `8000`

![Python Application](Screenshots/02-python.png)

### Java Application

- **Docker Image:** `java-hello-world`
- **Host Port:** `8080`

![Java Application](Screenshots/03-java.png)

---

## Conclusion

The Docker multi-stage application was successfully built and deployed using the provided multi-stage Dockerfile.

The application was verified through the browser on port `8080`, and the running container was verified using `docker ps`.

Additionally, Node.js, Python, and Java applications were successfully built and deployed using Docker.

---

## Task 2: Verify Running Container

The running Docker container was verified using:

~~~bash
docker ps
~~~

The output showed the multi-stage application running with the following port mapping:

~~~text
0.0.0.0:8080->3000/tcp
~~~

This confirms that the application is running successfully and can be accessed through port `8080`.

![Docker PS](Screenshots/02-docker-ps.png)

---

## Task 3: Docker Application Deployment

Three different types of applications were deployed using Docker.

### Node.js Application

- **Docker Image:** `nodejs-hello-world`
- **Host Port:** `3000`

![Node.js Application](Screenshots/01-nodejs.png)

### Python Application

- **Docker Image:** `python-hello-world`
- **Host Port:** `8000`

![Python Application](Screenshots/02-python.png)

### Java Application

- **Docker Image:** `java-hello-world`
- **Host Port:** `8080`

![Java Application](Screenshots/03-java.png)

---

## Conclusion

The Docker multi-stage application was successfully built and deployed using the provided multi-stage Dockerfile.

The application was verified through the browser on port `8080`, and the running container was verified using `docker ps`.

Additionally, Node.js, Python, and Java applications were successfully built and deployed using Docker.