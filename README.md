# ChefConnect

ChefConnect is a full-stack recipe-sharing platform built with Next.js (App Router), Tailwind CSS, and MongoDB. It enables users to discover, create, and share recipes, leave reviews, and manage their own culinary profile. The application features a robust authentication and authorization system powered by NextAuth.js.



## Table of Contents

- [ChefConnect](#chefconnect)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Environment Variables](#environment-variables)
  - [Project Structure](#project-structure)
  - [API Endpoints](#api-endpoints)
  - [Security Notes](#security-notes)
  - [Contributing](#contributing)
  - [License](#license)

## Features

- **Recipe Management (CRUD):**
  - **Create:** Authenticated users can add new recipes through a dedicated form with client-side validation (using Formik and Yup).
  - **Read:** View a list of all recipes or drill down to a detailed page for a single recipe, including ingredients, instructions, author details, and cooking time.
  - **Update:** Recipe authors can edit their own submissions.
  - **Delete:** Recipe authors can delete their recipes, which also cleans up all associated reviews from the database.

- **User Profiles:**
  - View user profiles, which display basic information (name, email) and a gallery of all recipes created by that user.
  - Authenticated users can edit their own profile information.

- **Interactive Reviews System:**
  - Logged-in users can post ratings (1-5) and comments on any recipe.
  - Users have the ability to delete their own reviews.

- **Authentication & Authorization:**
  - **Dual Authentication Providers:** Users can sign up and log in using traditional credentials (email/password) or via their GitHub account.
  - **Protected Routes:** Both client-side pages and API routes are protected, redirecting unauthenticated users to the sign-in page.
  - **Ownership-Based Authorization:** Middleware ensures that users can only edit or delete content (recipes, reviews, profiles) that they own.
  - **Role System:** A basic role system is in place, with a hardcoded "admin" role assigned to a specific GitHub user email.

- **Admin Dashboard:**
  - A simple dashboard at `/admin` allows fetching and viewing a list of all registered users.

- **Modern Frontend:**
  - Built with Next.js 13+ App Router for optimal performance and developer experience.
  - Fully responsive and styled with the utility-first framework Tailwind CSS.
  - Includes loading states and custom 404/Not Authorized pages for a polished user experience.

## Technologies Used

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) ODM
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Form Management:** [Formik](https://formik.org/) for form state and [Yup](https://github.com/jquense/yup) for schema validation
- **API Communication:** [Axios](https://axios-http.com/)

## Getting Started

### Prerequisites

- Node.js (v18.x or later)
- npm or yarn
- A running MongoDB instance (local or a cloud service like MongoDB Atlas)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/chefconnect.git
    cd chefconnect
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    -   Create a `.env.local` file in the root of the project by copying the example:
        ```bash
        cp .env.local.example .env.local
        ```
    -   Fill in the required values in the `.env.local` file. See the section below for details.

4.  **Start the development server:**
    ```bash
    npm run dev
    ```

5.  Open your browser and navigate to `http://localhost:3000` to see the application in action.

### Environment Variables

You need to create a `.env.local` file in the project root and add the following variables.

```env
# MongoDB Connection String
MONGODB_URI=your_mongodb_connection_string

# NextAuth.js Configuration
# Generate a secret with: openssl rand -base64 32
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# NextAuth.js GitHub Provider Credentials
# Create an OAuth App on GitHub to get these values
GITHUB_ID=your_github_oauth_client_id
GITHUB_SECRET=your_github_oauth_client_secret
```

## Project Structure

The project follows the standard Next.js App Router structure.

```
chefconnect/
├── app/                      # Main application directory (App Router)
│   ├── (api)/                # API routes
│   │   ├── auth/[...nextauth]/ # NextAuth.js authentication routes
│   │   ├── recipes/          # Recipe API endpoints (CRUD)
│   │   └── users/            # User API endpoints (CRUD)
│   ├── (pages)/              # Page routes (UI)
│   │   ├── profile/[id]/     # User profile pages
│   │   ├── recipes/          # Recipe listing and detail pages
│   │   └── ...               # Other pages like about, sign-up, etc.
│   ├── layout.js             # Root layout
│   └── page.jsx              # Home page
├── components/               # Reusable React components
│   ├── AuthProvider.jsx      # Session provider for NextAuth.js
│   ├── Nav.jsx               # Navigation bar
│   ├── RecipeCard.jsx        # Card component for recipe previews
│   └── Reviews.jsx           # Component to display and add reviews
├── middleware.js             # Next.js middleware for API authorization
├── models/                   # Mongoose schemas for MongoDB
│   ├── recepie.js
│   ├── review.js
│   └── user.js
├── styles/                   # Global CSS and styling
└── utils/                    # Utility functions (e.g., database connection)
```

## API Endpoints

The core business logic is exposed through a RESTful API. All routes under `/api` are protected by the `middleware.js` file, requiring authentication.

| Method | Endpoint                                 | Description                                        | Protected |
| :----- | :--------------------------------------- | :------------------------------------------------- | :-------- |
| `GET`  | `/api/recipes`                           | Get all recipes.                                   | Yes       |
| `POST` | `/api/recipes`                           | Create a new recipe.                               | Yes       |
| `GET`  | `/api/recipes/:id`                       | Get a single recipe by its ID.                     | Yes       |
| `PUT`  | `/api/recipes/:id`                       | Update a recipe (author only).                     | Yes       |
| `DELETE`| `/api/recipes/:id`                      | Delete a recipe (author only).                     | Yes       |
| `POST` | `/api/recipes/:id/reviews`               | Add a review to a recipe.                          | Yes       |
| `DELETE`| `/api/recipes/:id/reviews/:reviewId`    | Delete a review (author only).                     | Yes       |
| `GET`  | `/api/users`                             | Get all users (used by admin dashboard).           | Yes       |
| `POST` | `/api/users/add`                         | Create a new user (Sign-up).                       | No        |
| `GET`  | `/api/users/:id`                         | Get a single user's profile data.                  | Yes       |
| `PUT`  | `/api/users/:id`                         | Update a user's profile (owner only).              | Yes       |
| `GET/POST` | `/api/auth/*`                        | Handled by NextAuth.js for sign-in/sign-out.       | N/A       |

## Security Notes

-   **Password Storage:** In the current implementation (`app/api/auth/[...nextauth]/options.js`), user passwords for the `CredentialsProvider` are stored and checked in **plain text**. For a production environment, this is a critical security vulnerability and should be immediately replaced with a robust hashing and salting mechanism (e.g., using `bcrypt.js`).

## Contributing

We welcome contributions from the community. If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.