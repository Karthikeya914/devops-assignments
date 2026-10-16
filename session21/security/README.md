# DevSecOps Implementation & Security Gates

This document details the security layers implemented across the OpsPulse project lifecycle.

## 1. Security Architecture & Defense-in-Depth

```text
Source Code (IDE) ──► Git Commit ──► GitHub Actions CI/CD ──► Container Registry ──► Kubernetes Runtime
   [SAST Checks]       [Secret Scan]    [Trivy Vulnerability Scan]     [Image Digest (SHA)]     [Non-Root User (UID 10001)]
                                        [Security Gate: Fail on Critical]                       [Read-Only Root Filesystem]
```

---

## 2. Security Layers Explained

### Layer 1: SAST (Static Application Security Testing)
- Automated linting and static analysis via `flake8` / `ruff` and Pydantic schema validation.
- Validates data types, bounds, and injection vulnerabilities before containerization.

### Layer 2: SCA (Software Composition Analysis)
- Dependency vulnerability tracking across Python `requirements.txt` and Node `package.json`.
- Trivy analyzes third-party open-source libraries against the National Vulnerability Database (NVD).

### Layer 3: Secret Scanning & Git Hygiene
- `.gitignore` strictly blocks `.env`, AWS credentials, `.pem` keys, and database files.
- Automated secret scanning prevents accidental leakage of API tokens and database credentials into Git history.

### Layer 4: Container Image Scanning (Trivy)
- Both `opspulse-backend` and `opspulse-frontend` container images are scanned during the CI pipeline.
- Base images are hardened using `python:3.12-slim` (with OS-level security upgrades) and `nginx:1.27-alpine`.

### Layer 5: Least Privilege Runtime Security
- **Backend Container**: Runs as unprivileged user `appuser` (UID `10001`), not `root`.
- **Frontend Container**: Nginx configured to run under unprivileged `nginx` user.
- **Kubernetes SecurityContext**: Enforces `runAsNonRoot: true` in deployment specs.

---

## 3. Trivy Security Scan Results Summary

| Target Image | Scanner | Severity Checked | Status | Unfixed Criticals |
|---|---|---|:---:|:---:|
| `opspulse-backend` | Trivy v0.60+ | HIGH, CRITICAL | **PASSED** | 0 |
| `opspulse-frontend` | Trivy v0.60+ | HIGH, CRITICAL | **PASSED** | 0 |

### Sample Scan Output Log
```text
2026-10-16T06:43:12Z  INFO [vulndb] Vulnerability DB downloaded
ghcr.io/karthikeya914/opspulse-backend:cba0910 (debian 12.9)
============================================================
Total: 0 (HIGH: 0, CRITICAL: 0)
Security Gate: PASSED (No blocking CVEs found)
```
