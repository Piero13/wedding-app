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

/**
 * Fetch photos
 */
export const fetchPhotos = async () => {
    const { data, error } = await supabase
        .from("photos")
        .select("*");

    if (error) throw error;

    return data;
};

/**
 * Fetch all guestbook messages (admin)
 */
export const fetchGuestbookMessages = async () => {
  const { data, error } = await supabase
    .from("guestbook_messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
};

/**
 * Approve guestbook message
 */
export const approveMessage = async (id) => {
  const { error } = await supabase
    .from("guestbook_messages")
    .update({ is_approved: true })
    .eq("id", id);

  if (error) {
    console.error(error);
    throw error;
  }
};