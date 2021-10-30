import os

import boto3

def handler(event, context):
    s3 = boto3.resource("s3")
    content = "You are the best!"
    s3.Object(os.environ.get("BUCKET_NAME"), "hourly.txt").put(Body=content)
