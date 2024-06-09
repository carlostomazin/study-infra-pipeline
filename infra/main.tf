resource "aws_s3_bucket" "bucket" {
    bucket = var.bucket_name
}

resource "aws_s3_bucket" "bucket2" {
    bucket = "tes3214qgwdfg2"
}