import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib'
import { ClientsAppStack } from '../lib/clientsApp-stack';
import { ECommerceApiStack } from '../lib/ecommerceApi-stack';
import * as dotenv from 'dotenv'; 


dotenv.config();
const app = new cdk.App();

const env: cdk.Environment = {
    account: process.env.ACCOUNT_ID_AWS,
    region: process.env.REGION_AWS
}

const tags = {
    cost: "ECommerce",
    team: "caiosfg"
}

const clientsAppStack = new ClientsAppStack(
    app,
    "ClientsApp",
    {
        tags: tags,
        env: env
    }
)

const eCommerceApiStack = new ECommerceApiStack(app, "ECommerceApi", {
    clientsFetchHandler: clientsAppStack.clientsFetchHandler,
    tags: tags,
    env: env
})

eCommerceApiStack.addDependency(clientsAppStack)