# OpsPulse — DevOps Final Capstone & Reliability Engineering Platform

[![Session 21 - OpsPulse Pipeline](https://github.com/Karthikeya914/devops-assignments/actions/workflows/session21-pipeline.yml/badge.svg)](https://github.com/Karthikeya914/devops-assignments/actions)
[![Security Gate: Trivy](https://img.shields.io/badge/Security%20Scan-Trivy%20Passed-brightgreen)](https://github.com/Karthikeya914/devops-assignments)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 1. Project Overview

**OpsPulse** is a production-grade, full-stack Cloud Incident & Reliability Engineering Platform built for tracking live production outages, service severities (`P1-CRITICAL` to `P4-LOW`), mitigation statuses, and team runbooks.

This project implements an end-to-end, enterprise-level DevOps lifecycle — tracing an application from developer workstation through automated testing, container security scanning, cloud infrastructure provisioning with Terraform, orchestration on AWS EKS with Kubernetes and Helm, real-time observability with Prometheus & Grafana, and automated GitOps synchronization with ArgoCD.

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

## 4. Repository Structure

```text
session21/
├── backend/                  # FastAPI Application
│   ├── app/                  # REST API, models, schemas, database config
│   │   ├── config.py         # App configuration & environment settings
│   │   ├── db.py             # SQLAlchemy engine & session factory
│   │   ├── main.py           # FastAPI routes, health, ready, metrics
│   │   ├── models.py         # Incident SQLAlchemy ORM model
│   │   └── schemas.py        # Pydantic validation schemas
│   ├── alembic/              # Database migration versions
│   │   └── versions/         # 0001_create_incidents.py
│   ├── tests/                # Pytest automated test suite
│   │   ├── conftest.py       # Isolated test database fixture
│   │   └── test_api.py       # 10 comprehensive endpoint tests
│   ├── Dockerfile            # Hardened non-root Python runtime
│   └── requirements.txt      # Python dependencies
├── frontend/                 # React + Vite Dashboard
│   ├── src/                  # Components, styles, API integration
│   │   ├── main.jsx          # Live incident command interface
│   │   └── styles.css        # Clean operations CSS design system
│   ├── Dockerfile            # Multi-stage build (Node -> Unprivileged Nginx)
│   ├── nginx.conf            # Reverse proxy & routing config
│   └── package.json          # Frontend dependencies
├── docker-compose.yml        # Full local stack definition with healthchecks
├── kubernetes/               # Standalone production Kubernetes manifests
│   ├── configmap.yaml        # Application configuration
│   ├── secret.yaml           # Database credentials secret
│   ├── postgres.yaml         # PostgreSQL Deployment, PVC, and Service
│   ├── backend.yaml          # Backend Deployment (probes, non-root) & Service
│   ├── frontend.yaml         # Frontend Deployment & Service
│   └── ingress-and-hpa.yaml  # Ingress routing & Horizontal Pod Autoscaler
├── helm/taskboard/           # Production Helm Package
│   ├── Chart.yaml            # Helm chart metadata
│   ├── values.yaml           # Default deployment configurations
│   ├── values-dev.yaml       # Development override values
│   ├── values-prod.yaml      # Production override values
│   └── templates/            # Parameterized Kubernetes templates
├── terraform/                # AWS Infrastructure as Code
│   ├── main.tf               # AWS VPC & EKS Cluster provisioning
│   ├── variables.tf          # Configurable region, cluster name, environment
│   ├── outputs.tf            # VPC IDs, cluster endpoints, kubectl command
│   ├── versions.tf           # Required Terraform & AWS provider versions
│   └── terraform.tfvars.example # Safe variable template (zero secrets)
├── security/                 # DevSecOps Documentation & Reports
│   └── README.md             # SAST, SCA, Secret scanning & Trivy analysis
├── monitoring/               # Observability manifests
│   ├── prometheus-values.yaml# Prometheus Helm scraping values
│   └── alert-rules.yaml      # High error rate & latency alert definitions
├── gitops/                   # GitOps with ArgoCD
│   └── argocd-application.yaml # ArgoCD declarative Application sync definition
├── troubleshooting/          # Challenge scenarios
│   ├── TROUBLESHOOTING.md    # Investigation, root causes, and fixes
│   ├── broken-image.yaml     # Scenario 1 manifest (ImagePullBackOff)
│   └── broken-service.yaml   # Scenario 2 manifest (Service selector mismatch)
├── screenshots/              # Submission evidence screenshots
└── README.md                 # Complete project documentation
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

All required evaluation screenshots are stored in `session21/screenshots/`:

| # | Filename | Description | Rubric Module |
|---|---|---|:---:|
| 01 | `01_frontend_application_ui.png` | OpsPulse web dashboard running locally | M1 |
| 02 | `02_fastapi_swagger_docs.png` | FastAPI interactive API documentation | M1 |
| 03 | `03_pytest_passing_output.png` | Pytest 10/10 automated tests passing | M2 |
| 04 | `04_docker_compose_running.png` | Docker Compose running containers | M4 |
| 05 | `05_docker_images_list.png` | Local Docker images and tags | M4 |
| 06 | `06_github_repository_overview.png` | GitHub repository file overview | M3 |
| 07 | `07_git_commit_history.png` | Git commit history (10+ commits) | M3 |
| 08 | `08_github_actions_pipeline.png` | GitHub Actions green pipeline run | M5 |
| 09 | `09_trivy_security_scan.png` | Trivy container vulnerability scan report | M6 |
| 11 | `11_ghcr_container_registry.png` | Published packages in GHCR | M5 |
| 12 | `12_terraform_plan_output.png` | `terraform plan` VPC + EKS execution plan | M7 |
| 13 | `13_aws_console_eks_vpc.png` | AWS Console showing Active EKS cluster | M7 |
| 14 | `14_terraform_destroy_output.png` | `terraform destroy` clean teardown | M7 |
| 15 | `15_k8s_running_pods.png` | `kubectl get all -n opspulse` running pods | M8 |
| 16 | `16_helm_list_release.png` | `helm list -n opspulse` deployed release | M8 |
| 17 | `17_k8s_ingress_and_hpa.png` | `kubectl get ingress,hpa -n opspulse` | M8 |
| 18 | `18_prometheus_metrics_endpoint.png` | Backend `/metrics` Prometheus output | M9 |
| 19 | `19_prometheus_targets_up.png` | Prometheus Targets dashboard showing UP | M9 |
| 20 | `20_grafana_monitoring_dashboard.png` | Grafana live telemetry dashboard | M9 |
| 21 | `21_troubleshooting_investigation.png`| Investigating pod failure with `kubectl` | M10 |
| 22 | `22_troubleshooting_resolved.png` | Pod restored to Running status | M10 |

---

## 13. Lessons Learned & Key Takeaways

1. **Shift-Left Security Works**: Integrating automated Trivy container image scanning directly into GitHub Actions catches CVEs before code reaches production registries.
2. **Infrastructure as Code (IaC) Reproducibility**: Managing AWS VPC and EKS with Terraform eliminates configuration drift and enables automated provisioning and teardown in minutes.
3. **Observability vs Monitoring**: Exposing Prometheus metrics at `/metrics` with dedicated endpoints `/health` (liveness) and `/ready` (database connectivity check) allows Kubernetes to make intelligent routing decisions and self-heal failed pods.
4. **GitOps Auditability**: Reconciling desired cluster state from Git via Helm and ArgoCD provides an immutable history of every production release.
