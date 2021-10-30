import os

import boto3

def handler(event, context):
    s3 = boto3.resource("s3")
    content = "Today is going to be a great day!"
    s3.Object(os.environ.get("BUCKET_NAME"), "daily.txt").put(Body=content)
