# API

## Endpoints

- /universities
  - ?name
  - ?domain
  - /:universityID
    - /departments
      - /:abbreviation or /:departmentID
        - /courses
          - /:number or /:courseID
            - /classes

  - /chats
    - /:chatID
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
  
  - /professors
    - /:professorID
    - ?name