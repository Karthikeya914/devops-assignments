# Terraform S3 Demo

This project creates an AWS S3 bucket using Terraform. Below are the execution logs demonstrating the complete lifecycle (init, format, validate, plan, apply, show, output, and destroy).

## 1. terraform init
```bash
$ terraform init

Initializing the backend...

Initializing provider plugins...
- Finding latest version of hashicorp/aws...
- Installing hashicorp/aws v5.66.0...
- Installed hashicorp/aws v5.66.0 (signed by HashiCorp)

Terraform has been successfully initialized!
```

## 2. terraform fmt & validate
```bash
$ terraform fmt
main.tf

$ terraform validate
Success! The configuration is valid.
```

## 3. terraform plan
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

## 4. terraform apply
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

## 5. terraform show & output
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
    tags_all                    = {
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

## 6. terraform destroy
```bash
$ terraform destroy --auto-approve

aws_s3_bucket.devops553: Destroying... [id=yatri1107]
aws_s3_bucket.devops553: Destruction complete after 2s

Destroy complete! Resources: 1 destroyed.
```
