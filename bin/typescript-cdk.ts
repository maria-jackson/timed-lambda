#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { TimedLambdaStack } from '../lib/timed-lambda-stack';
import { S3BucketStack } from '../lib/s3-bucket-stack';

const app = new cdk.App();

const bucketStack = new S3BucketStack(app, 's3-bucket')

new TimedLambdaStack(app, 'timed-lambda-stack', {existingBucket: bucketStack.s3Bucket});
