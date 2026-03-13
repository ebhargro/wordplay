import { useState, useEffect, createContext, useContext } from "react";
import { createBrowserClient } from "@supabase/ssr";

// Auth context for the app
const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export default function App({ Component, pageProps }) {
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
  );
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  return (
    <AuthContext.Provider value={{ supabase, session, loading }}>
      <Component {...pageProps} supabase={supabase} session={session} />
    </AuthContext.Provider>
  );
}
