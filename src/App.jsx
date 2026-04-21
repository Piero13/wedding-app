import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import { AuthProvider } from "./context/AuthProvider";
import { ToastProvider } from "./context/ToastProvider";
import AppNavbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

/**
 * Root application component
 */
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <AppNavbar />
          <Router />
          <Footer />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}