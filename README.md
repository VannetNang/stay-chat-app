# Real-Time Chat Application

This project is about connecting and communicating in real-time with this feature-rich chat application. Users can instantly message friends, share images, and easily find new connections with a built-in friend search. The app includes secure user account management (sign-in/login), allows for profile customization, and features a fully responsive layout.

## Table of Contents

- [Features](#features)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Firebase Setup](#firebase-setup)
  - [Installation](#installation)
- [Contributing](#contributing)

## Features

-   **Real-Time Messaging:** Instantaneous message delivery between users.
-   **User Authentication:** Secure sign-up, login, and session management via Firebase.
-   **Friend Search:** Ability for users to search for and connect with other users.
-   **Image Sharing:** Users can send and receive images within chats.
-   **Profile Editing:** Users can customize their profiles (e.g., display name, avatar).
-   **Responsive Design:** Seamless user experience across desktops, tablets, and mobile devices.
-   **Notifications:** User-friendly notifications using `react-toastify`.

## Folder Structure

The project follows a standard Vite + React structure:
```plaintext
├── src/
│   ├── assets/           # Static assets (images, icons, etc.)
│   ├── components/       # Reusable UI components
│   │   ├── component/    # General or shared sub-components
│   │   ├── context/      # React Context API for state management
│   │   ├── navbar/       # Navigation bar component(s)
│   │   └── overlap/      # UI elements that overlap content (e.g., modals, popups)
│   ├── config/           # Configuration files
│   │   └── firebase.js   # Firebase configuration and initialization
│   ├── pages/            # Page-level components
│   │   ├── _auth/        # Authentication-related pages (Login, Register)
│   │   └── _root/        # Root layout or structure for authenticated pages
│   ├── App.jsx           # Main application component (handles routing)
│   ├── index.css         # Global styles and Tailwind CSS directives
│   └── main.jsx          # Application entry point for React
├── .gitignore            # Specifies intentionally untracked files for Git
├── eslint.config.js      # ESLint configuration for code linting
├── index.html            # Main HTML template for the SPA
├── package-lock.json     # Exact versions of dependencies
├── package.json          # Project metadata and dependencies
├── README.md             # This file
├── tailwind.config.js    # Tailwind CSS configuration
└── vite.config.js        # Vite configuration file
```

## Technologies Used

-   **Front-End:**
    -   React (v18+)
    -   Vite (Build tool & Dev Server)
    -   React Router DOM (v6+) for routing
    -   Tailwind CSS (Utility-first CSS framework)
    -   `react-toastify` (For notifications)
-   **Back-End / Services:**
    -   Firebase:
        -   Firebase Authentication (For user sign-in/login)
        -   Firestore Database (For storing messages, user data)
    
    -   Cloudinary:
        -   Cloudinary Storage (For image uploads to the website and save it in Firebase (with url))
-   **Linting:**
    -   ESLint

## Getting Started

Follow these instructions to get a local copy up and running for development and testing.

### Prerequisites

-   Node.js (LTS version recommended, e.g., >=18.x)
-   npm, yarn, or pnpm

### Firebase Setup

This project requires Firebase for its backend services (authentication, database, storage).

1.  **Create a Firebase Project:** Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project (or use an existing one).
2.  **Register your app:**
    * In your Firebase project, add a new Web app.
    * You'll be given Firebase configuration credentials (apiKey, authDomain, projectId, etc.).
3.  **Configure Environment Variables:**
    * It's highly recommended to store your Firebase credentials in environment variables. Create a `.env` file in the root of the `Front-end` (or project root if this README is there) directory.
    * Copy the contents of `.env.example` (if you create one) to `.env`.
        ```env
        # .env.example
        VITE_FIREBASE_API_KEY=your_api_key
        VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
        VITE_FIREBASE_PROJECT_ID=your_project_id
        VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
        VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
        VITE_FIREBASE_APP_ID=your_app_id

        VITE_CLOUDINARY_UPLOAD_PRESET=your_cloudinary_storage
        VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
        VITE_CLOUDINARY_URL_API_BASE=your_cloudinary_api
        ```
    * Replace `your_...` values with your actual Firebase project credentials.
    * Ensure your `src/config/firebase.js` file is set up to read these environment variables (e.g., `import.meta.env.VITE_FIREBASE_API_KEY`).
4.  **Set up Firebase Services:**
    * **Authentication:** Enable the sign-in methods you want to support (e.g., Email/Password, Google) in the Firebase console under Authentication > Sign-in method.
    * **Firestore:** Create a Firestore database in the Firebase console. Set up your security rules appropriately for development and production.
    * **Storage:** Since Firebase storage does not offer free version anymore, use Cloudinary storage instead. It offers 25GB free of images, videos, etc.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-folder-name>
    ```
2.  **Install dependencies:**
    ```bash
    # Using npm
    npm install

    # Or if you use yarn
    # yarn install

    # Or if you use pnpm
    # pnpm install
    ```
3.  **Install frameworks / libraries:**
    ```bash
    # Using npm
    npm install firebase cloudinary toastify react-router-dom tailwindcss @tailwindcss/vite

    # Or if you use yarn
    # yarn install firebase cloudinary toastify react-router-dom tailwindcss @tailwindcss/vite

    # Or if you use pnpm
    # pnpm install firebase cloudinary toastify react-router-dom tailwindcss @tailwindcss/vite
    ```

* In case, tailwindcss installation does not work: Go to this [TailwindCSS Installation](https://tailwindcss.com/docs/installation/using-vite)


## Contributing

We welcome contributions that add features or address anything currently lacking in the project! If you'd like to contribute, please follow these steps:

1.  **Fork the Project:**
    Click the 'Fork' button at the top right of the repository page to create your own copy.

2.  **Create your Feature Branch:**
    Navigate to your forked repository and create a new branch for your changes. It's good practice to name your branch descriptively (e.g., `git checkout -b feature/AmazingFeature` or `git checkout -b fix/BugFix`).

3.  **Commit your Changes:**
    Make your desired changes to the codebase. Commit your changes with clear and concise commit messages:
    ```bash
    git commit -m 'Add: Implement AmazingFeature'
    ```

4.  **Push to Your Branch:**
    Push your changes to your forked repository's branch:
    ```bash
    git push origin feature/AmazingFeature
    ```

5.  **Open a Pull Request:**
    Go to the original project repository and you should see a prompt to create a Pull Request from your new branch. Click it, provide a clear title and description for your changes, and submit the Pull Request.

Your Pull Request will then be reviewed, and a decision will be made on whether to accept and merge the changes. We appreciate your efforts to improve the project!
