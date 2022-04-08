import { CfnResource } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export enum AuthType {

  /**
     * Lambda won't perform IAM authentication on requests to your function URL.
     * The URL endpoint will be public unless you implement your own authorization logic in your function.
     */
  NONE = 'NONE',

  /**
     * Only authenticated IAM users and roles can make requests to your function URL.
     */
  AWS_IAM = 'AWS_IAM',
}
export interface LambdaUrlfnProps {
  lambdaFn: lambda.Function;
  authType?: string;
  cors?: string;
}

export class LambdaUrlfn extends Construct {
  public lambdaUrl: CfnResource;
  public lambdaUrlPermission: CfnResource;
  constructor(scope: Construct, id: string, props: LambdaUrlfnProps) {
    super(scope, id);

    this.lambdaUrl = new CfnResource(this, 'lambdaUrl', {
      type: 'AWS::Lambda::Url',
      properties: {
        TargetFunctionArn: props.lambdaFn.functionArn,
        AuthType: props.authType ?? AuthType.NONE,
        Cors: undefined,
      },
    });
    this.lambdaUrlPermission = new CfnResource(this, 'lambdaUrlPermission', {
      type: 'AWS::Lambda::Permission',
      properties: {
        FunctionName: props.lambdaFn.functionName,
        Principal: '*',
        Action: 'lambda:InvokeFunctionUrl',
        FunctionUrlAuthType: 'NONE',
      },
    });
  }
}