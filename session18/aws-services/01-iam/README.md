# 01. IAM - Governance

## What is IAM?
AWS Identity and Access Management (IAM) is a web service that helps you securely control access to AWS resources. It allows you to manage who is authenticated (signed in) and authorized (has permissions) to use resources.

## Key Concepts
- **Users**: Represents an individual person or service that interacts with AWS.
- **Groups**: A collection of IAM users. Permissions attached to a group apply to all users in it.
- **Roles**: An identity with permission policies that determine what the identity can and cannot do. Roles can be assumed by anyone who needs it temporarily.
- **Policies**: JSON documents that define permissions. They are attached to users, groups, or roles.
- **Permissions**: Rules within a policy that define the allowed or denied actions on specific AWS resources.

## Least Privilege
The Principle of Least Privilege is the practice of granting only the permissions required to perform a task. It ensures that users have exactly what they need and nothing more, reducing the risk of unauthorized access.

## IAM Best Practices
1. Never use root user credentials for daily tasks.
2. Enable MFA (Multi-Factor Authentication) for all users.
3. Use IAM Roles for applications running on EC2 instead of long-term credentials.
4. Regularly rotate credentials and audit permissions.

## Common Use Cases
- Granting a developer access to only a specific S3 bucket.
- Allowing an EC2 instance to securely read from a DynamoDB table.
- Setting up cross-account access for third-party auditing tools.
