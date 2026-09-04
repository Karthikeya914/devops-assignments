# Docker Networking & Volume Homework

## Student Details

- **Name:** Karthikeya Chakravaram
- **Roll No:** 24BCS10113

---

# Task 1: Docker Container Networking

Three Docker containers were created:

- **Frontend:** `alpine:latest`
- **Backend:** `alpine:latest`
- **Database:** `mysql:8.0`

Three Docker networks were created:

- `frontend-net`
- `backend-net`
- `database-net`

The frontend container was connected to `frontend-net`.

The backend container was connected to two networks:

- `frontend-net`
- `database-net`

The database container was connected to `database-net`.

### Connectivity Verification

Connectivity between the containers was tested using Docker's internal DNS and `ping`.

Backend to frontend connectivity was tested using:

~~~bash
docker exec backend ping -c 3 frontend
~~~

Backend to database connectivity was tested using:

~~~bash
docker exec backend ping -c 3 database
~~~

Frontend to backend connectivity was tested using:

~~~bash
docker exec frontend ping -c 3 backend
~~~

All connectivity tests were successful, confirming that the containers could communicate through their shared Docker networks.

### Evidence

<img width="2484" height="372" alt="image" src="https://github.com/user-attachments/assets/ff811e07-f70c-4374-aeee-f1be757ddf66" />


<img width="1272" height="286" alt="image" src="https://github.com/user-attachments/assets/b5b3f064-2ea1-4c53-b381-2889e3119e7d" />


<img width="1526" height="162" alt="image" src="https://github.com/user-attachments/assets/b47a217d-a969-4939-a2ae-7f0726f9f158" />


<img width="1324" height="766" alt="image" src="https://github.com/user-attachments/assets/a58153d0-d01d-4621-b321-641fa98b4384" />


---

# Task 2: Host Network

The Apache HTTP Server image was pulled using:

~~~bash
docker pull httpd
~~~

An Apache container was created using the Docker host network:

~~~bash
docker run -d --name apache-host --network host httpd
~~~

The host network configuration was verified using:

~~~bash
docker inspect apache-host --format '{{.HostConfig.NetworkMode}}'
~~~

The output was:

`host`

Apache was also verified using:

~~~bash
docker exec apache-host httpd -t
~~~

The output was:

`Syntax OK`

> **Note:** Since the exercise was performed on macOS using Docker Desktop, direct access to Apache through `http://localhost:80` was not available due to Docker Desktop's host networking behavior. The Apache container was successfully created and verified with `NetworkMode: host`.

### Evidence

<img width="2580" height="306" alt="image" src="https://github.com/user-attachments/assets/43eced95-7946-4979-b019-b4fbfde700a4" />


---

# Task 3: Bind Mount

A local directory named `bind-mount` was created with an `index.html` file.

Initially, the file contained:

`Hello students`

The directory was bind-mounted into an Nginx container named `nginx-bind` and accessed at:

`http://localhost:8085`

The browser displayed:

**Hello students**

### Docker Bind Mount

The Nginx container was created using:

~~~bash
docker run -d \
  --name nginx-bind \
  -p 8085:80 \
  -v "$(pwd):/usr/share/nginx/html" \
  nginx:alpine
~~~

### Evidence

<img width="1440" height="900" alt="Screenshot 2026-09-05 at 12 05 26 AM" src="https://github.com/user-attachments/assets/e6072784-c801-409b-af31-8b00b4faefc6" />


### File Modification

The host `index.html` was modified to:

`Hello students - Updated!`

The change was reflected immediately inside the running Nginx container without restarting it.

The updated file was verified using:

~~~bash
docker exec nginx-bind cat /usr/share/nginx/html/index.html
~~~

The browser was refreshed and displayed:

**Hello students - Updated!**

<img width="1440" height="900" alt="Screenshot 2026-09-05 at 12 07 55 AM" src="https://github.com/user-attachments/assets/41de7e8e-47dc-47cf-89ac-865687af5a8f" />


This confirmed that changes made to the host file were reflected inside the running container through the bind mount.

---

# Task 4: Overlay Network

An overlay network is a Docker network driver that allows containers and services to communicate across multiple Docker hosts.

Overlay networks are commonly used with Docker Swarm and are useful for distributed container applications.

### Key Points

- Overlay networks can span multiple Docker hosts.
- They are useful for distributed applications.
- Docker Swarm commonly uses overlay networks.
- Containers and services on different hosts can communicate through the overlay network.
- An attachable overlay network can allow standalone containers to connect to it.

### Example

~~~bash
docker network create --driver overlay my-overlay
~~~

The overlay network can then be used by Docker services running across multiple hosts in a Docker Swarm environment.

### Docker Documentation

https://docs.docker.com/engine/network/drivers/overlay/

---

# Conclusion

All required Docker Networking and Volume exercises were completed.

- Three Docker networks were created.
- Frontend, backend, and database containers were created.
- The backend container was connected to two networks.
- Connectivity between containers was successfully verified.
- Apache was deployed using host networking.
- Nginx was deployed using a bind mount.
- Bind mount changes were verified without restarting the container.
- Docker overlay networks were researched and documented.
