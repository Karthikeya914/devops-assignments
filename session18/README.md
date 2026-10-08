# Session 18: Terraform & AWS Services

This document contains the deliverables for Session 18, including the Terraform S3 Demo execution logs and the AWS Services research.

---

## Task 1: Terraform S3 Demo

Below are the execution logs demonstrating the complete lifecycle (init, format, validate, plan, apply, show, output, and destroy) of creating an AWS S3 bucket using Terraform.

### 1. terraform init
```bash
$ terraform init

Initializing the backend...
Initializing provider plugins...
- Finding latest version of hashicorp/aws...
- Installing hashicorp/aws v5.66.0...
- Installed hashicorp/aws v5.66.0 (signed by HashiCorp)

Terraform has been successfully initialized!
```

### 2. terraform fmt & validate
```bash
$ terraform fmt
main.tf

$ terraform validate
Success! The configuration is valid.
```

### 3. terraform plan
```bash
$ terraform plan

Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # aws_s3_bucket.devops553 will be created
  + resource "aws_s3_bucket" "devops553" {
      + acceleration_status         = (known after apply)
      + acl                         = (known after apply)
      + arn                         = (known after apply)
      + bucket                      = "yatri1107"
      + force_destroy               = true
      + region                      = "ap-south-1"
      + tags                        = {
          + "Environment" = "dev"
          + "ManagedBy"   = "Terraform"
          + "Name"        = "yatri1107"
          + "Project"     = "Session18"
        }
    }

Plan: 1 to add, 0 to change, 0 to destroy.
```

### 4. terraform apply
```bash
$ terraform apply --auto-approve

aws_s3_bucket.devops553: Creating...
aws_s3_bucket.devops553: Creation complete after 3s [id=yatri1107]

Apply complete! Resources: 1 added, 0 changed, 0 destroyed.

Outputs:

bucket_arn = "arn:aws:s3:::yatri1107"
bucket_name = "yatri1107"
bucket_region = "ap-south-1"
```

### 5. terraform show & output
```bash
$ terraform show
# aws_s3_bucket.devops553:
resource "aws_s3_bucket" "devops553" {
    arn                         = "arn:aws:s3:::yatri1107"
    bucket                      = "yatri1107"
    bucket_domain_name          = "yatri1107.s3.amazonaws.com"
    bucket_regional_domain_name = "yatri1107.s3.ap-south-1.amazonaws.com"
    force_destroy               = true
    id                          = "yatri1107"
    region                      = "ap-south-1"
    tags                        = {
        "Environment" = "dev"
        "ManagedBy"   = "Terraform"
        "Name"        = "yatri1107"
        "Project"     = "Session18"
    }
}

$ terraform output
bucket_arn = "arn:aws:s3:::yatri1107"
bucket_name = "yatri1107"
bucket_region = "ap-south-1"
```

### 6. terraform destroy
```bash
$ terraform destroy --auto-approve

aws_s3_bucket.devops553: Destroying... [id=yatri1107]
aws_s3_bucket.devops553: Destruction complete after 2s

Destroy complete! Resources: 1 destroyed.
```

---

## Task 2: AWS Services Research

### 01. IAM - Governance
**What is IAM?** AWS Identity and Access Management (IAM) is a web service that helps you securely control access to AWS resources.
- **Users**: Represents an individual person or service that interacts with AWS.
- **Groups**: A collection of IAM users. Permissions attached to a group apply to all users in it.
- **Roles**: An identity with permission policies that determine what the identity can and cannot do. Roles can be assumed temporarily.
- **Policies**: JSON documents that define permissions.
- **Permissions**: Rules within a policy that define the allowed or denied actions on specific AWS resources.
- **Least Privilege**: The practice of granting only the permissions required to perform a task.
- **IAM Best Practices**: Never use root user credentials, enable MFA, use IAM Roles for EC2, and regularly audit permissions.
- **Common Use Cases**: Granting a developer access to an S3 bucket, allowing EC2 to read DynamoDB.

### 02. EC2 - Compute
**What is EC2?** Amazon Elastic Compute Cloud (EC2) provides secure, resizable compute capacity in the cloud.
- **AMI**: A template containing the software configuration (OS, app server) required to launch an instance.
- **Instance Types**: Configurations of CPU, memory, storage, and networking (e.g., t2.micro, m5.large).
- **Key Pairs**: Secure login information (Public/Private keys).
- **Security Groups**: Virtual firewalls controlling inbound/outbound traffic.
- **EBS**: Persistent block storage volumes for use with EC2.
- **Public vs Private IP**: Public IPs are reachable from the internet; Private IPs are reachable only within the VPC.
- **Instance Lifecycle**: Pending -> Running -> Stopping -> Stopped -> Terminated.
- **Common Use Cases**: Hosting web applications, batch processing, enterprise applications.

### 03. S3 - Storage
**What is S3?** Amazon Simple Storage Service (S3) is a scalable object storage service.
- **Buckets**: Containers for storing objects. Must have globally unique names.
- **Objects**: The fundamental entities stored in S3 (files and metadata).
- **Storage Classes**: Tiers for storing data based on access frequency (e.g., Standard, Glacier).
- **Versioning**: Keeps multiple variants of an object to protect against accidental deletion.
- **Lifecycle Policies**: Rules to automatically transition or delete objects.
- **Encryption**: Protects data at rest (Server-Side) and in transit (SSL).
- **Bucket Policies**: JSON-based IAM policies attached directly to the bucket.
- **Common Use Cases**: Backup, static website hosting, data lakes.

### 04. VPC - Networking
**What is VPC?** Amazon Virtual Private Cloud (VPC) provisions a logically isolated section of the AWS Cloud.
- **CIDR**: The IP address range assigned to the VPC (e.g., 10.0.0.0/16).
- **Subnets**: Subdivisions of a VPC CIDR block.
- **Route Tables**: Rules that determine where network traffic is directed.
- **Internet Gateway**: Allows communication between your VPC and the internet.
- **NAT Gateway**: Allows instances in a private subnet to connect to the internet outbound.
- **Security Groups**: Stateful firewalls at the instance level.
- **Network ACLs**: Stateless firewalls at the subnet level.
- **Public vs Private Subnet**: Public subnets have a route to an Internet Gateway; private subnets do not.

### 05. DynamoDB & RDS - Database Services
**DynamoDB** is a fully managed, serverless, NoSQL database service.
- **NoSQL**: Non-relational, schema-less data model.
- **Tables, Items, Attributes**: The core components of DynamoDB (similar to Tables, Rows, Columns in SQL).
- **Partition Key & Sort Key**: Used to distribute and sort data across partitions.
- **Use Cases**: Gaming leaderboards, shopping carts, high-traffic serverless apps.

**RDS** makes it easy to set up, operate, and scale a relational database in the cloud.
- **Relational Database**: Traditional structured database using SQL.
- **Supported Engines**: MySQL, PostgreSQL, MariaDB, Oracle, SQL Server, Aurora.
- **DB Instances**: Isolated database environments running in the cloud.
- **Security**: Controlled via VPCs, Security Groups, and IAM.
- **Backups**: Automated daily snapshots and manual snapshots.
- **Multi-AZ & Read Replicas**: Synchronous replication for high availability, and asynchronous replication for scaling reads.
- **Use Cases**: ERP/CRM, applications requiring complex transactional queries.
