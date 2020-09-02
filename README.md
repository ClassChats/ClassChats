# ClassChats

Proposed Stack:

-   Server: Fastify
-   Language: TypeScript
-   ORM: Sequelize
-   DBMS: MySQL
-   Front-End Framework: Vue?

# Development

## Prerequisites
- Docker >= 19.03.12
- Node/NPM >= 12.18.3/6.14.8

## Setup

**Before doing anything**, run `npm i`. This ensures you have a working TypeScript compiler, and creates
a git pre-commit hook that runs [Prettier](https://prettier.io/).

## Developing

You can easily run a development environment using `docker` and `docker-compose`.
With both installed, simply run `./rundocker.sh`. This does the following:
- Creates a persistent MySQL instance
- Creates a general container that constantly scans the **host** filesystem for TypeScript changes
  and compiles them into `/classchats/build` **in the container**
- Drops you into a bash shell (into `/classchats/build/`) where you can manually run whatever JS you
need to (i.e. by running `node some_file.js`)

You can exit the shell and the containers will continue running; just run `./rundocker.sh` again to re-enter.  
To stop the containers, run `docker-compose stop`.

## Formatting

All TypeScript code is automatically formatted upon commit by [Prettier](https://prettier.io).  
We recommend you also [install an editor extension](https://prettier.io/docs/en/editors.html) to run
Prettier each time you save so there are no formatting surprises.

# CI

We use GitHub Actions for CI work. The following workflows are in place:
- [`Labeler`](/.github/workflows/label.yaml): Labels issues and PRs based on changed files
- [`Style Check`](/.github/workflows/style.yaml): Checks that PRs meet style requirements. Runs:
  - Prettier on *.ts files
