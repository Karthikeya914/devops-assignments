#TERMINAL COMMANDS

<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/3b91dd65-38e0-4f37-9a34-0b372cf66cfb" />

#DOCUMENTATION OF KUBERNETES ARCHITECTURE



Kubernetes mainly has two main parts:

- **Control Plane**
- **Worker Node**

The Control Plane is responsible for managing the cluster and making decisions, while the Worker Nodes are responsible for running the actual applications.

### 1. Control Plane

The main components of the Control Plane are:

#### kube-apiserver

The `kube-apiserver` is the main entry point for the Kubernetes cluster.  
When we use commands through `kubectl`, the request goes to the API server. Other Kubernetes components also communicate through the API server.

#### etcd

`etcd` is the database of the Kubernetes cluster.  
It stores the cluster state and information about Kubernetes objects like Pods, Services and configurations.

#### kube-scheduler

The `kube-scheduler` decides which Worker Node should run a new Pod.  
It checks things like CPU, memory and other requirements before selecting a node.

#### kube-controller-manager

The `kube-controller-manager` keeps checking whether the current state of the cluster matches the desired state.

For example, if we want 3 Pods to be running and one Pod stops, the controller will make sure that another Pod is created.

---

### 2. Worker Node

The main components of a Worker Node are:

#### kubelet

`kubelet` is the main agent running on a Worker Node.  
It receives the required Pod information from the API server and makes sure that the containers are running properly.

#### kube-proxy

`kube-proxy` handles networking on the Worker Node.  
It helps Kubernetes Services send network traffic to the correct Pods.

#### Container Runtime

The Container Runtime is responsible for actually running the containers.

Some examples are:

- `containerd`
- `CRI-O`

#### Pod

A Pod is the smallest deployable unit in Kubernetes.  
It contains one or more containers and is where the application actually runs.

---

### How They Work Together

The basic flow can be understood like this:

```text
                  CONTROL PLANE
              +--------------------+
              |                    |
              |  kube-apiserver    |
              |       |            |
              |   +---+---+        |
              |   |       |        |
              |  etcd  scheduler   |
              |       |            |
              | controller-manager  |
              +-------|------------+
                      |
                      v
                WORKER NODE
              +--------------------+
              |                    |
              |      kubelet       |
              |         |          |
              |         v          |
              | Container Runtime  |
              |         |          |
              |         v          |
              |        Pods        |
              |                    |
              |    kube-proxy      |
              +--------------------+
