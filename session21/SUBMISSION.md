# Submission Guidelines — DevSecOps Final Capstone Project

## Deadline

| Parameter | Details |
|---|---|
| **Date** | Sunday, 19 October 2026 |
| **Time** | 11:59 PM IST |
| **Late Policy** | -5 points per 24-hour period after deadline |

---

## Submission Form Link

👉 **Official Google Form Submission Link:** [https://forms.gle/XWAP1vAumDJgAPM1A](https://forms.gle/XWAP1vAumDJgAPM1A)

---

## Repository & Artifacts Checklist

Submit the GitHub repository URL (`https://github.com/Karthikeya914/devops-assignments`).

The `session21/` folder contains:

1. **`README.md`** — Comprehensive technical documentation, architectural diagrams, runbooks, and verified screenshot evidence catalog.
2. **`screenshots/`** — All 16 evaluation screenshots covering M1 through M9.
3. **`demo/` folder**:
   - 📊 **Presentation Slides** ([`demo/slides.pdf`](demo/slides.pdf))
   - 🎥 **Presentation Video Walkthrough** (`demo/walkthrough.mp4`) — *Record 3–5 min screencast before final form submission*.

---

## Presentation Video Walkthrough Guide (Module 10)

Your 3–5 minute video presentation should cover:

1. **Slide Deck Overview (1 min):**
   - Project concept: **OpsPulse** (Cloud Incident & Reliability Platform)
   - Architectural stack: FastAPI + React + PostgreSQL + Docker + GitHub Actions + Trivy + Terraform + AWS EKS + Kubernetes + Helm + Prometheus + Grafana + ArgoCD
2. **Codebase Walkthrough (30 sec):**
   - Folder structure: `backend/`, `frontend/`, `terraform/`, `helm/`, `k8s/`, `monitoring/`, `troubleshooting/`
3. **CI/CD & Security (45 sec):**
   - Show the green GitHub Actions run: Pytest passing, Trivy vulnerability scan clean (0 vulnerabilities), container images published to GHCR with SHA tags
4. **Cloud Infrastructure (45 sec):**
   - Show `terraform plan` output (57 resources planned)
   - Show AWS Console showing active EKS cluster `opspulse-eks` and VPC `opspulse-eks-vpc` in `ap-south-1`
   - Show `terraform destroy` output confirming clean teardown
5. **Kubernetes & Observability (45 sec):**
   - Show `kubectl get pods -n opspulse` (all pods `1/1 Running`)
   - Show `/metrics` Prometheus telemetry endpoint and live UI dashboard at `localhost:3000`
