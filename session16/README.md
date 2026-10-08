# Session 16: CI/CD & GitHub Actions

## CI vs CD
- **Continuous Integration (CI)**: The practice of frequently merging code changes into a central repository where automated builds and tests run. It helps catch bugs early.
- **Continuous Deployment (CD)**: The practice of automatically deploying the tested code from the CI pipeline into production or staging environments without manual intervention.

## GitHub Actions Terminology
- **Workflow**: A configurable automated process that will run one or more jobs. Defined by a YAML file in `.github/workflows/`.
- **Jobs**: A set of steps in a workflow that execute on the same runner. Jobs run in parallel by default.
- **Steps**: Individual tasks that run commands or actions within a Job.
- **Runners**: The server (provided by GitHub or self-hosted) that runs your workflows when they are triggered.
- **Secrets**: Encrypted environment variables used to store sensitive data (like DockerHub passwords or AWS keys).
- **Artifacts**: Files created during a workflow run (like compiled binaries or test reports) that can be shared between jobs or downloaded later.

## Pipeline Execution Flow
The pipeline configured in this repository performs the following sequence:
1. **Checkout Code**: Retrieves the application source code.
2. **Build**: Compiles the application and builds the Docker image using the provided `Dockerfile`.
3. **Test**: Runs automated unit tests against the application to ensure stability.
4. **Deploy**: Pushes the Docker image and executes the deployment.

---

# 10 - Final CI/CD Pipeline

<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/81d40345-152b-4d90-8f49-c6fe491b5da8" />

<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/812c3721-7df6-4284-82a0-ea6099507ceb" />

<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/28cb6866-05cb-432e-b744-cb3def471234" />

<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/b6aa9b37-e44c-4599-b9ed-b3deeeb2f9cb" />
