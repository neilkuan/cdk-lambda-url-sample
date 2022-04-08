import * as path from 'path';
import { App, Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { LambdaUrlfn } from './lambda-url';
export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const fn = new lambda.Function(this, 'LmdabaUrlFn', {
      code: lambda.Code.fromAsset(path.join(__dirname, './funs')),
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: 'func.handler',
    });

    const urlFn = new LambdaUrlfn(this, 'MyLambdaFunctionUrl', {
      lambdaFn: fn,
    });

    new CfnOutput(this, 'LambdaUrl', {
      value: `${urlFn.lambdaUrl.getAtt('FunctionUrl')}`,
    } );
  }
}

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new MyStack(app, 'LambdaUrl-dev', { env: devEnv });
// new MyStack(app, 'LambdaUrl-prod', { env: prodEnv });

app.synth();