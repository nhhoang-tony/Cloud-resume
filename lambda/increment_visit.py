# import the JSON utility package since we will be working with a JSON object
import json
import boto3

from time import gmtime, strftime

# initiate connection to database
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("Website_Visit_Count")
now = strftime("%a, %d %b %Y %H:%M:%S +0000", gmtime())

# load menu to database
def lambda_handler(event, context):
    response = table.update_item(
        Key={
            'domain': event['domain'],
        },
        UpdateExpression="set #count = :c",
        ExpressionAttributeNames={
            '#count': 'count',
        },
        ExpressionAttributeValues={
            ':c': int(event['count']),
        },
        ReturnValues="UPDATED_NEW"
    )

    # return a properly formatted JSON object
    return {
        'statusCode': 200,
        'body': json.dumps('Success')
    }
