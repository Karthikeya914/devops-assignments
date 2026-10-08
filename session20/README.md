# Session 20: Monitoring, Observability & GitOps

This repository contains the deliverables for Session 20, covering Monitoring, Observability, and a complete GitOps implementation using Argo CD.

---

## 📊 Task 1 & 2: Monitoring and Observability

### 1. Monitoring
Monitoring is the process of collecting, analyzing, and using information to track a program’s progress toward reaching its objectives and to guide management decisions. 
- **Metrics**: Quantitative data (numbers) measuring system performance (e.g., CPU, Memory).
- **Logs**: Immutable records of discrete events that happened over time (e.g., error messages).
- **Alerts**: Notifications triggered when metrics cross a defined threshold.
- **Application Health**: Often measured using Liveness and Readiness probes in Kubernetes to ensure traffic only flows to healthy pods.

### 2. Observability (The Three Pillars)
Observability answers the question: *Why is my system doing what it is doing?*

**1. Metrics (Numbers)** 
*What it means:* Numerical measurements over time (e.g., 85% CPU usage).
*Why it is required:* Helps identify trends, scale infrastructure, and alert on thresholds.
*Common Tools:* Prometheus.

**2. Logs (Events)**
*What it means:* Textual records of events that happened in your system.
*Why it is required:* Provides granular detail for debugging specific issues.
*Common Tools:* ELK Stack (Elasticsearch, Logstash, Kibana), Loki.

**3. Traces (Request Journey)**
*What it means:* Tracks a single request as it travels through multiple microservices.
*Why it is required:* Identifies exact bottlenecks in distributed architectures.
*Common Tools:* Jaeger, OpenTelemetry.

---

## 🔄 Task 3: GitOps

### What is GitOps?
GitOps is a framework where the entire desired state of the system is stored in version control (Git). Any changes to the infrastructure or applications are made via Pull Requests.

### Core Concepts
1. **Git as the Source of Truth:** If it is not in Git, it does not exist in the cluster.
2. **Declarative Configuration:** You declare *what* you want (e.g., 3 replicas), not *how* to get there.
3. **Continuous Reconciliation:** A software agent (like Argo CD) constantly compares the Git repo to the actual cluster and forces them to match.

### Kubernetes + GitOps (The Loop)
```text
        +------------------+
        |       Git        |
        | Desired State    |
        +--------+---------+
                 |
                 v
             Argo CD
                 |
                 v
          Kubernetes
          Actual State
                 |
                 +-------> Compare & Reconcile
```

---

## 🚀 GitOps Demo (Argo CD)



### 1. Create Cluster & Install Argo CD
<img width="1440" height="900" alt="Screenshot 2026-10-08 at 8 15 13 PM" src="https://github.com/user-attachments/assets/b3f4e061-51a3-461c-88aa-0b12c0dd5985" />


### 2. Apply Argo CD Application
<img width="1440" height="900" alt="Screenshot 2026-10-08 at 8 17 19 PM" src="https://github.com/user-attachments/assets/679b48f2-3cc7-48f6-ae8c-8e110a510684" />


### 3. Check Kubernetes Workloads
<img width="1440" height="900" alt="Screenshot 2026-10-08 at 8 17 59 PM" src="https://github.com/user-attachments/assets/47d06847-489b-4928-ba22-068fafb61258" />


### 4. Demonstrate Self-Healing
<img width="1440" height="900" alt="Screenshot 2026-10-08 at 8 18 25 PM" src="https://github.com/user-attachments/assets/d35493b7-721a-4ba7-893e-3ea459265d22" />

