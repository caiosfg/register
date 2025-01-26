import * as lambda from "aws-cdk-lib/aws-lambda"
import * as lambdaNodeJS from "aws-cdk-lib/aws-lambda-nodejs"
import * as cdk from "aws-cdk-lib"
import { Construct } from "constructs"

export class ClientsAppStack extends cdk.Stack {
    readonly clientsFetchHandler: lambdaNodeJS.NodejsFunction

    constructor(scope: Construct, id: string, props?: cdk.StackProps ) {
        super(scope, id, props)

        this.clientsFetchHandler = new lambdaNodeJS.NodejsFunction(
            this,
            "ClientsFetchFunction",
            {
                runtime: lambda.Runtime.NODEJS_22_X,
                memorySize: 512,
                functionName: "ClientsFetchFunction",
                entry: "lambda/clients/clientsFetchFunction.ts",
                handler: "handler",
                timeout: cdk.Duration.seconds(5),
                bundling: {
                    minify: true,
                    sourceMap: false
                }
            }
        )
    }
}
