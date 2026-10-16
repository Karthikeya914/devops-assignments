# Final Troubleshooting Challenge Report

This document records the investigation, root cause analysis, and remediation for the deliberately introduced Kubernetes production failure scenarios.

---

## Challenge 1: `ImagePullBackOff` on Backend Pods

### 1. Problem Identification
A newly deployed backend pod was stuck in `ImagePullBackOff` and could not reach the `Running` state:
```text
NAME                                READY   STATUS             RESTARTS   AGE
opspulse-backend-69b77549cb-k2m9p   0/1     ImagePullBackOff   0          2m14s
```

### 2. Investigation & Resource Inspection
Commands executed to diagnose the failure:
```bash
# Check pod state and recent cluster events
kubectl describe pod opspulse-backend-69b77549cb-k2m9p -n opspulse

# View chronological cluster events
kubectl get events -n opspulse --sort-by=.lastTimestamp
```

**Observed Event Log Output**:
```text
Events:
  Type     Reason     Age                From               Message
  ----     ------     ----               ----               -------
  Normal   Scheduled  2m15s              default-scheduler  Successfully assigned opspulse/opspulse-backend-xxx to ip-10-20-1-45
  Normal   Pulling    2m14s              kubelet            Pulling image "ghcr.io/karthikeya914/opspulse-backend:nonexistent-tag-v99"
  Warning  Failed     2m12s              kubelet            Failed to pull image "...": rpc error: code = NotFound desc = failed to pull and unpack image: not found
  Warning  Failed     2m12s              kubelet            Error: ErrImagePull
  Normal   BackOff    2m                 kubelet            Back-off pulling image "..."
  Warning  Failed     2m                 kubelet            Error: ImagePullBackOff
```

### 3. Root Cause Analysis
The deployment manifest was referencing a non-existent tag `nonexistent-tag-v99` instead of the immutable Git commit SHA image published to GHCR. The container runtime could not locate the image in GitHub Container Registry.

### 4. Remediation / Fix
Updated the image tag in the deployment spec to reference the valid commit SHA:
```yaml
spec:
  containers:
    - name: backend
      image: ghcr.io/karthikeya914/opspulse-backend:cba0910
```

### 5. Verification
Applied the updated configuration and confirmed the pod successfully pulled the image and transitioned to `Running`:
```bash
kubectl get pods -n opspulse
# Output:
# opspulse-backend-56f8f7cdb9-h8n12   1/1     Running   0          45s
```

---

## Challenge 2: Service Selector Mismatch (502 Bad Gateway / No Endpoints)

### 1. Problem Identification
Frontend requests to `/api/incidents` were returning `502 Bad Gateway`, and direct requests to the backend ClusterIP service timed out:
```bash
curl -I http://opspulse-backend:8000/health
# Result: Connection refused / timed out
```

### 2. Investigation & Resource Inspection
Inspected the Kubernetes Service and its active Endpoints:
```bash
# Inspect the service endpoints
kubectl get endpoints opspulse-backend -n opspulse

# Output:
# NAME               ENDPOINTS   AGE
# opspulse-backend   <none>      3m

# Check pod labels
kubectl get pods -n opspulse --show-labels
```

### 3. Root Cause Analysis
- The backend pods were labeled with: `app=opspulse-backend`.
- The `broken-service.yaml` had its selector misconfigured as:
  ```yaml
  selector:
    app: wrong-backend-app-name
  ```
Because no pods matched the selector, the Kubernetes endpoint controller left the `Endpoints` slice empty (`<none>`), causing all traffic routed to the service to drop into a black hole.

### 4. Remediation / Fix
Corrected the service selector to match the pod template labels:
```yaml
spec:
  selector:
    app: opspulse-backend
```

### 5. Verification
Checked that the Endpoints list was populated with the active pod IPs:
```bash
kubectl get endpoints opspulse-backend -n opspulse
# Output:
# NAME               ENDPOINTS                            AGE
# opspulse-backend   10.20.1.12:8000,10.20.2.14:8000      5s

curl -s http://opspulse-backend:8000/health
# Output: {"status": "UP"}
```
Traffic successfully resumed without downtime.
