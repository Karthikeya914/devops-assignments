# Session 17 - DevSecOps CI/CD Pipeline

This project demonstrates a complete DevSecOps pipeline using GitHub Actions. It automatically builds, tests, scans, and prepares the application for deployment.

### 🛡️ Security & CI/CD Features Included:
- **Unit Testing**: Tests run automatically via `pytest`.
- **SAST (Static Application Security Testing)**: Scans source code using GitHub CodeQL.
- **SCA (Software Composition Analysis)**: Checks Python dependencies for vulnerabilities using `pip-audit`.
- **Container Build & Image Scan**: Builds a Docker image and scans it for vulnerabilities using `Trivy`.
- **Container Registry**: Pushes the secure image to the container registry.

---

### 📸 Execution Screenshots

Below are the execution screenshots of the pipeline, security scans, and local testing:

<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/9bda10e8-92a5-4238-a0e4-0fedabf6b7aa" />
<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/30901b71-0e87-4597-a232-5ae4900060d8" />
<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/0da2a497-9948-40c4-87ab-68314a606804" />
<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/def55849-10b5-4b63-90cd-9942f968e1ca" />
<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/1f49641b-ca95-425c-b6ec-9bd68a39b275" />
