# Session 18: Terraform & AWS Services

This document contains the deliverables for Session 18, including the Terraform S3 Demo execution logs and the AWS Services research.

---

## Task 1: Terraform S3 Demo

Below are the execution logs demonstrating the complete lifecycle of creating an AWS S3 bucket using Terraform.

<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/f4aaeff7-6a76-427b-bd46-fd7bc7ab3a35" />
<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/b0a5b6c5-860c-4fbf-81c8-fcd401c20097" />
<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/e40f86ce-3b52-45e2-8dc3-2cce6be689f5" />
<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/f649e436-5960-4f64-9a4d-e5b3494bfece" />

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
