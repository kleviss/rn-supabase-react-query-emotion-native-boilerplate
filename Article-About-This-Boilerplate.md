## Diving into a Modern React Native Boilerplate with Supabase, React Query, and Emotion Native

Building mobile applications can often involve a lot of repetitive setup. Boilerplates help alleviate this by providing a pre-configured foundation. This article explores a particularly well-structured React Native boilerplate that leverages some powerful and modern tools: Supabase, React Query, and Emotion Native. It's built using Expo, making cross-platform development (iOS, Android, and web) a streamlined experience.

**This article is also featured on [daily.dev](https://daily.dev/) under the title [A Modern React Native Boilerplate with Supabase, React Query, and Emotion Native](https://app.daily.dev/posts/a-modern-react-native-boilerplate-with-supabase-react-query-and-emotion-native-7tfigl9j7)**

**A Look Under the Hood**

This isn't your average "Hello World" starter kit. It's designed for real-world applications, with features like:

- **Authentication:** Integrated Supabase authentication handles user sign-up, sign-in, and session management.

* **Data Fetching:** React Query is used for efficient data fetching, caching, and state management, reducing boilerplate code for API interactions.

* **Styling:** Emotion Native provides a flexible and performant way to style components, offering a CSS-in-JS approach.

* **Navigation:** Expo Router is used for file-based routing, making navigation intuitive and maintainable.

* **Dark/Light Mode:** Built-in support for both dark and light themes, catering to user preferences.

* **TypeScript:** The project is built with TypeScript, providing type safety and improved developer experience.

**Key Technologies Explained**

Let's break down some of the core technologies:

- **Supabase:** This is an open-source Firebase alternative. It provides a Postgres database, authentication, real-time subscriptions, and storage, all accessible through a clean API. The `supabase.ts` file sets up the Supabase client, configuring it for authentication with AsyncStorage for persistent sessions.

```1:29:config/supabase.ts
import 'react-native-url-polyfill/auto';

import { AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_APP_URL as string;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_API_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase URL or Supabase Anon Key');
}

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
```

- **React Query:** This library takes the pain out of data fetching. It handles caching, background updates, and optimistic updates, making your application feel faster and more responsive. The `useVehicles` hook in `supabase.api.ts` demonstrates how to fetch data using React Query.

```10:17:config/supabase.ts
import 'react-native-url-polyfill/auto';

import { AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_APP_URL as string;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_API_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase URL or Supabase Anon Key');
}

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
```

```10:17:services/supabase.api.ts
import { supabase } from '@/config/supabase';
import { useQuery } from '@tanstack/react-query';

export async function getVehicles() {
  const { data, error } = await supabase.from('Vehicles').select('*');
  if (error) {
    throw error;
  }
  return data;
}

export const useVehicles = () => {
  return useQuery({
    queryKey: ['vehicles'],
    queryFn: getVehicles,
  });
};
```

- **Emotion Native:** This styling library allows you to write CSS-in-JS, making styles scoped to your components and dynamic. You can see Emotion in action in many components, such as `CarDetailsScreen`.

```69:187:app/(protected)/(screens)/car/[id].tsx
const Content = styled.View({
  padding: 16,
});

const Title = styled.Text(({ theme }) => ({
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 8,
  color: theme.colors.text,
  lineHeight: 32,
}));

const SpecItem = styled.View({
  flex: 1,
  minWidth: '45%',
});
```

- **Expo Router:** Expo Router brings file-based routing to React Native, similar to Next.js. This means your file structure defines your app's navigation, making it easy to understand and manage routes. The `app` directory contains the route structure, with `(auth)` for protected routes and `(public)` for unauthenticated routes.

```73:83:README.md
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

**Project Structure and Conventions**

The project follows a well-defined structure, promoting maintainability:

- `app/`: Contains the application's routes, organized using Expo Router's conventions.

- `components/`: Reusable components that can be used across the app.

- `hooks/`: Custom hooks for common functionality.

- `services/`: API services for data fetching.

- `constants/`: Stores constants like theme colors and mock data.

- `styles/`: Global styles for the app.

- `types/`: TypeScript type definitions.

**Getting Started**

The `README.md` file provides clear instructions for setting up the project. It highlights the prerequisites (Node.js, yarn/npm, Expo CLI) and the steps to clone the repository, install dependencies, and set up environment variables for Supabase.

Follow the instructions in the [README.md](README.md) file to get the project running.

**Example: Authentication Flow**

The `sign-in.tsx` and `sign-up.tsx` files showcase the authentication flow using Supabase. The `signIn` function in `sign-in.tsx` demonstrates how to authenticate a user with email and password.

```1:29:app/(public)/(screens)/sign-in.tsx
async function signIn() {

    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    console.log('error', error);
    if (error) {
      setError(error.message);
    }

    setLoading(false);

}
```

The `AuthProvider` in `context/auth.tsx` manages the authentication state and makes it available throughout the application.

```1:29:app/(public)/(screens)/sign-in.tsx
import { createContext, useContext, useEffect, useState } from 'react';

import { Session } from '@supabase/supabase-js';
import { supabase } from '@/config/supabase';

type AuthContextType = {
  session: Session | null;
  initialized: boolean;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  initialized: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setInitialized(true);
    });

    // debugger;
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ session, initialized }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

```

**Conclusion**

This boilerplate provides a robust and modern starting point for React Native development. By combining Supabase, React Query, Emotion Native, and Expo Router, it offers a powerful and efficient development experience. The clear project structure and comprehensive `README.md` make it easy to get started and build upon. It's a great example of how to leverage these technologies to create scalable and maintainable mobile applications.
