# OpsPulse — Cloud Incident & Reliability Platform
## DevOps Final Capstone Presentation (Session 21)
**Presenter:** Karthikeya  
**Repository:** [https://github.com/Karthikeya914/devops-assignments](https://github.com/Karthikeya914/devops-assignments)  
**Date:** October 2026  

---

## Slide 1: Project Overview & Problem Statement
* **Platform Name:** OpsPulse
* **Domain:** Cloud Incident & System Reliability Management Platform
* **Business Problem:** In distributed microservice architectures, engineers need an auditable, high-availability platform to declare, track, and mitigate production incidents in real time.
* **Capstone Objective:** Demonstrate a complete end-to-end production lifecycle from local polyglot code to monitored AWS EKS cloud infrastructure.

---

## Slide 2: Technology Stack & Polyglot Architecture
* **Frontend:** React + Vite, Nginx Alpine runtime (Port 3000)
* **Backend:** Python FastAPI, SQLAlchemy ORM, Pydantic, Uvicorn (Port 8000)
* **Database:** PostgreSQL 16 Alpine, Alembic schema migrations
* **Containerization:** Multi-stage Docker builds, non-root users, Docker Compose
* **Automation:** GitHub Actions CI/CD with SHA-based image tagging
* **Security:** Trivy container vulnerability scanner (CVE gating)
* **Infrastructure as Code:** Terraform, AWS VPC, AWS EKS (ap-south-1)
* **Orchestration:** Kubernetes 1.31, Helm v3, Ingress, HPA, Probes
* **Observability:** Prometheus `/metrics`, Grafana dashboards
* **Continuous Delivery:** GitOps via declarative ArgoCD manifests

---

## Slide 3: End-to-End System Architecture

```text
[Developer]
    │ git push origin main
    ▼
[GitHub Actions CI/CD]
    ├── 1. Automated Testing (pytest -v: 10/10 passed)
    ├── 2. Frontend Node Build & Typecheck
    ├── 3. Multi-Stage Docker Builds (backend & frontend)
    ├── 4. Trivy Security Vulnerability Scan (0 CVEs)
    └── 5. Publish to GitHub Container Registry (ghcr.io)
               │
               ▼
[Infrastructure as Code (Terraform)]
    └── Provisions AWS VPC (ap-south-1) + Managed EKS Cluster (opspulse-eks)
               │
               ▼
[Kubernetes Orchestration (Helm)]
    ├── Ingress Controller routes traffic (/ -> frontend, /api -> backend)
    ├── Backend Deployments (2 Replicas, Liveness & Readiness Probes, HPA)
    ├── Frontend Deployments (2 Replicas, Nginx Reverse Proxy)
    └── PostgreSQL Stateful Storage
               │
               ▼
[Observability & Monitoring]
    ├── Prometheus scrapes /metrics endpoint
    └── Grafana displays real-time telemetry & incident KPI rates
```

---

## Slide 4: Automated Testing & DevSecOps Security
* **Automated Quality Gates:**
  * 10 automated test suites covering CRUD, statistics, schema validation, and health checks.
  * SQLite in-memory test fixtures isolate tests from production database state.
* **Shift-Left Security with Trivy:**
  * Automated image scanning integrated directly into the CI pipeline.
  * Severity gating blocks builds on CRITICAL / HIGH vulnerabilities.
  * Multi-stage alpine builds strip compiler toolchains, yielding a 0-vulnerability baseline.

---

## Slide 5: Infrastructure as Code (Terraform & AWS)
* **Declarative Cloud Architecture:**
  * Dedicated VPC (`10.0.0.0/16`) across 2 availability zones in `ap-south-1` (Mumbai).
  * Public & Private subnets with NAT Gateways for secure egress.
  * Managed EKS Cluster (`opspulse-eks`) with managed worker node groups.
* **Reproducibility & Cost Safety:**
  * Clean `terraform plan` execution (57 resources planned).
  * Full cluster lifecycle verified live in the AWS Management Console.
  * Automated `terraform destroy` teardown confirmation preventing cost overruns.

---

## Slide 6: Kubernetes Orchestration & Helm Packaging
* **Helm Package Architecture (`helm/opspulse`):**
  * Parameterized templates for Deployments, ClusterIP Services, Ingress, and HPA.
  * Dedicated `opspulse` namespace for cluster isolation.
* **Production Reliability Features:**
  * **Zero-Downtime Rolling Updates:** Guaranteed min-replicas during deployments.
  * **Health Probes:** Liveness (`/health`) and Readiness (`/ready`) prevent traffic routing to unready pods.
  * **Horizontal Pod Autoscaling (HPA):** Dynamic scaling based on CPU and memory thresholds.

---

## Slide 7: Observability, Metrics & Troubleshooting
* **Prometheus Telemetry:**
  * Native `/metrics` endpoint exports HTTP request latencies, status code counters, and incident metrics.
* **Proactive Health Probing:**
  * Liveness probe restarts deadlocked application workers.
  * Readiness probe tests database connection pooling before admitting user traffic.
* **Deliberate Troubleshooting Runbooks (`troubleshooting/`):**
  * Diagnosed and documented root causes for `ErrImagePull`, Service port mismatches, and DNS resolution failures.

---

## Slide 8: Key Takeaways & Lessons Learned
1. **Automation Eliminates Human Error:** Automating builds, tests, and security scans via GitHub Actions prevents regressions from ever touching production.
2. **Infrastructure as Code is Essential:** Managing cloud environments declaratively with Terraform guarantees 100% environment parity and painless teardown.
3. **Observability Enables High Reliability:** Rich health checks and Prometheus metrics make systems self-healing and auditable.
4. **GitOps Provides Auditability:** Git as the single source of truth ensures complete change visibility and rapid disaster recovery.
