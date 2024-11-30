# My Express App with Docker

This is a quick-start project for a Node.js application using the Express framework and Docker containers. This project is designed to provide a basic structure that you can use to start developing web applications using Node.js and Express, with a development environment running inside Docker containers.

## Requirements

- [Docker](https://www.docker.com/get-started) should be installed on your machine.
- [Node.js](https://nodejs.org/) installed (for local development without Docker) but you can also set the Docker files and not install the dependencies.
- [Express](https://expressjs.com/) minimal framework for Node.js.

## Project Structure

- **app/**: Contains the application code.
  - **routes/**, **javascripts/**, **views/** : Contains the source files for the application.
  - **package.json**: Manages the project's dependencies and scripts.

  These 3 files are not being shared currently:
- **Dockerfile**: The file for building the Docker image for the project.
- **docker-compose.yml**: The file for configuring the Docker services.
- **.dockerignore**: Files that should not be copied into the container.

- **.gitignore**: Files that should not be versioned in Git.

## Installation and Usage

### 1. Clone the Repository

First, clone this repository to your local machine:

```bash
git clone <REPOSITORY_URL>
cd <project_name>