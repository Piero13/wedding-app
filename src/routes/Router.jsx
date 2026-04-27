import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Gallery from "../pages/Gallery";
import Goldenbook from "../pages/Goldenbook";
import GoldenbookPublic from "../pages/GoldenbookPublic";
import Guest from "../pages/Guest";
import Admin from "../pages/Admin";
import PhotosManager from "../pages/PhotosManager";
import GoldenbookManager from "../pages/GoldenbookManager";
import GuestsManager from "../pages/GuestsManager";
import CouplePhotosManager from "../pages/CouplePhotosManager";




import ProtectedAdminRoute from "./ProtectedAdminRoute";
import ProtectedGuestRoute from "./ProtectedGuestRoute";

export default function Router() {
  return (
    <Routes>

      {/* PUBLIC */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/guestbook/public" element={<GoldenbookPublic />} />

      {/* GUEST */}
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
            <Goldenbook />
          </ProtectedGuestRoute>
        }
      />

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <ProtectedAdminRoute>
            <Admin />
          </ProtectedAdminRoute>
        }
      />

      <Route
        path="/admin/photos"
        element={
          <ProtectedAdminRoute>
            <PhotosManager />
          </ProtectedAdminRoute>
        }
      />

      <Route
        path="/admin/goldenbook"
        element={
          <ProtectedAdminRoute>
            <GoldenbookManager />
          </ProtectedAdminRoute>
        }
      />

      <Route
        path="/admin/guests"
        element={
          <ProtectedAdminRoute>
            <GuestsManager />
          </ProtectedAdminRoute>
        }
      />

      <Route
        path="/admin/couple-photos"
        element={
          <ProtectedAdminRoute>
            <CouplePhotosManager />
          </ProtectedAdminRoute>
        }
      />

      {/* admin gallery public */}
      <Route
        path="/admin/gallery"
        element={
          <ProtectedAdminRoute>
            <Gallery />
          </ProtectedAdminRoute>
        }
      />

    </Routes>
  );
}