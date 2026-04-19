import Router from "./routes/Router";
import { AuthProvider } from "./context/AuthProvider";

/**
 * Root application component
 */
export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}