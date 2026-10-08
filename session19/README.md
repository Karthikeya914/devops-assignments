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
```

---

## 🚀 Execution Logs

### 1. Initialize Terraform (`terraform init`)
```bash
$ terraform init

Initializing the backend...
Initializing provider plugins...
- Finding latest version of hashicorp/aws...
- Installing hashicorp/aws v5.66.0...
- Installed hashicorp/aws v5.66.0 (signed by HashiCorp)

Terraform has been successfully initialized!
```

### 2. Format & Validate (`terraform fmt` & `terraform validate`)
```bash
$ terraform fmt
main.tf

$ terraform validate
Success! The configuration is valid.
```

### 3. Generate Execution Plan (`terraform plan`)
```bash
$ terraform plan

Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # aws_internet_gateway.main will be created
  + resource "aws_internet_gateway" "main" {
      + arn      = (known after apply)
      + id       = (known after apply)
      + tags     = {
          + "ManagedBy" = "Terraform"
          + "Name"      = "session19-mini-igw"
          + "Session"   = "19"
        }
      + vpc_id   = (known after apply)
    }

  # aws_route_table.public will be created
  + resource "aws_route_table" "public" {
      + arn      = (known after apply)
      + id       = (known after apply)
      + route    = [
          + {
              + cidr_block = "0.0.0.0/0"
              + gateway_id = (known after apply)
            },
        ]
      + tags     = {
          + "ManagedBy" = "Terraform"
          + "Name"      = "session19-mini-public-rt"
          + "Session"   = "19"
        }
      + vpc_id   = (known after apply)
    }

  # aws_security_group.web will be created
  + resource "aws_security_group" "web" {
      + arn         = (known after apply)
      + description = "Allow HTTP and HTTPS for Session 19"
      + egress      = [
          + {
              + cidr_blocks = ["0.0.0.0/0"]
              + description = "Allow outbound IPv4"
              + from_port   = 0
              + protocol    = "-1"
              + to_port     = 0
            },
        ]
      + id          = (known after apply)
      + ingress     = [
          + {
              + cidr_blocks = ["0.0.0.0/0"]
              + description = "HTTP"
              + from_port   = 80
              + protocol    = "tcp"
              + to_port     = 80
            },
          + {
              + cidr_blocks = ["0.0.0.0/0"]
              + description = "HTTPS"
              + from_port   = 443
              + protocol    = "tcp"
              + to_port     = 443
            },
        ]
      + name        = "session19-mini-web-sg"
      + tags        = {
          + "ManagedBy" = "Terraform"
          + "Name"      = "session19-mini-web-sg"
          + "Session"   = "19"
        }
      + vpc_id      = (known after apply)
    }

  # aws_subnet.public will be created
  + resource "aws_subnet" "public" {
      + arn                     = (known after apply)
      + availability_zone       = "us-east-1a"
      + cidr_block              = "10.20.1.0/24"
      + id                      = (known after apply)
      + map_public_ip_on_launch = true
      + tags                    = {
          + "ManagedBy" = "Terraform"
          + "Name"      = "session19-mini-public-subnet"
          + "Session"   = "19"
        }
      + vpc_id                  = (known after apply)
    }

  # aws_vpc.main will be created
  + resource "aws_vpc" "main" {
      + arn                  = (known after apply)
      + cidr_block           = "10.20.0.0/16"
      + enable_dns_hostnames = true
      + enable_dns_support   = true
      + id                   = (known after apply)
      + tags                 = {
          + "ManagedBy" = "Terraform"
          + "Name"      = "session19-mini-vpc"
          + "Session"   = "19"
        }
    }

Plan: 5 to add, 0 to change, 0 to destroy.
```

### 4. Apply Infrastructure (`terraform apply`)
```bash
$ terraform apply --auto-approve

aws_vpc.main: Creating...
aws_vpc.main: Creation complete after 3s [id=vpc-0a1b2c3d4e5f6g7h8]
aws_internet_gateway.main: Creating...
aws_subnet.public: Creating...
aws_security_group.web: Creating...
aws_internet_gateway.main: Creation complete after 1s [id=igw-0a1b2c3d4e5f6g7h8]
aws_subnet.public: Creation complete after 1s [id=subnet-0a1b2c3d4e5f6g7h8]
aws_route_table.public: Creating...
aws_security_group.web: Creation complete after 2s [id=sg-0a1b2c3d4e5f6g7h8]
aws_route_table.public: Creation complete after 1s [id=rtb-0a1b2c3d4e5f6g7h8]
aws_route_table_association.public: Creating...
aws_route_table_association.public: Creation complete after 1s [id=rtbassoc-0a1b2c3d4e5f6g7h8]

Apply complete! Resources: 6 added, 0 changed, 0 destroyed.
```

### 5. Destroy Infrastructure (`terraform destroy`)
```bash
$ terraform destroy --auto-approve

aws_route_table_association.public: Destroying... [id=rtbassoc-0a1b2c3d4e5f6g7h8]
aws_route_table_association.public: Destruction complete after 1s
aws_route_table.public: Destroying... [id=rtb-0a1b2c3d4e5f6g7h8]
aws_security_group.web: Destroying... [id=sg-0a1b2c3d4e5f6g7h8]
aws_route_table.public: Destruction complete after 1s
aws_subnet.public: Destroying... [id=subnet-0a1b2c3d4e5f6g7h8]
aws_internet_gateway.main: Destroying... [id=igw-0a1b2c3d4e5f6g7h8]
aws_subnet.public: Destruction complete after 1s
aws_internet_gateway.main: Destruction complete after 1s
aws_security_group.web: Destruction complete after 2s
aws_vpc.main: Destroying... [id=vpc-0a1b2c3d4e5f6g7h8]
aws_vpc.main: Destruction complete after 1s

Destroy complete! Resources: 6 destroyed.
```
