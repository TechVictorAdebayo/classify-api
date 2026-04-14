# Classify API

A REST API that classifies names by gender using the Genderize API.

## Live URL
classify-api-production-c385.up.railway.app

## Run Locally
npm install
node index.js

## Endpoint
GET /api/classify?name={name}

## Example Request
GET (http://localhost:3000/api/classify?name=Semiu)

## Example Response
{
  "status": "success",
  "data": {
    "name": "Semiu",
    "gender": "male",
    "probability": 0.95,
    "sample_size": 886,
    "is_confident": true,
    "processed_at": "2026-04-14T14:37:10.043Z"
  }
}