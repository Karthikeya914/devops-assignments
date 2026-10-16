variable "aws_region" {
  description = "Target AWS region for deploying infrastructure"
  type        = string
  default     = "ap-south-1"
}

variable "cluster_name" {
  description = "Name of the EKS Kubernetes cluster"
  type        = string
  default     = "opspulse-eks"
}

variable "environment" {
  description = "Deployment environment tag (dev, staging, prod)"
  type        = string
  default     = "dev"
}
