# Minimalist Launcher PWA

This is a Next.js Progressive Web App (PWA) that simulates a minimalist, distraction-free phone launcher experience. The app is designed to be mobile-first and installable on mobile devices for a native-like feel.

## Features

- **Home Screen**: A clean interface with a large clock, date, greeting, and favorite apps.
- **App Drawer**: A searchable, text-only list of all available applications.
- **Settings**: Customize the launcher's appearance and behavior.
- **Focus Mode**: An ultra-minimalist mode showing only the essentials.
- **PWA Ready**: Installable on your home screen with offline capabilities.
- **Persistent State**: Your settings and favorites are saved locally on your device.

## Tech Stack

- [Next.js](https://nextjs.org/) (with App Router)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [@ducanh2912/next-pwa](https://github.com/DuCanh2912/next-pwa) for PWA support

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm, yarn, or pnpm

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd minimalist-launcher
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

### Deploying to Firebase App Hosting

This project is ready to be deployed to Firebase App Hosting.

1.  **Install Firebase CLI**:
    If you haven't already, install the Firebase CLI globally:
    ```bash
    npm install -g firebase-tools
    ```

2.  **Login to Firebase**:
    ```bash
    firebase login
    ```

3.  **Deploy**:
    From the root of your project directory, run the following command:
    ```bash
    firebase deploy --only apphosting
    ```
    The Firebase CLI will build your Next.js application and deploy it to Firebase App Hosting. Your `apphosting.yaml` file is already configured for this.
