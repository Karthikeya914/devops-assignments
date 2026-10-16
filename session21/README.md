# OpsPulse — Session 21 Final DevOps Capstone Project

[![Session 21 - OpsPulse Pipeline](https://github.com/Karthikeya914/devops-assignments/actions/workflows/session21-pipeline.yml/badge.svg)](https://github.com/Karthikeya914/devops-assignments/actions)
[![Security Gate: Trivy](https://img.shields.io/badge/Security%20Scan-Trivy%20Passed-brightgreen)](https://github.com/Karthikeya914/devops-assignments)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> [!IMPORTANT]
> ### 🎥 Final Capstone Presentation & Demo Deliverables (Module 10)
> All required presentation and evaluation materials are committed directly in the [`demo/`](demo/) and [`screenshots/`](screenshots/) directories:
>
> 💡 **Video Playback Notice**: Due to GitHub's **10MB file limit** for native inline video playback, please use one of the following options:
> - ▶️ **[Recommended] Stream on Google Drive (Full HD)**: [**Watch Full HD Video Walkthrough**](https://drive.google.com/file/d/1NOnK4_MckSleWCE3L1QyyYfYFvX77iYL/view?usp=sharing) — *Recommended for instant, high-definition browser streaming.*
> - 💾 **Download Local Repository Version (45MB)**: [`demo/walkthrough.mp4`](demo/walkthrough.mp4) — *Download the 45MB version to watch locally.*
>
> - 📊 **Presentation Slides (PDF)**: [`demo/slides.pdf`](demo/slides.pdf) — *Official 10-slide high-definition presentation deck.*
> - 📋 **Submission Checklist & Guidelines**: [`SUBMISSION.md`](SUBMISSION.md) — *Official submission rubric and Google Form submission link.*

---

## 1. Project Overview

**OpsPulse** is an operational Helpdesk and Incident Tracking web application built for the Session 21 Final DevOps Capstone. It provides engineering teams with a clean interface to report service outages, track triage progress (`Open`, `Investigating`, `Mitigated`, `Resolved`), assign priorities (`P1` through `P4`), and manage team runbooks.

The objective of this capstone was to take a full-stack web application through every stage of a modern DevOps lifecycle: writing automated unit tests, building multi-stage Docker containers, running automated Trivy vulnerability scans, provisioning AWS EKS infrastructure with Terraform, orchestrating deployments with Kubernetes and Helm, and gathering real-time telemetry with Prometheus.

---

## 2. End-to-End Architecture

```text
                                  +---------------------------------------+
                                  |            DEVELOPER LAPTOP           |
                                  |   FastAPI + React + Docker Compose    |
                                  +-------------------+-------------------+
                                                      |
                                                 git push
                                                      v
                                  +-------------------+-------------------+
                                  |            GITHUB REPO                |
                                  |    Karthikeya914/devops-assignments    |
                                  +-------------------+-------------------+
                                                      |
                                              Actions Trigger
                                                      v
                        +-----------------------------------------------------------+
                        |                 GITHUB ACTIONS CI/CD PIPELINE             |
                        |  1. Pytest Test Suite (10/10 Isolated In-Memory Tests)   |
                        |  2. React Frontend Production Build                       |
                        |  3. Hardened Multi-Stage Docker Builds (Non-Root)        |
                        |  4. DevSecOps: Trivy Container Vulnerability Scan        |
                        |  5. Push Immutable Images to GHCR (Tagged with Git SHA)   |
                        +-----------------------------+-----------------------------+
                                                      |
                                                      v
                                  +-------------------+-------------------+
                                  |     GITHUB CONTAINER REGISTRY (GHCR)  |
                                  |       ghcr.io/karthikeya914/...       |
                                  +-------------------+-------------------+
                                                      |
                                    +-----------------+-----------------+
                                    |                                   |
                                    v                                   v
        +-------------------------------------------+   +-------------------------------+
        |           TERRAFORM (AWS IaC)             |   |        GITOPS (ArgoCD)        |
        |  - AWS VPC (2 Public + 2 Private Subnets) |   |  - Continuous Reconciliation  |
        |  - Internet Gateway & Single NAT Gateway  |   |  - Auto-Sync Helm Releases    |
        |  - AWS EKS Cluster (v1.31)                |   +---------------+---------------+
        |  - Managed Node Group (2x t3.medium)      |                   |
        +---------------------+---------------------+                   |
                              |                                         |
                              +--------------------+--------------------+
                                                   |
                                                   v
                        +-----------------------------------------------------------+
                        |                   AWS EKS KUBERNETES CLUSTER              |
                        |                                                           |
                        |  [ Nginx Ingress Controller ]                             |
                        |         |                                                 |
                        |         +--- / -----> [ Frontend Service ] -> Pods (x2)   |
                        |         +--- /api --> [ Backend Service ]  -> Pods (x2)   |
                        |                                    |                      |
                        |                       [ PostgreSQL Database + PVC ]       |
                        |                                    |                      |
                        |            +-----------------------+                      |
                        |            |                                              |
                        |            v                                              |
                        |  [ Prometheus Scraper ]  ◄──── /metrics (FastAPI)         |
                        |            |                                              |
                        |            v                                              |
                        |  [ Grafana Dashboard ]                                    |
                        |                                                           |
                        |  [ Horizontal Pod Autoscaler (HPA) ]                      |
                        +-----------------------------------------------------------+
```

---

## 3. Technologies Used

| Category | Technologies |
|---|---|
| **Frontend** | React 18, Vite, Vanilla CSS Design System, Responsive UI |
| **Backend** | Python 3.12, FastAPI, SQLAlchemy ORM, Pydantic v2 |
| **Database** | PostgreSQL 16, Alembic Database Migrations |
| **Testing** | Pytest, TestClient, In-Memory SQLite Isolation Fixtures |
| **Containerization** | Docker, Docker Compose, Multi-stage Builds, Non-Root Hardening |
| **CI/CD** | GitHub Actions, GitHub Container Registry (GHCR) |
| **DevSecOps** | Trivy Container Security Scanner, Secret Scanning, Quality Gates |
| **Infrastructure as Code** | Terraform (v1.7+), AWS Provider (~> 5.0), AWS VPC, AWS EKS |
| **Container Orchestration**| Kubernetes (v1.31), Helm v3, Ingress-Nginx, HPA |
| **Observability** | Prometheus, Prometheus FastAPI Instrumentator, Grafana, Alertmanager |
| **GitOps** | ArgoCD Declarative Application CRDs |

---

## 4. Repository Structure (Session 21: Final Project)

```text
session21/                       # Root directory for Final DevOps Capstone Project
├── demo/                        # 🎥 M10: Presentation & Video Walkthrough
│   ├── walkthrough.mp4          # 🎥 Official 5-minute HD screen walkthrough video
│   └── slides.pdf               # 📊 Official 10-slide HD presentation deck (PDF)
├── screenshots/                 # 📷 All 16 verified evaluation screenshots (M1–M9)
│   ├── 01_app_dashboard_live.png
│   ├── 02_swagger_api_endpoints.png
│   ├── 03_pytest_automated_tests.png
│   ├── 04_docker_compose_and_images.png
│   ├── 05_git_commit_history.png
│   ├── 06_github_actions_pipeline_runs.png
│   ├── 07_github_actions_jobs_green.png
│   ├── 08_ghcr_container_packages.png
│   ├── 09_trivy_security_scan_clean.png
│   ├── 10_prometheus_metrics_endpoint.png
│   ├── 11_k8s_running_pods.png
│   ├── 12_helm_list_and_services.png
│   ├── 13_terraform_plan_output.png
│   ├── 13b_terraform_apply_output.png
│   ├── 14_aws_console_eks_cluster.png
│   ├── 15_aws_console_vpc.png
│   └── 16_terraform_destroy_output.png
├── backend/                     # M1 & M2: FastAPI Asynchronous Application & Pytest
│   ├── app/                     # REST API, models, schemas, database config
│   │   ├── config.py            # App configuration & environment settings
│   │   ├── db.py                # SQLAlchemy engine & session factory
│   │   ├── main.py              # FastAPI routes, /health, /ready, /metrics
│   │   ├── models.py            # Incident SQLAlchemy ORM model
│   │   └── schemas.py           # Pydantic validation schemas
│   ├── alembic/                 # Database schema migration versions
│   │   └── versions/            # 0001_create_incidents.py
│   ├── tests/                   # Pytest automated test suite
│   │   ├── conftest.py          # Isolated SQLite test database fixture
│   │   └── test_api.py          # 10 comprehensive endpoint test cases
│   ├── Dockerfile               # Hardened non-root Python runtime (UID 10001)
│   └── requirements.txt         # Python dependencies
├── frontend/                    # M1 & M4: React + Vite Single-Page Application
│   ├── src/                     # React components, state, API client
│   │   ├── App.jsx              # Live incident command interface & filters
│   │   └── main.jsx             # React entry point
│   ├── Dockerfile               # Multi-stage build (Node 20 -> Nginx Alpine 28MB)
│   ├── nginx.conf               # Reverse proxy & API routing config
│   └── package.json             # Frontend dependencies
├── terraform/                   # M7: Infrastructure as Code (AWS VPC & EKS)
│   ├── main.tf                  # AWS VPC & EKS Cluster provisioning in ap-south-1
│   ├── variables.tf             # Configurable region, cluster name, environment
│   ├── outputs.tf               # VPC IDs, cluster endpoints, kubectl command
│   ├── versions.tf              # Required Terraform & AWS provider versions
│   └── terraform.tfvars.example # Safe variable template (zero secrets)
├── helm/opspulse/               # M8: Production Kubernetes Helm Package
│   ├── Chart.yaml               # Helm chart metadata
│   ├── values.yaml              # Default deployment configurations
│   ├── values-dev.yaml          # Development override values
│   ├── values-prod.yaml         # Production override values
│   └── templates/               # Parameterized Deployments, Services, Ingress, HPA
├── kubernetes/                  # Standalone production Kubernetes manifests
│   ├── configmap.yaml           # Application configuration
│   ├── secret.yaml              # Database credentials secret
│   ├── postgres.yaml            # PostgreSQL Deployment, PVC, and Service
│   ├── backend.yaml             # Backend Deployment (probes, non-root) & Service
│   ├── frontend.yaml            # Frontend Deployment & Service
│   └── ingress-and-hpa.yaml     # Ingress routing & Horizontal Pod Autoscaler
├── k8s/                         # Cluster bootstrap manifests
│   └── namespace.yaml           # Dedicated opspulse namespace definition
├── monitoring/                  # M9: Observability manifests
│   ├── prometheus-values.yaml   # Prometheus Helm scraping values
│   └── alert-rules.yaml         # High error rate & latency alert definitions
├── security/                    # M6: DevSecOps Documentation & Reports
│   └── README.md                # SAST, SCA, Secret scanning & Trivy analysis
├── gitops/                      # Continuous Delivery with ArgoCD
│   └── argocd-application.yaml  # ArgoCD declarative Application sync definition
├── troubleshooting/             # Final Troubleshooting Challenge
│   ├── TROUBLESHOOTING.md       # Root-cause analysis, logs, and fixes runbook
│   ├── broken-image.yaml        # Scenario 1 manifest (ImagePullBackOff)
│   └── broken-service.yaml      # Scenario 2 manifest (Service selector mismatch)
├── scripts/                     # Helper & automation scripts
│   └── load-test.sh             # Traffic generator for HPA & metrics testing
├── docker-compose.yml           # Full local multi-container stack definition
├── SUBMISSION.md                # Official submission checklist & Google Form link
├── GRADING.md                   # 100-Point grading rubric breakdown
├── README.md                    # Master technical documentation & evidence catalog
├── .gitignore                   # Excludes .env, __pycache__, node_modules, .venv
└── .dockerignore                # Container build context exclusions
```

---

## 5. Local Setup & Verification

### Running the Full Stack with Docker Compose
The fastest way to launch the entire stack (PostgreSQL, FastAPI Backend, React Frontend):

```bash
cd session21
docker compose up --build -d
```

Verify services are up and healthy:
```bash
docker compose ps
```

Access the interfaces:
- **Frontend Dashboard**: [http://localhost:3000](http://localhost:3000)
- **FastAPI Interactive Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **Health Check**: [http://localhost:8000/health](http://localhost:8000/health)
- **Readiness Check**: [http://localhost:8000/ready](http://localhost:8000/ready)
- **Prometheus Metrics**: [http://localhost:8000/metrics](http://localhost:8000/metrics)

---

## 6. Automated Testing (Pytest)

Tests are executed before any Docker image is promoted. The test suite uses an in-memory SQLite database to ensure total isolation from production databases:

```bash
cd session21/backend
source .venv/bin/activate
pytest -v
```

**Results**:
```text
============================= test session starts ==============================
collected 10 items

tests/test_api.py::test_health_check PASSED                              [ 10%]
tests/test_api.py::test_root_endpoint PASSED                             [ 20%]
tests/test_api.py::test_readiness_check PASSED                           [ 30%]
tests/test_api.py::test_create_incident PASSED                           [ 40%]
tests/test_api.py::test_list_incidents PASSED                            [ 50%]
tests/test_api.py::test_get_incident_by_id PASSED                        [ 60%]
tests/test_api.py::test_get_incident_not_found PASSED                    [ 70%]
tests/test_api.py::test_update_incident PASSED                           [ 80%]
tests/test_api.py::test_incident_stats PASSED                            [ 90%]
tests/test_api.py::test_delete_incident PASSED                           [100%]

======================== 10 passed in 0.12s ========================
```

---

## 7. CI/CD & DevSecOps Pipeline

The pipeline triggers automatically on every push to `main` via `.github/workflows/session21-pipeline.yml`:

1. **Test Job**: Sets up Python 3.12, installs dependencies, and runs `pytest -v`. Sets up Node.js 22 and builds the React frontend.
2. **Build & Scan Job**: Logs into GitHub Container Registry (GHCR), builds both Docker images, installs **Trivy**, and runs container security vulnerability scans for `HIGH` and `CRITICAL` CVEs.
3. **Publish Job**: Pushes images to GHCR using the immutable Git commit SHA tag (`ghcr.io/karthikeya914/opspulse-backend:${{ github.sha }}`).

---

## 8. Terraform AWS Infrastructure

Provisions a production-grade VPC and managed EKS cluster in AWS:

```bash
cd session21/terraform
terraform init
terraform plan
terraform apply
```

After creation, configure `kubectl`:
```bash
aws eks update-kubeconfig --region ap-south-1 --name opspulse-eks
```

When finished with evaluations, tear down all resources cleanly to prevent AWS charges:
```bash
terraform destroy -auto-approve
```

---

## 9. Kubernetes & Helm Deployment

Deploy the entire packaged application using Helm:

```bash
helm upgrade --install opspulse ./session21/helm/taskboard \
  --namespace opspulse \
  --create-namespace \
  --values session21/helm/taskboard/values.yaml
```

Verify the deployment:
```bash
kubectl get all,ingress,hpa -n opspulse
```

---

## 10. Observability & Monitoring

Prometheus scrapes application performance metrics exposed by FastAPI Prometheus Instrumentator:
- `http_requests_total`: Tracks request rates and HTTP status codes (2xx, 4xx, 5xx).
- `http_request_duration_seconds`: Histogram measuring API latency percentiles (p50, p95, p99).
- Grafana dashboards visualize real-time request velocity, active incident rates, and container resource utilization.

---

## 11. Final Troubleshooting Challenge

Detailed RCA and resolution steps are documented in [troubleshooting/TROUBLESHOOTING.md](file:///Users/karthikeya/devops-assignments/session21/troubleshooting/TROUBLESHOOTING.md):
- **Scenario 1**: Diagnosed and repaired an `ImagePullBackOff` issue caused by invalid image tags.
- **Scenario 2**: Diagnosed and repaired a `502 Bad Gateway / No Endpoints` outage caused by a Kubernetes Service label selector mismatch.

---

## 12. Submission Evidence & Screenshots Catalog

### 🎥 Presentation & Video Walkthrough Deliverables (Module 10)
All presentation and video assets are committed directly in the [`demo/`](demo/) folder:

> [!TIP]
> **Video Playback Notice**: Since GitHub has a 10MB limit for native browser video playback, we recommend streaming the video directly in HD via Google Drive, or downloading the repository video file:
> - ▶️ **[Recommended] Stream Full HD Video**: [**Google Drive Video Stream**](https://drive.google.com/file/d/1NOnK4_MckSleWCE3L1QyyYfYFvX77iYL/view?usp=sharing)
> - 💾 **Download Video File (45MB)**: [`demo/walkthrough.mp4`](demo/walkthrough.mp4)

| # | Artifact | Description | Status | Rubric Module |
|---|---|---|:---:|:---:|
| 🎥 | [▶️ **Watch on Google Drive (Recommended)**](https://drive.google.com/file/d/1NOnK4_MckSleWCE3L1QyyYfYFvX77iYL/view?usp=sharing)<br>Download: [`demo/walkthrough.mp4`](demo/walkthrough.mp4) (45MB) | **5-Minute Presentation Walkthrough Video** covering codebase, GitHub Actions, live OpsPulse app, Terraform AWS console, and Kubernetes | Verified ✅ | M10 |
| 📊 | [`demo/slides.pdf`](demo/slides.pdf) | **Official 10-Slide Presentation PDF Deck** with embedded architecture diagrams and evaluation proof | Verified ✅ | M10 |
| 📋 | [`SUBMISSION.md`](SUBMISSION.md) | Official submission checklist, rubrics, and Google Form submission link | Verified ✅ | M10 |

### 📷 Evaluation Screenshots Catalog (Modules 1–9)
All 16 required evaluation screenshots are stored in the dedicated [`screenshots/`](screenshots/) directory:

| # | Filename | Description | Status | Rubric Module |
|---|---|---|:---:|:---:|
| 01 | [`01_app_dashboard_live.png`](screenshots/01_app_dashboard_live.png) | OpsPulse web dashboard running locally at `localhost:3000` | Verified ✅ | M1 |
| 02 | [`02_swagger_api_endpoints.png`](screenshots/02_swagger_api_endpoints.png) | FastAPI interactive Swagger documentation (`localhost:8000/docs`) | Verified ✅ | M1 |
| 03 | [`03_pytest_automated_tests.png`](screenshots/03_pytest_automated_tests.png) | Pytest 10/10 automated tests passing | Verified ✅ | M2 |
| 04 | [`04_docker_compose_and_images.png`](screenshots/04_docker_compose_and_images.png) | Docker Compose services Up + Docker image sizes | Verified ✅ | M4 |
| 05 | [`05_git_commit_history.png`](screenshots/05_git_commit_history.png) | Git commit history on `main` | Verified ✅ | M3 |
| 06 | [`06_github_actions_pipeline_runs.png`](screenshots/06_github_actions_pipeline_runs.png) | GitHub Actions green pipeline run | Verified ✅ | M5 |
| 07 | [`07_github_actions_jobs_green.png`](screenshots/07_github_actions_jobs_green.png) | CI test and build/scan jobs completed successfully | Verified ✅ | M5 |
| 08 | [`08_ghcr_container_packages.png`](screenshots/08_ghcr_container_packages.png) | Published container packages in GitHub Container Registry | Verified ✅ | M5 |
| 09 | [`09_trivy_security_scan_clean.png`](screenshots/09_trivy_security_scan_clean.png) | Trivy container vulnerability scan report (0 vulnerabilities) | Verified ✅ | M6 |
| 10 | [`10_prometheus_metrics_endpoint.png`](screenshots/10_prometheus_metrics_endpoint.png) | Backend `/metrics` Prometheus telemetry output | Verified ✅ | M9 |
| 11 | [`11_k8s_running_pods.png`](screenshots/11_k8s_running_pods.png) | `kubectl get pods -n opspulse` showing all backend & postgres pods running | Verified ✅ | M8 |
| 12 | [`12_helm_list_and_services.png`](screenshots/12_helm_list_and_services.png) | `helm list -n opspulse` deployed release + ClusterIP services | Verified ✅ | M8 |
| 13 | [`13_terraform_plan_output.png`](screenshots/13_terraform_plan_output.png) | `terraform plan` VPC + EKS execution plan (57 to add) | Verified ✅ | M7 |
| 13b | [`13b_terraform_apply_output.png`](screenshots/13b_terraform_apply_output.png) | `terraform apply` terminal output: 57 resources added, EKS cluster & VPC created | Verified ✅ | M7 |
| 14 | [`14_aws_console_eks_cluster.png`](screenshots/14_aws_console_eks_cluster.png) | AWS Console showing Active EKS cluster (`opspulse-eks`) in `ap-south-1` | Verified ✅ | M7 |
| 15 | [`15_aws_console_vpc.png`](screenshots/15_aws_console_vpc.png) | AWS Console showing Available VPC (`opspulse-eks-vpc`) in `ap-south-1` | Verified ✅ | M7 |
| 16 | [`16_terraform_destroy_output.png`](screenshots/16_terraform_destroy_output.png) | `terraform destroy` clean teardown confirmation (all resources destroyed) | Verified ✅ | M7 |

---

## 13. Lessons Learned & Key Takeaways

1. **Automated Security Gates**: Running Trivy directly in the GitHub Actions CI pipeline caught base-image vulnerabilities before publishing images to GHCR.
2. **Infrastructure as Code**: Defining the VPC and EKS cluster in Terraform made it predictable to provision 57 cloud resources and cleanly destroy them with `terraform destroy` so no idle AWS charges remain.
3. **Health vs Readiness in Kubernetes**: Separating `/health` (liveness) from `/ready` (which checks actual PostgreSQL database connectivity) prevents Kubernetes from routing traffic to backend pods before the database is ready.
4. **Helm Configuration Management**: Packaging Kubernetes manifests into Helm charts made it straightforward to customize deployment parameters between local testing and production configurations.
