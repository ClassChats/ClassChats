# ClassChats

Proposed Stack:

-   Server: Fastify
-   Language: TypeScript
-   ORM: Sequelize
-   DBMS: MySQL
-   Front-End Framework: React?

# Development

You can easily run a development environment using `docker` and `docker-compose`.
With both installed, simply run `./rundocker.sh`. This does the following:
- Creates a persistent MySQL instance
- Creates a general container that constantly scans the **host** filesystem for TypeScript changes
  and compiles them into `/classchats/build` **in the container only**
- Drops you into a bash shell (into `/classchats/build`) where you can manually run whatever JS you need to

You can exit the shell and the containers will continue running; just run `./rundocker.sh` again to reenter.
To stop the containers, run `docker-compose down`.

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
