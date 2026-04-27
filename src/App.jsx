import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import { AuthProvider } from "./context/AuthProvider";
import { ToastProvider } from "./context/ToastProvider";
import AppNavbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import VisitTracker from "./components/common/VisitTracker";

/**
 * Root application component
 */
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <VisitTracker />
          <AppNavbar />
          <div className="app">
            <Router />
          </div>
          <Footer />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}