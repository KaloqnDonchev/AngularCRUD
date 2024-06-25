# Angular CRUD App

This project is a simple Angular CRUD (Create, Read, Update, Delete) application that manages user data. It demonstrates how to perform basic operations like adding, viewing, editing, and deleting users, as well as implementing pagination and handling file uploads.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Services](#services)

## Features

- Add a new user with details like first name, last name, profession, gender, date of birth, and profile image.
- View a list of users with pagination.
- Edit user details.
- Delete a user.
- Display alerts for validation errors and other notifications.
- Responsive and mobile-friendly UI using Bootstrap.

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/your-username/angular-crud-app.git
    cd angular-crud-app
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

## Usage

1. Start the development server:

    ```sh
    npm run start
    ```
2. Start the json-server (backend)
   ```sh
    npm run start-server
    ```

4. Open your browser and navigate to `http://localhost:4200/`.


## Components

- `AddUserComponent`: Form to add a new user.
- `EditUserComponent`: Form to edit an existing user.
- `HomeComponent`: Displays the list of users with pagination and actions to edit or delete.

## Services

- `UserService`: Manages user data and provides methods to add, get, update, and delete users.

