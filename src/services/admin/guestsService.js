import { supabase } from "../supabase/supabaseClient";

/**
 * Get all households
 */
export const fetchGuests = async () => {
  const { data, error } = await supabase
    .from("households")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

/**
 * Create household
 */
export const createGuest = async (payload) => {
  const { error } = await supabase
    .from("households")
    .insert([payload]);

  if (error) throw error;
};

/**
 * Update household
 */
export const updateGuest = async (id, payload) => {
  const { error } = await supabase
    .from("households")
    .update(payload)
    .eq("id", id);

  if (error) throw error;
};

/**
 * Delete household
 */
export const deleteGuest = async (id) => {
  const { error } = await supabase
    .from("households")
    .delete()
    .eq("id", id);

  if (error) throw error;
};