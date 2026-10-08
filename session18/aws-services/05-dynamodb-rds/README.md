# 05. DynamoDB & RDS - Database Services

## Amazon DynamoDB
**DynamoDB** is a fully managed, serverless, NoSQL database service that provides fast and predictable performance with seamless scalability.

### Key Concepts
- **NoSQL**: Non-relational, schema-less data model.
- **Tables**: Collections of data items.
- **Items**: Individual records within a table (similar to rows in SQL).
- **Attributes**: Data elements within an item (similar to columns, but items can have different attributes).
- **Partition Key**: The primary key used to distribute items across partitions for scalability.
- **Sort Key**: An optional secondary key used to sort items with the same partition key.

### Use Cases
- Gaming leaderboards.
- Shopping carts for e-commerce.
- High-traffic serverless architectures.

---

## Amazon RDS
**Amazon Relational Database Service (RDS)** makes it easy to set up, operate, and scale a relational database in the cloud.

### Key Concepts
- **Relational Database**: Traditional structured database using SQL.
- **Supported Engines**: MySQL, PostgreSQL, MariaDB, Oracle, SQL Server, and Amazon Aurora.
- **DB Instances**: Isolated database environments running in the cloud.
- **Security**: Controlled via VPCs, Security Groups, and IAM integration.
- **Backups**: Automated daily snapshots and manual snapshots.
- **Multi-AZ**: Synchronous replication to a standby instance in a different Availability Zone for high availability.
- **Read Replicas**: Asynchronous replication to scale out read-heavy database workloads.

### Use Cases
- Traditional enterprise applications (e.g., ERP, CRM).
- Applications requiring complex transactional queries and joins.
