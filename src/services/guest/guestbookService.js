import { supabase } from "../supabase/supabaseClient";

/**
 * Send guestbook message
 */
export const sendMessage = async (message) => {
  const { error } = await supabase
    .from("guestbook_messages")
    .insert([
      {
        first_name: message.first_name,
        last_name: message.last_name,
        email: message.email,
        message: message.message,
      },
    ]);

  if (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Fetch approved messages only
 */
export const fetchApprovedMessages = async () => {
  const { data, error } = await supabase
    .from("guestbook_messages")
    .select("*")
    .eq("is_approved", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
};