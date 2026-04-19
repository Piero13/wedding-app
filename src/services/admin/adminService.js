import { supabase } from "../supabase/supabaseClient";

/**
 * Save photo metadata
 */
export const savePhoto = async (photo) => {
  const { data, error } = await supabase
    .from("photos")
    .insert([photo]);

  if (error) throw error;

  return data;
};