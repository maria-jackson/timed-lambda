import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as events from '@aws-cdk/aws-events'
import * as s3 from '@aws-cdk/aws-s3'
import * as targets from '@aws-cdk/aws-events-targets'

export interface TimedLambdaProps {
  readonly existingBucket: s3.Bucket;
  readonly cronExpression: string;
  readonly lambdaHandler: string;
}

export class TimedLambda extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string, props: TimedLambdaProps) {
    super(scope, id);

    const lambdaFunction = new lambda.Function(this, "lambda", {
      code: lambda.Code.fromAsset("lambda-src"),
      handler: props.lambdaHandler,
      runtime: lambda.Runtime.PYTHON_3_9,
      environment: {"BUCKET_NAME": props.existingBucket.bucketName}
    })

    const eventRule = new events.Rule(this, "event", {
      schedule: events.Schedule.expression(props.cronExpression)
    })

    eventRule.addTarget(new targets.LambdaFunction(lambdaFunction))

    props.existingBucket.grantWrite(lambdaFunction)

  }
}
