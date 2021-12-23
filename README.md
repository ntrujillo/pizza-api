# PIZZA API SERVERLESS

## Requirements
- NodeJS
- AWS account credentials
- User claudia on AWS IAM created and configured


## Create API
```
export AWS_PROFILE=claudia
npm run create
```

## Update API
```
export AWS_PROFILE=claudia
npm run update
```

## Create Table
aws dynamodb create-table --table-name pizza-orders \    
  --attribute-definitions AttributeName=orderId,AttributeType=S \    
  --key-schema AttributeName=orderId,KeyType=HASH \    
  --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \    
  --region us-east-1 \    
  --query TableDescription.TableArn --output text    

## Add Dynamodb Policies
aws iam put-role-policy --role-name pizza-api-executor \    
  --policy-name PizzaApiDynamoDB --policy-document file://./roles/dynamodb.json

## Scan Table
aws dynamodb scan --table-name pizza-orders --region us-east-1 --output json 

## Creating User Pool

aws cognito-idp create-user-pool --region us-east-1 --pool-name Pizzeria \
--policies "PasswordPolicy={MinimumLength=8,RequireUppercase=false, RequireLowercase=false, RequireNumbers=false,RequireSymbols=false}" \
--username-attributes email \
--query UserPool.Id --output text

## Creating a client for the user pool

aws cognito-idp create-user-pool-client \
--user-pool-id POOL_ID \
--client-name PizzeriaClient \
--no-generate-secret \
--query UserPoolClient.ClientId --output text

## Creating and Identity Pool

aws cognito-identity create-identity-pool --identity-pool-name Pizzeria \
--allow-unauthenticated-identities \
--supported-login-providers graph.facebook.com=FACEBOOK_APP_ID \
--cognito-identity-providers ProviderName=cognito-idp.us-east-1.amazonaws.com/POOL_ID,ClientId=CLIENT_ID,ServerSideTokenCheck=false \
--query IdentityPoolId --output text