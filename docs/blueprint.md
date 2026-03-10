# **App Name**: Minimalist Launcher

## Core Features:

- Home Screen Display: Show a large digital clock, current date, greeting text, a search bar for apps/actions, a list of favorite apps, and a link to the full 'All Apps' list. Designed for a clean, distraction-free mobile-first experience.
- App List Management: Provide a text-only, alphabetically sorted list of mock apps (Phone, Messages, Camera, etc.) with search and filter capabilities. Users can tap to 'launch' apps or choose favorite apps from this list and hide them from the home favorites.
- Settings Configuration: Allow users to toggle 12/24 hour format, show/hide date and greeting, manage their favorite apps, reset preferences, and enable a simple focus mode UI. All settings are saved using local storage.
- Focus Mode: Offer an ultra-minimal screen displaying only the time, date, and a few essential apps for a calm, focused experience. Includes a simple toggle to enter and exit this mode.
- PWA Installability & Offline Support: The application is fully installable as a Progressive Web App (PWA) with a manifest.json and a service worker, providing a native-like experience and basic offline capabilities.
- Local Storage Data Persistence: Store all user preferences, chosen favorite apps, and hidden apps locally within the browser to maintain state across sessions, ensuring settings and app lists remain synchronized.

## Style Guidelines:

- The overall theme is dark to promote calmness and minimize distraction. The background is a very dark, subtly cool grey (#141216), reminiscent of a deep night sky or digital display. Primary text and interactive elements use a desaturated blue-grey (#8592AD) for clarity and gentle contrast, appearing as a soft, bright 'off-white' on the dark background. An analogous, light cyan-blue (#ACC9D2) serves as an accent for subtle highlights, active states, or feedback, enhancing visibility without being overtly vibrant.
- A single sans-serif typeface, 'Inter', is used throughout the application. Its modern, objective, and neutral design provides excellent readability for all elements, from the large digital clock and greeting text to the detailed app lists and settings. This choice supports the minimalist aesthetic and ensures legibility on mobile screens.
- Emphasizing text over visual clutter, iconography is kept minimal. If used, icons are simple, outline-based, and consistent with the greyscale theme, serving purely functional roles rather than decorative ones. The app list, specifically, remains text-only for maximal minimalism.
- The design follows a strict mobile-first, single-column layout, ensuring balanced spacing and a clean, elegant presentation typical of a minimalist launcher. Key elements like the large clock, greeting, and app lists are structured intuitively with ample negative space to prevent visual overwhelm. Components adapt responsively while maintaining simplicity and ease of touch interaction.
- Animations are subtle, smooth, and brief, enhancing the user experience without causing distraction. Examples include gentle fades for transitions between screens, smooth scrolls for app lists, and understated interactive feedback on tap events. The goal is a fluid, 'calm' interaction rather than dynamic, 'social media-style' UI animations.