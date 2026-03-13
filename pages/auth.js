import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAuth } from "./_app";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Divider,
} from "@mui/material";

export default function AuthPage() {
  const { supabase, session } = useAuth();
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Redirect if already logged in
  if (session) {
    router.push("/");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setMessage("Check your email for a confirmation link!");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push("/");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",
      }}
    >
      <Head>
        <title>{isSignUp ? "Sign Up" : "Sign In"} - Wordplay</title>
      </Head>

      <Box
        sx={{
          maxWidth: 400,
          width: "100%",
          padding: 4,
          borderRadius: 2,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          <span style={{ color: "blue" }}>wordplay</span>
        </Typography>

        <Typography variant="body1" align="center" sx={{ mb: 3, color: "#666" }}>
          {isSignUp
            ? "Create an account to start writing"
            : "Sign in to your account"}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {message && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 3 }}
            inputProps={{ minLength: 6 }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{ mb: 2, py: 1.5 }}
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : isSignUp ? (
              "Sign Up"
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body2" align="center">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <Button
            variant="text"
            size="small"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError(null);
              setMessage(null);
            }}
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </Button>
        </Typography>

        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 2, color: "#999" }}
        >
          <Button
            variant="text"
            size="small"
            onClick={() => router.push("/")}
            sx={{ color: "#999" }}
          >
            continue without an account
          </Button>
        </Typography>
      </Box>
    </div>
  );
}
