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

![Docker Containers](Screenshots/01-task1-docker-ps.png)

![Docker Networks](Screenshots/02-task1-network-ls.png)

![Backend Networks](Screenshots/03-task1-backend-networks.png)

![Connectivity Tests](Screenshots/04-task1-connectivity.png)

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

![Apache Host Network](Screenshots/05-task2-apache-host.png)

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

![Initial Bind Mount](Screenshots/06-task3-bind-mount-original.png)

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

![Updated Bind Mount](Screenshots/07-task3-bind-mount-updated.png)

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