# RN Supabase React Query Emotion Native Boilerplate 🚀

A modern React Native boilerplate with Supabase, React Query, and Emotion Native styling. Built with [Expo](https://expo.dev).

## Overview

This boilerplate provides a solid foundation for building React Native applications with a powerful tech stack. It includes authentication, data fetching, styling, and navigation setup out of the box.

## Article About This Boilerplate

[React Native Boilerplate with Supabase, React Query, and Emotion Native Styling](Article-About-This-Boilerplate.md)

## Features

- ⚡️ Expo SDK 50
- 🔐 Supabase Integration
- 🎯 React Query for Data Fetching
- 💅 Emotion Native for Styling
- 📱 Expo Router for Navigation
- 🌙 Dark/Light Mode Support
- 🏗️ TypeScript Support
- 📁 File-based Routing
- 🔄 Auto-refresh Tokens

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or newer)
- [yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [iOS Simulator](https://docs.expo.dev/workflow/ios-simulator/) (for iOS development)
- [Android Studio](https://docs.expo.dev/workflow/android-studio-emulator/) (for Android development)

## Quick Start

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/rn-supabase-react-query-emotion-native-boilerplate.git
   cd rn-supabase-react-query-emotion-native-boilerplate
   ```

2. Install dependencies:

   ```bash
   yarn install
   # or
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with your Supabase credentials:

   ```bash
   EXPO_PUBLIC_SUPABASE_APP_URL=your_supabase_project_url
   EXPO_PUBLIC_SUPABASE_API_KEY=your_supabase_anon_key
   ```

## Running the App

1. Start the development server:

   ```bash
   npx expo start
   ```

2. Run on specific platforms:
   - Press `i` to run on iOS simulator
   - Press `a` to run on Android emulator
   - Press `w` to run in web browser
   - Scan the QR code with Expo Go app on your physical device

## Project Structure

```
├── app/                   # App directory (Expo Router)
│   ├── (auth)/           # Protected routes
│   ├── (public)/         # Public routes
│   └── _layout.tsx       # Root layout
├── assets/               # Static assets
├── components/           # Reusable components
├── hooks/                # Custom hooks
├── services/             # API services
├── styles/               # Global styles
└── types/                # TypeScript types
```

## Tech Stack

- [Expo](https://expo.dev) - Development platform
- [React Native](https://reactnative.dev) - Mobile framework
- [Supabase](https://supabase.com) - Backend as a Service
- [React Query](https://tanstack.com/query) - Data fetching
- [Emotion Native](https://emotion.sh) - Styling
- [Expo Router](https://docs.expo.dev/router/introduction) - File-based routing

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](Article-About-This-Boilerplate.md) file for details.

## Support

For support, klevissxh@gmail.com or open an issue in this repository.

## Acknowledgments

- [Expo Documentation](https://docs.expo.dev)
- [Supabase Documentation](https://supabase.com/docs)
- [React Query Documentation](https://tanstack.com/query/latest/docs/react/overview)
