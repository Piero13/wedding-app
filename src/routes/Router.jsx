import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Admin from "../pages/Admin";
import Gallery from "../pages/Gallery";
import GoldenBook from "../pages/GoldenBook";
import Guest from "../pages/Guest";

import ProtectedAdminRoute from "./ProtectedAdminRoute";
import ProtectedGuestRoute from "./ProtectedGuestRoute";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Guest */}        
        <Route
          path="/guest"
          element={
            <ProtectedGuestRoute>
              <Guest />
            </ProtectedGuestRoute>
          }
        />


        <Route
          path="/guest/gallery"
          element={
            <ProtectedGuestRoute>
              <Gallery />
            </ProtectedGuestRoute>
          }
        />

        <Route
          path="/guest/guestbook"
          element={
            <ProtectedGuestRoute>
              <GoldenBook />
            </ProtectedGuestRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <Admin />
            </ProtectedAdminRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
