import { supabase } from "../supabase/supabaseClient";

/**
 * Fetch photos with category
 */
export const fetchPhotos = async () => {
  const { data, error } = await supabase
    .from("photos")
    .select(`
      *,
      photo_categories (
        id,
        name
      )
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};

/**
 * Fetch categories
 */
export const fetchCategories = async () => {
  const { data, error } = await supabase
    .from("photo_categories")
    .select("*")
    .order("name");

  if (error) throw error;

  return data;
};