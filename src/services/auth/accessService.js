import { supabase } from "../../services/supabase/supabaseClient";

/**
 * Validate access code
 */
export const validateAccessCode = async (code) => {
    const { data, error } = await supabase
        .from("households")
        .select("*")
        .eq("access_code", code)
        .single();

    if (error) return null;

    if (data) localStorage.setItem("guest_access", code);

    return data;
};