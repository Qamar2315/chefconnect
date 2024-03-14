# ChefConnect

ChefConnect is a recipe-sharing platform built entirely with Next.js and Tailwind CSS. It enables users to discover, save, and share recipes effortlessly while providing authentication and authorization features for a full-stack app.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- Discover new recipes from a diverse range of cuisines.
- Save favorite recipes to your profile for easy access.
- Share your own recipes with the community.
- Leave reviews and ratings on recipes.
- User authentication and authorization system.
- Responsive design for seamless user experience on all devices.

## Technologies Used

- Next.js: A React framework for server-side rendering and building modern web applications.
- Tailwind CSS: A utility-first CSS framework for designing responsive and customizable UI components.
- MongoDB: A NoSQL database for storing user data, recipes, and reviews.
- Authentication: Implement user authentication using JWT (JSON Web Tokens) for secure access to user-specific features.
- Authorization: Define roles and permissions to control access to certain functionalities (e.g., admin privileges for managing recipes).

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB instance or MongoDB Atlas account for database storage.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/chefconnect.git
```

2. Install dependencies:
```bash
cd chefconnect
npm install
```

3. Set up environment variables:
-Create a .env.local file in the root directory.
-Add your MongoDB connection string and other necessary environment variables:

MONGODB_URI=your_mongodb_connection_string
SECRET_KEY=your_secret_key_for_jwt

4. Start the development server:
```bash
npm run dev
```
5. Open your browser and navigate to http://localhost:3000 to access the ChefConnect application.

# Project Stucture

- components/: Reusable React components used throughout the application.
- public/: Static assets like images, fonts, and other resources.
- styles/: Stylesheets and Tailwind CSS configuration files.
- utils/: Utility functions and helper modules.
- models/: Mongoose models for MongoDB data schemas.
- middleware/: Custom middleware functions for authentication and authorization.
Feel free to explore and modify the project structure according to your requirements.

# Contributing
We welcome contributions from the community. If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

# License
This project is licensed under the MIT License - see the LICENSE file for details.