import { useEffect, useState } from "react";
import { supabase } from "../services/supabase/supabaseClient";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [guest, setGuest] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchAdminStatus = async (uid) => {
    const { data } = await supabase
      .from("admins")
      .select("id")
      .eq("id", uid)
      .maybeSingle();

    return !!data;
  };

  const hydrateAuth = async (session) => {
    const currentUser = session?.user ?? null;

    setUser(currentUser);

    if (currentUser) {
      const admin = await fetchAdminStatus(currentUser.id);
      setIsAdmin(admin);
    } else {
      setIsAdmin(false);
    }

    const storedGuest = localStorage.getItem("guest");

    if (storedGuest) {
      setGuest(JSON.parse(storedGuest));
    } else {
      setGuest(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      hydrateAuth(data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      hydrateAuth(session);
    });

    return () => subscription.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loginGuest = (guestData) => {
    localStorage.setItem("guest", JSON.stringify(guestData));
    setGuest(guestData);
  };

  const logout = async () => {
    await supabase.auth.signOut();

    localStorage.removeItem("guest");
    localStorage.removeItem("guest_access");

    setUser(null);
    setGuest(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        guest,
        isGuest: !!guest,
        isAdmin,
        loading,
        loginGuest,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};