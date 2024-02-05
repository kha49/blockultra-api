# development
    $ npm run dev

# Migration
    $ npm run generate
    $ npm run migrate 
# Seeding
    $ npm run fetch-router
    $ npm run seed

# Clean architecture

Concretely, there are 4 main packages: Application, Core, UseCase, Infrastructure and Util.
I. Application

Each part of the "Application" adheres to the Dependency Rule of Clean Architecture by communicating with internal components (like Use Cases) and avoids dependency on external components.
This keeps the outer layer independent and easy to maintain.

II. UseCase:

The UseCase layer encapsulates the main part of a specific use case.
It is responsible for orchestrating the flow necessary to achieve a particular business requirement or scenario.

III. Core

The "Core" module serves as the heart of the application, housing the critical components responsible for business logic, rules, data structures, and the definition of how data is organized.

IV: Infrastructure

Can represent the Frameworks and Drivers sections, which contain Services related to interacting with databases, file systems, or external services.

V: Util

Util is a place to store helper methods, utility functions, or other support modules.

```
# Project Structure
└───src
    ├───app
    │   ├───controllers
    │   │   ├───auth
    │   │   ├───group
    │   │   ├───perm
    │   │   └───user
    │   │       └───presenters
    │   └───routers
    ├───core
    │   ├───business
    │   │   ├───logic
    │   │   └───rule
    │   ├───interfaces
    │   └───schemas
    ├───infras
    │   ├───config
    │   ├───migrations
    │   ├───seed
    │   └───services
    ├───usecases
    │   ├───auth
    │   ├───file
    │   ├───group
    │   │   └───crud
    │   ├───permission
    │   └───user
    │       ├───change-password
    │       └───crud
    └───utils

```
