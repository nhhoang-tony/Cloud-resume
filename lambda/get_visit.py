# import the JSON utility package since we will be working with a JSON object
import json
import boto3
import os

# import time
from decimal import Decimal
from time import gmtime, strftime

# initiate connection to dynamodb database
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("Website_Visit_Count")
now = strftime("%a, %d %b %Y %H:%M:%S +0000", gmtime())

# convert decimal to float for data in database
def handle_decimal_type(obj):
    if isinstance(obj, Decimal):
        if float(obj).is_integer():
            return int(obj)
        else:
            return float(obj)
    raise TypeError

# scan through all database
def lambda_handler(event, context):
    response = table.scan()
    items = response['Items']

    # return a properly formatted JSON object
    return {
        'statusCode': 200,
        'body': json.dumps(items, default=handle_decimal_type)
    }
