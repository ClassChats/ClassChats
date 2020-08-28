# ClassChats

Proposed Stack:

-   Server: Fastify
-   Language: TypeScript
-   ORM: Sequelize
-   DBMS: MySQL
-   Front-End Framework: React?

# Formatting

All code is automatically formatted upon commit thanks to
[Prettier](https://prettier.io). You can also install an extension to run
Prettier each time you save. Make sure to `npm i` before beginning to code so
that the Git pre-commit hook is properly added.

# CI

We use GitHub actions for CI work. The following workflows are in place:
- [`Labeler`](/.github/workflows/label.yaml): Labels issues and PRs based on changed files
- [`Style Check`](/.github/workflows/style.yaml): Checks that PRs meet style requirements. Runs:
  - Prettier on *.ts files

# Trello

https://trello.com/b/jWRgYyX2/classchats
