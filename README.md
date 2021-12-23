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

