# Mono Launcher PWA

This is a Next.js Progressive Web App (PWA) that simulates a minimalist, distraction-free phone launcher experience. The app is designed to be mobile-first, installable, and focused on calm, intentional phone use.

Inspired by minimalist launchers, this app provides a text-based, monochrome interface to reduce visual clutter and help you focus.

## Features

-   **Minimalist Home Screen**: A clean interface with a large clock, date, and your favorite apps.
-   **Text-Only App Drawer**: A searchable, alphabetical list of all your applications.
-   **Comprehensive Settings**: Customize the launcher's appearance, choose favorites, hide apps, and more.
-   **Focus Mode**: An ultra-minimalist mode showing only the time and essential apps to eliminate distractions.
-   **Onboarding**: A simple first-time setup to personalize your experience.
-   **PWA Ready**: Fully installable on your home screen with offline capabilities for a native-like feel.
-   **Persistent State**: Your settings and favorites are saved locally on your device.

## Tech Stack

-   [Next.js](https://nextjs.org/) (with App Router)
-   [React](https://reactjs.org/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [Shadcn/ui](https://ui.shadcn.com/) for core components
-   [next-pwa](https://github.com/shadowwalker/next-pwa) for PWA support

## Getting Started

### Prerequisites

-   Node.js (v18 or later recommended)
-   npm, yarn, or pnpm

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd mono-launcher
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Development Server

To run the app locally, use the following command:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result. The app is best viewed in your browser's mobile device emulator.

### Building for Production

To create a production-ready build, run:

```bash
npm run build
```

This will generate an optimized version of the app in the `.next` directory and create the PWA service worker files in the `public` directory.

## Firebase Deployment

This project is configured for deployment to **Firebase App Hosting**, which is the recommended solution for Next.js applications on Firebase.

### Prerequisites

1.  You must have a Firebase project. If you don't have one, create one at the [Firebase Console](https://console.firebase.google.com/).
2.  Install the Firebase CLI globally:
    ```bash
    npm install -g firebase-tools
    ```

### Deployment Steps

1.  **Login to Firebase**:
    Log in to your Google account using the Firebase CLI.
    ```bash
    firebase login
    ```

2.  **Initialize Firebase in your project (if you haven't already)**:
    From the root of your project directory, run:
    ```bash
    firebase init apphosting
    ```
    Follow the prompts to connect your local project to your Firebase project. This will create `.firebaserc` and `firebase.json` files.

3.  **Deploy your app**:
    Run the deploy command:
    ```bash
    firebase deploy --only apphosting
    ```

    The Firebase CLI will automatically build your Next.js application and deploy it to a live URL on Firebase App Hosting. The `apphosting.yaml` file is already configured for a basic deployment.
