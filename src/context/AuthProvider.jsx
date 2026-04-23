import { useEffect, useState } from "react";
import { supabase } from "../services/supabase/supabaseClient";
import { AuthContext } from "./AuthContext";

/**
 * Auth provider
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [guest, setGuest] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Check admin
   */
  const checkAdmin = async (userId) => {
    const { data } = await supabase
      .from("admins")
      .select("id")
      .eq("id", userId)
      .maybeSingle();

    setIsAdmin(!!data);
  };

  useEffect(() => {
    /**
     * Init session
     */
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      const currentUser = data.session?.user ?? null;

      setUser(currentUser);

      if (currentUser) {
        await checkAdmin(currentUser.id);
      }

      // 🔥 récupérer guest depuis localStorage
      const storedGuest = localStorage.getItem("guest");
      if (storedGuest) {
        setGuest(JSON.parse(storedGuest));
      }
      setLoading(false)
    };

    init();

    /**
     * Listen auth changes
     */
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        const currentUser = session?.user ?? null;

        setUser(currentUser);

        if (currentUser) {
          await checkAdmin(currentUser.id);
        } else {
          setIsAdmin(false);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const loginGuest = (guestData) => {
    localStorage.setItem("guest", JSON.stringify(guestData));
    setGuest(guestData);
  };

  /**
 * Logout user (admin or guest)
 */
  const logout = async () => {
    await supabase.auth.signOut();

    localStorage.removeItem("guest");
    localStorage.removeItem("guest_access");

    setUser(null);
    setIsAdmin(false);
    setGuest(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        guest,
        isGuest: !!guest,
        loginGuest,
        logout,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};