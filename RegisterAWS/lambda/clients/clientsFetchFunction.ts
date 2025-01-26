import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";

export async function handler( event: APIGatewayProxyEvent, context: Context ): Promise<APIGatewayProxyResult> {
    
    const method = event.httpMethod

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