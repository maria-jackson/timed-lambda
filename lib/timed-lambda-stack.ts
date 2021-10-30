import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3'
import * as timedLambda from './constructs/timed-lambda'

export interface TimedLambdaStackProps extends cdk.StackProps {
  readonly existingBucket: s3.Bucket
}

export class TimedLambdaStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: TimedLambdaStackProps) {
    super(scope, id, props);

    new timedLambda.TimedLambda(this, "daily", {
      existingBucket: props.existingBucket,
      cronExpression: "cron(15 10 * * ? *)",
      lambdaHandler: "daily.handler"
    })

    new timedLambda.TimedLambda(this, "hourly", {
      existingBucket: props.existingBucket,
      cronExpression: "cron(40 * * * ? *)",
      lambdaHandler: "hourly.handler"
    })
    
  }
}
