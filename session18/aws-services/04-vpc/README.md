# 04. VPC - Networking

## What is VPC?
Amazon Virtual Private Cloud (VPC) lets you provision a logically isolated section of the AWS Cloud where you can launch AWS resources in a virtual network that you define.

## Key Concepts
- **CIDR (Classless Inter-Domain Routing)**: The IP address range assigned to the VPC (e.g., 10.0.0.0/16).
- **Subnets**: Subdivisions of a VPC CIDR block. Each subnet resides entirely within one Availability Zone.
- **Route Tables**: A set of rules (routes) that determine where network traffic from your subnet or gateway is directed.
- **Internet Gateway**: A horizontally scaled, redundant, and highly available VPC component that allows communication between your VPC and the internet.
- **NAT Gateway**: Allows instances in a private subnet to connect to the internet while preventing the internet from initiating connections to those instances.
- **Security Groups**: Stateful firewalls at the instance level.
- **Network ACLs**: Stateless firewalls at the subnet level.

## Public vs Private Subnet
- **Public Subnet**: A subnet whose route table has a route to an Internet Gateway.
- **Private Subnet**: A subnet without direct internet access (often uses a NAT Gateway for outbound traffic).
