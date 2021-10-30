import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';

export class S3BucketStack extends cdk.Stack {
  public readonly s3Bucket: s3.Bucket

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.s3Bucket = new s3.Bucket(this, "bucket");
  }
}