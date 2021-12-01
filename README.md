# PIZZA API SERVERLESS

## Requirements

- AWS account credentials
- User claudia on AWS IAM created and configured
- nodeJS
- claudia install globally (npm install -g claudia)


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
## CURL

```
curl -i -H "Content-Type:application/json" -X POST -d '{"pizzaId":1, "address":"221B Baker Street"}' \
https://btz3l6l6n2.execute-api.us-east-1.amazonaws.com/latest/orders/
```

