# SEL DNP3 Configuration UI

A modular, professional React application designed to configure DNP3 relay communication settings, data mapping, fault severity, and scheduling. Built with a focus on clarity, usability, and reliability for engineers in the field.

---

## Overview

The SEL DNP3 UI application is a modular React project structured by feature. It uses centralized state and error management to provide a responsive, validated user experience.

- **Frontend:** React + TypeScript
- **UI:** Radix UI + Tailwind CSS
- **State Management:** ConfigContext and ErrorContext
- **Validation:** Centralized, real-time validation logic

---

## Architecture

## 🏗️ Architecture

| Layer            | Technology Used                               |
|------------------|------------------------------------------------|
| Frontend         | React with TypeScript                          |
| UI Components    | [shadcn/ui](https://ui.shadcn.com)             |
| UI Foundation    | Radix UI + Tailwind CSS                        |
| State Management | React Context API                              |
| Validation       | Centralized in `validation.ts`                 |
| Build Tool       | Vite                                           |

---

+-------------------+       +-------------------+       +-------------------+
|                   |       |                   |       |                   |
|   User Input      |       | ConfigContext     |       | ErrorValidator    |
|   (Forms)         |  ->   | Updates Config    |   ->  | Detects Config    |
|                   |       | State             |       | Change            |
+-------------------+       +-------------------+       +-------------------+
                                                                  |  
        -----------------------------------------------------------
        |
+-------------------+       +-------------------+       +-------------------+
|                   |       |                   |       |                   |
| Clear Errors in   |       | Run Validator     |       | Errors Returned   |
| ErrorContext      |  ->   | (validation.ts)   |   ->  | to ErrorContext   |
|                   |       |                   |       |                   |
+-------------------+       +-------------------+       +-------------------+

## Component Design

### Communication Settings
- `TCPConfigSection`: Handles TCP/IP settings
- `RS485ConfigSection`: Manages RS-485 setup
- `Sav5KeyInput`: SAv5 secure key input interface

### Mapping
- **Basic Mapping**: `BasicBinaryInput`, `BasicAnalogInput`, `BasicCommandOutput`
- **Advanced Mapping**: `AdvancedBinaryInput`, `AdvancedAnalogInput`, `AdvancedCommandOutput`

### Fault Severity Index (FSI)
- `FSI`: Central component for fault severity management

### Review & Scheduling
- `ConfigSummary`: Displays full configuration for review
- `Calendar`: Allows scheduling configuration application

---

## Data Flow & State

- `ConfigContext`: Stores the live configuration state
- `ErrorContext`: Tracks validation errors

Validation occurs in real-time using `validateConfiguration` from `validation.ts`, and errors are dynamically shown in the UI and review section.

---

## UI Design

- **Color Scheme**: Clean and professional — grey, white, and blue
- **Layout**: Card-based, responsive layout with left-aligned labels
- **Interactivity**: Tooltips, switches, dropdowns, and text inputs

---

## Error Handling

- Validation errors are shown directly next to relevant inputs
- All error states are managed in `ErrorContext`
- A summary of validation issues is shown before scheduling

---

## Deployment

- **Build Tool**: [Vite](https://vitejs.dev) — fast builds & optimized dev experience
- **Styling**: [Tailwind CSS](https://tailwindcss.com) with custom themes in `index.css`

To run locally:
```bash
npm install
npm run dev




System Requirements and Setup Guide

1. System Requirements
Operating System: macOS, Windows, or Linux.
Node.js: Version 16 or higher.
Package Manager: npm (comes with Node.js) or Yarn.
Browser: Modern browser (e.g., Chrome, Firefox, Edge) for testing the application.
2. Dependencies
Frontend Framework: React with TypeScript.
UI Libraries:
Radix UI for interactive components.
Tailwind CSS for styling.
Build Tool: Vite for fast development and optimized builds.
State Management: Context API (ConfigContext and ErrorContext).
Validation: Custom validation logic in validation.ts.
3. Installation Steps
Clone the Repository:

git clone https://github.com/JeffreyDF2/dnp3-config-ui.git
cd sel-dnp3-ui

Install Dependencies: Run the following command to install all required dependencies:

npm install

Or, if using Yarn:

yarn install

Start the Development Server: Start the application locally for development:

npm run dev

Or, if using Yarn:

yarn dev

Build for Production: Generate a production-ready build:

npm run build

Or, if using Yarn:

yarn dev

Preview the Production Build: Preview the production build locally:

npm run preview

Or, if using Yarn:

yarn preview

4. Configuration
Tailwind CSS:
Ensure the tailwind.config.js file is properly configured for your project.
Environment Variables:
If required, set up .env files for environment-specific configurations.
5. Testing
Unit Tests:
Ensure all components have unit tests written using a testing library like Jest or React Testing Library.
Validation:
Test the validation logic in validation.ts for edge cases.
6. Deployment
Hosting:
Deploy the production build to a hosting service like Vercel, Netlify, or AWS.
Static Files:
Ensure the dist folder generated by the build process is served correctly.
7. Additional Notes
Documentation:
Refer to the README.md file for detailed information about the project structure and components.
Future Enhancements:
Consider implementing user authentication and export/import functionality for configurations.