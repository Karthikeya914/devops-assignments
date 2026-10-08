# 02. EC2 - Compute

## What is EC2?
Amazon Elastic Compute Cloud (EC2) is a web service that provides secure, resizable compute capacity in the cloud. It is designed to make web-scale cloud computing easier for developers.

## Key Concepts
- **AMI (Amazon Machine Image)**: A template that contains a software configuration (e.g., OS, application server) required to launch an instance.
- **Instance Types**: Various configurations of CPU, memory, storage, and networking capacity (e.g., t2.micro, m5.large) optimized for different use cases.
- **Key Pairs**: Secure login information for your instances. AWS stores the public key, and you store the private key.
- **Security Groups**: Virtual firewalls that control inbound and outbound traffic for one or more EC2 instances.
- **EBS (Elastic Block Store)**: Persistent block storage volumes for use with EC2 instances.

## Public vs Private IP
- **Public IP**: Reachable from the internet. Changes when an instance is stopped/started unless an Elastic IP is used.
- **Private IP**: Reachable only within the VPC network. Remains constant during the instance lifecycle.

## Instance Lifecycle
1. **Pending**: Instance is preparing to launch.
2. **Running**: Instance is fully booted and operational.
3. **Stopping**: Instance is shutting down (you stop paying for compute).
4. **Stopped**: Instance is halted but can be restarted.
5. **Terminated**: Instance is permanently deleted.

## Common Use Cases
- Hosting web applications and APIs.
- Running batch processing jobs.
- Deploying enterprise applications like SAP or Oracle.
