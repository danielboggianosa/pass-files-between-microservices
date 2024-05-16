# Pass Files between microservices

## upload
Microservice one will receive a file from an external request on the endpoint /upload.
The payload should be in body as form data and a key named "file"
Once received, this microservices will pass the file to another microservice

## Process
Microservice two will receive the file from microservice one or any other client using the post route "/upload".
The file will be renamed using UUID and store to the folder "uplaods".