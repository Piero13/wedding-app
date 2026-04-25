import { uploadImage } from "../admin/uploadService";
import { supabase } from "../supabase/supabaseClient";

export const uploadGuestPhoto = async (file, guest) => {
  try {
    const {
      image_url,
      thumbnail_url,
      image_path,
      thumbnail_path,
    } = await uploadImage(file);

    const { error } = await supabase.from("photos").insert([
      {
        title: file.name,
        image_url,
        thumbnail_url,
        image_path,
        thumbnail_path,
        uploaded_by_guest: true,
        household_id: guest?.id || null,
        is_approved: false,
      },
    ]);

    if (error) throw error;

  } catch (err) {
    console.error(err);
    throw err;
  }
};