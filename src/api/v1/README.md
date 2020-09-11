# API


## Overview

The API is made up of a series of endpoints. The endpoints represent resources, or collections of
resources. Each endpoint accepts HTTP methods for interacting with the resource(s) it represents.

For collections of resources (`/api/v1/{collectionName}`):
- `GET`: Get all resources in the collection and return them as an array
  - Optionally takes defined query parameters
    - Query parameters are `AND`ed to each other
    - Query parameters can be single terms, or a list of comma-separated terms
      - Comma-separated terms are `OR`ed to each other (e.g. `professorName=mcgonagall,snape&courseName=potions`
      will return Potions courses taught by either Professor McGonagall or Professor Snape)
- `POST`: Create a resource of the collection type and return it
  - Takes defined parameters from a JSON body

For single resources (e.g. `/api/v1/{collectionName}/{id}`):
- `GET`: Retrieve the resource given by the ID and return it
- `PUT`: Update the resource given by the ID and return it
  - Takes the same parameters as a collection's `PUT` request
- `DELETE`: Delete the resource given by the ID

## HTTP

All intent is communicated through HTTP methods and response codes.

Methods:
- `GET`: Retrieves content only, makes no modifications, is idempotent
- `POST`: Creates content
- `PUT`: Updates content
- `DELETE`: Deletes content

Response codes:
- `200`: Standard ok response
- `201`: The requested item was created (in response to a `POST` request)
- `400`: The request is missing a required parameter
- `404`: A resource requested by ID does not exist
- `500`: General server error

## Schema

The API communicates data via JSON.

Request bodies do not follow a standardized form, but rather depend on the endpoint. As a rule of
thumb, request bodies are simple JSON objects.

Response bodies are standardized, and come in two forms depending on the status of the response:

**Successful response:**
```ts
{
  ok: true,
  result?: any  // "result" is optional
}
```

**Unsuccessful response:**
```ts
{
  ok: false,
  reason?: string  // "reason" is optional, but is generally present
}
```

## Endpoints

- /universities
  - ?name
  - ?domain
  - /:universityID
    - /departments
      - ?abbreviation
      - /:departmentID
        - /courses
          - ?number
          - /:courseID
            - /classes

  - /chats
    - ?departmentAbbreviation&courseNumber
      - &section
    - ?professorName
      - &platform
    - ?courseID
      - &platform
    - ?sectionID
      - &platform
    - ?professorID
      - &platform
    - /:chatID
  
  - /professors
    - ?name
    - /:professorID