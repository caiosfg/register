import * as cdk from "aws-cdk-lib"
import * as lambdaNodeJS from "aws-cdk-lib/aws-lambda-nodejs"
import * as apigateway from "aws-cdk-lib/aws-apigateway"
import * as cwlogs from "aws-cdk-lib/aws-logs"
import { Construct } from "constructs"

interface ECommerceApiStackProps extends cdk.StackProps {
    clientsFetchHandler: lambdaNodeJS.NodejsFunction

}

export class ECommerceApiStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: ECommerceApiStackProps) {
        super(scope, id, props)

        // Logs no CloudWatch
        const logGroup = new cwlogs.LogGroup(this, "ECommerceApiLogs")

        const api = new apigateway.RestApi(this, "ECommerceApi", {
            restApiName: "ECommerceApi",
            deployOptions: {
                accessLogDestination: new apigateway.LogGroupLogDestination(logGroup),
                accessLogFormat: apigateway.AccessLogFormat.jsonWithStandardFields({
                    httpMethod: true,
                    ip: true,
                    protocol: true,
                    requestTime: true,
                    resourcePath: true,
                    responseLength: true,
                    status: true,
                    caller: true,
                    user: true
                })

            }
        })

        const clientsFetchIntegration = new apigateway.LambdaIntegration(props.clientsFetchHandler)

        const clientsResource = api.root.addResource("clients")
        clientsResource.addMethod("GET", clientsFetchIntegration)
    }
}
