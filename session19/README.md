# Session 19: Cloud & Terraform in Action

This project builds an end-to-end cloud infrastructure using Terraform. It provisions a complete network architecture in AWS, demonstrating the use of Terraform providers, variables, resources, outputs, and state management.

---

## 🏛 Architecture Diagram

Below is the architecture deployed by this Terraform project:

```mermaid
graph TD
    subgraph AWS Cloud
        subgraph VPC [VPC: 10.20.0.0/16]
            IGW[Internet Gateway]
            RT[Route Table]
            
            subgraph Public Subnet [Public Subnet: 10.20.1.0/24]
                SG[Security Group<br>Allow HTTP/HTTPS]
                EC2[EC2 Instance]
            end
        end
        S3[S3 Bucket]
    end

    IGW --- RT
    RT --- Public Subnet
    SG --- EC2
    EC2 -.-> S3

---



### 1. Initialize Terraform (`terraform init`)

<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/3c67189a-da40-4546-a56b-65d2e5e9cf1c" />


### 2. Format & Validate (`terraform fmt` & `terraform validate`)


<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/12e38463-7c52-4bca-8f48-203ffe91221d" />


### 3. Generate Execution Plan (`terraform plan`)

<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/4a799319-1d74-4edf-9174-9e8c619edbce" />

<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/ec339593-7b96-41a2-b70a-915f8981d726" />

### 4. Apply Infrastructure (`terraform apply`)

<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/1ee8909f-739e-49f2-ab7d-b84fead2a4b0" />


### 5. Destroy Infrastructure (`terraform destroy`)

<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/4d83dc1b-3e00-4768-b0bd-dbe7690d3fb6" />
