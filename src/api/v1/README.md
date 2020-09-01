# API

This is a mostly RESTful API with the following layers:
- **Routes:**
  - Handle HTTP requests
  - Define endpoints
  - Call functions based on the endpoint
  - The HTTP context ends here
- **Accessors:**
  - Take a bunch of parameters, make some Sequelize calls, and return data
- **ORM (Sequelize):**
  - Deals with the database