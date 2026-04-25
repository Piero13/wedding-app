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
    .select("*")
    .order("is_approved", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};

/**
 * Fetch guestbook messages (admin)
 * Non-approved first
 */
export const fetchGuestbookMessages = async () => {
  const { data, error } = await supabase
    .from("guestbook_messages")
    .select("*")
    .order("is_approved", { ascending: true }) // 🔥 important
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

/**
 * Delete guestbook message
 */
export const deleteMessage = async (id) => {
  const { error } = await supabase
    .from("guestbook_messages")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw error;
  }
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

/**
 * Create category
 */
export const createCategory = async (name) => {
  const { error } = await supabase
    .from("photo_categories")
    .insert([{ name }]);

  if (error) throw error;
};

/**
 * Update photo
 */
export const updatePhoto = async (id, updates) => {
  const { error } = await supabase
    .from("photos")
    .update(updates)
    .eq("id", id);

  if (error) throw error;
};

export const approvePhoto = async (id) => {
  const { error } = await supabase
    .from("photos")
    .update({ is_approved: true })
    .eq("id", id);

  if (error) throw error;
};

export const deletePhoto = async (id) => {
  const { error } = await supabase
    .from("photos")
    .delete()
    .eq("id", id);

  if (error) throw error;
};

/**
 * Count guestbook messages
 */
export const getMessagesCount = async () => {
  const { count, error } = await supabase
    .from("guestbook_messages")
    .select("*", { count: "exact", head: true});
  
  if (error) throw error;

  return count || 0;
};

export const getPendingMessagesCount = async () => {
  const { count, error } = await supabase
    .from("guestbook_messages")
    .select("*", { count: "exact", head: true })
    .eq("is_approved", false);

  if (error) throw error;

  return count || 0;
};

/**
 * Count photos
 */
export const getPhotosCount = async () => {
  const { count, error } = await supabase
    .from("photos")
    .select("*", { count: "exact", head: true });

  if (error) throw error;

  return count || 0;
};

export const getPendingPhotosCount = async () => {
  const { count, error } = await supabase
    .from("photos")
    .select("*", { count: "exact", head: true })
    .eq("is_approved", false);

  if (error) throw error;

  return count || 0;
};