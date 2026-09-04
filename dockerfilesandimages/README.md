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

<img width="1440" height="900" alt="Screenshot 2026-09-04 at 11 44 01 PM" src="https://github.com/user-attachments/assets/32685ce6-57c2-4ca0-b010-9dbf913d768c" />


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

<img width="1200" height="50" alt="Screenshot 2026-09-04 at 11 42 32 PM" src="https://github.com/user-attachments/assets/671676a4-d795-4670-b533-23a7e49ea525" />


---

## Task 3: Docker Application Deployment

Three different types of applications were deployed using Docker.

### Node.js Application

- **Docker Image:** `nodejs-hello-world`
- **Host Port:** `3000`

<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/a363c721-349a-4e5f-a5de-ea7a4c64bcd5" />


### Python Application

- **Docker Image:** `python-hello-world`
- **Host Port:** `8000`

<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/76fa9270-92d7-4e38-be1d-e259ffcfef1a" />
### Java Application

- **Docker Image:** `java-hello-world`
- **Host Port:** `8080`

<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/1bd93010-965e-43e6-824e-73b81e6923c7" />

## Conclusion

The Docker multi-stage application was successfully built and deployed using the provided multi-stage Dockerfile.

The application was verified through the browser on port `8080`, and the running container was verified using `docker ps`.

Additionally, Node.js, Python, and Java applications were successfully built and deployed using Docker.
