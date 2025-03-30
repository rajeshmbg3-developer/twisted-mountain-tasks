# ACME User Management

This project is an Angular 19 and Node (v22) application that provides a user management interface with a focus on modular architecture and effective state management using RxJS.

## Features

- Dynamic table view displaying user data from a JSON API
- Inline editing capability for all fields
- Detail view for individual users
- Dynamically generated table headers based on the data structure
- Responsive design using ng-bootstrap 18

## Project Structure

The application follows a modular architecture:

- **Core Module**: Contains essential services and models used throughout the app
  - State Management Service
  - User Service
  - Application Models

- **Feature(Pages) Modules**: Contains domain-specific functionality
  - User Management Module
    - User List Component
    - User Detail Component

- **Shared Module**: Contains reusable components
  - Editable Table Component

## Development Setup

### Prerequisites

- Node.js (v22 or latest LTS version)
- Angular CLI 19.x

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   ng serve
   ```
4. Navigate to `http://localhost:4200/`

## State Management

The application uses RxJS for state management, providing a clean, reactive approach:

- BehaviorSubjects maintain the current state
- Observable streams expose the state to components
- Services handle state updates and business logic

## Build and Deployment

### Build

```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

### Deployment

This application can be deployed to any static hosting service (Netlify, Vercel, GitHub Pages, etc.) using the build artifacts.
