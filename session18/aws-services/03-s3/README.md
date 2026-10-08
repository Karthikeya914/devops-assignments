# 03. S3 - Storage

## What is S3?
Amazon Simple Storage Service (S3) is an object storage service offering industry-leading scalability, data availability, security, and performance.

## Key Concepts
- **Buckets**: Containers for storing objects in Amazon S3. Bucket names must be globally unique.
- **Objects**: The fundamental entities stored in Amazon S3 (files and metadata).
- **Storage Classes**: Different tiers for storing data based on access frequency (e.g., S3 Standard, S3 Infrequent Access, S3 Glacier for archiving).
- **Versioning**: Keeps multiple variants of an object in the same bucket to protect against accidental deletion.
- **Lifecycle Policies**: Rules to automatically transition objects to cheaper storage classes or delete them after a certain period.
- **Encryption**: Protects data at rest (Server-Side Encryption) and in transit (SSL/TLS).
- **Bucket Policies**: JSON-based IAM policies attached directly to the bucket to define access rules.

## Common Use Cases
- Backup and disaster recovery.
- Storing static assets for websites (HTML, CSS, images).
- Data lakes for big data analytics.
