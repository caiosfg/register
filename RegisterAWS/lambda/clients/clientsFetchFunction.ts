import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";

export async function handler( event: APIGatewayProxyEvent, context: Context ): Promise<APIGatewayProxyResult> {

    const lambdaRequestId = context.awsRequestId
    const apiRequestId = event.requestContext.requestId
    const method = event.httpMethod
    
    console.log(`🚀 ~ handler ~ API GATEWAY: ${apiRequestId} - LAMBDA REQUESTID: ${lambdaRequestId}`)
    if (event.resource === "/clients") {

        if(method === "GET") {
            console.log("🚀 ~ handler ~ method:", method)

            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: "GET CLIENTS - OK"
                })
            }

        }
    }


    return {
        statusCode: 400,
        body: JSON.stringify({
            message: "Bad request"
        })
    }
}