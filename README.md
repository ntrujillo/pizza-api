# PIZZA API SERVERLESS

## Requirements

- AWS account credentials
- User claudia on AWS IAM created and configured
- nodeJS
- claudia install globally (npm install -g claudia)


## Create API
```
export AWS_PROFILE=claudia
claudia create --region us-east-1 --api-module api
```

## Update API
```
export AWS_PROFILE=claudia
claudia update
```

## CURL

```
curl -i -H "Content-Type:application/json" -X POST -d '{"pizzaId":1, "address":"221B Baker Street"}' \
https://btz3l6l6n2.execute-api.us-east-1.amazonaws.com/latest/orders/
```